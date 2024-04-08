import { query } from "@/db";
import { QueryResultRow } from "pg";

// DEFAULT forums that all non logged in users see on page load
export async function fetchDefaultForums() {
  try {
    console.log(`Fetching forum data`);

    const data = await query(
      `
      SELECT forums.id, forums.forum_name, forums.owner_id, forums.created_at, forums.is_suspended, users.username 
      FROM forums 
      JOIN users on users.id = forums.owner_id 
      WHERE forums.is_default = true;
      `
    );

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch forum data.");
  }
}

//DEFAULT posts that all non logged in users see on page load
export async function fetchDefaultPosts() {
  try {
    console.log("Fetching post data");

    const data = await query(`
    WITH comment_count AS (
      SELECT post_id, count(comment) AS comments FROM post_comments
    JOIN posts on posts.id = post_comments.post_id
    JOIN forums on forums.id = posts.forum_id
    WHERE forums.is_default = true
    GROUP BY post_id, forums.forum_name
    )
            SELECT posts.id, posts.title, posts.url, posts.content, posts.created_at, posts.is_self_post, users.username, forums.forum_name, forums.is_default, sum(upvoted_posts.vote) AS votes, comments
            FROM posts
            JOIN users on users.id = posts.submitted_by
            JOIN forums on forums.id = posts.forum_id
            JOIN upvoted_posts on upvoted_posts.post_id = posts.id
            FULL OUTER JOIN comment_count USING (post_id)
            WHERE forums.is_default = true
            GROUP BY posts.id, users.username, forums.forum_name, forums.is_default, comment_count.comments, comment_count.post_id
            ORDER BY votes DESC;
        `);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}

//Query to return comments and posts made by user
export async function fetchUserPostsAndComments(username: string) {
  try {
    const data = await query(`
      SELECT u1.* FROM (
        SELECT 'posts' AS type,
        posts.id AS post_id,
        NULL AS comment_id,
        NULL AS post_comment,
        posts.title AS post_title,
        posts.submitted_by AS submitted_by,
        posts.url AS post_url,
        posts.created_at AS created_at,
        posts.is_self_post AS self_post,
        users.username, 
        forums.forum_name,
        posts.id AS either_id
        FROM posts
        JOIN users on users.id = posts.submitted_by
        JOIN forums on forums.id = posts.forum_id
        WHERE users.username = '${username}'

        UNION

        SELECT 'comments' AS type,
        NULL AS post_id,
        post_comments.id AS comment_id,
        post_comments.comment AS post_comment,
        posts.title AS post_title,
        post_comments.user_id AS submitted_by,
        posts.url AS post_url,
        post_comments.created_at AS created_at,
        posts.is_self_post AS self_post,
        users.username,
        forums.forum_name,
        post_comments.id AS either_id
        FROM post_comments
        JOIN posts on posts.id = post_comments.post_id
        JOIN users on users.id = post_comments.user_id
        JOIN forums on forums.id = posts.forum_id
        WHERE users.username = '${username}'
      ) u1
      ORDER BY u1.either_id, u1.type, u1.created_at;
    `);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to user comment data.");
  }
}

//Query to return posts from selected forum
export async function fetchForumPosts(forumName: string) {
  try {
    const data = await query(`
    WITH comment_count AS (
      SELECT post_id, count(comment) AS comments FROM post_comments
    JOIN posts on posts.id = post_comments.post_id
    JOIN forums on forums.id = posts.forum_id
    
    WHERE forums.forum_name = '${forumName}'
    
    GROUP BY post_id, forums.forum_name
    )
    SELECT posts.id, posts.title, posts.url, posts.content, posts.created_at, posts.is_self_post, users.username, forums.forum_name, sum(upvoted_posts.vote) AS votes, comments
        FROM posts
        JOIN users on users.id = posts.submitted_by
        JOIN forums on forums.id = posts.forum_id
        FULL OUTER JOIN upvoted_posts on upvoted_posts.post_id = posts.id
        FULL OUTER JOIN comment_count USING (post_id)
        WHERE forums.forum_name = '${forumName}'
        GROUP BY posts.id, users.username, forums.forum_name, comment_count.comments, comment_count.post_id;
    `);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch forum post data.");
  }
}

//Query to return specific post based on post id
export async function fetchPost(post_id: string) {
  try {
    const postById = await query(`
    WITH comment_count AS (
      SELECT post_id, count(comment) AS comments FROM post_comments
    JOIN posts on posts.id = post_comments.post_id
    JOIN forums on forums.id = posts.forum_id
    
    WHERE posts.id = '${post_id}'
    
    GROUP BY post_id
    )
    SELECT posts.id, posts.title, posts.url, posts.content, posts.created_at, posts.is_self_post, users.username, forums.forum_name, sum(upvoted_posts.vote) AS votes, comments
    FROM posts
    JOIN users on users.id = posts.submitted_by
    JOIN forums on forums.id = posts.forum_id
    JOIN upvoted_posts on upvoted_posts.post_id = posts.id
    FULL OUTER JOIN comment_count USING (post_id)
    WHERE posts.id = '${post_id}'
    GROUP BY posts.id, users.username, forums.forum_name, comment_count.comments, comment_count.post_id;
    `);

    const comments = await query(`
      SELECT post_comments.id, post_comments.post_id, post_comments.user_id, post_comments.comment, 
      post_comments.created_at, post_comments.in_reply_to_comment_id, users.username
      FROM post_comments
      JOIN users on users.id = post_comments.user_id
      WHERE post_comments.post_id = '${post_id}'
      GROUP BY post_comments.id, post_comments.in_reply_to_comment_id, users.username
      ORDER BY post_comments.created_at;
      
    `);

    const data = await Promise.all([postById, comments]);

    const idMapping = data[1].rows.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});

    let commentTree: any = [];
    let root;
    data[1].rows.forEach((el) => {
      if (el.in_reply_to_comment_id === null) {
        root = el;
        commentTree.push(root);
        return;
      }
      const parentEl = data[1].rows[idMapping[el.in_reply_to_comment_id]];
      parentEl.replies = [...(parentEl.replies || []), el];
    });

    return [data[0], commentTree];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}

// SELECT posts.id, posts.title, posts.url, posts.content, posts.created_at, posts.is_self_post, users.username, forums.forum_name, sum(upvoted_posts.vote) AS votes
// FROM posts
// JOIN users on users.id = posts.submitted_by
// JOIN forums on forums.id = posts.forum_id
// JOIN upvoted_posts on upvoted_posts.post_id = posts.id
// WHERE forums.forum_name = 'nba'
// GROUP BY posts.id, users.username, forums.forum_name, forums.is_default
// ORDER BY votes DESC;

// WITH comment_count AS (
//   SELECT post_id, count(comment) AS comments FROM post_comments
// JOIN posts on posts.id = post_comments.post_id
// JOIN forums on forums.id = posts.forum_id

// WHERE posts.id = '${post_id}'

// GROUP BY post_id
// )
// SELECT posts.id, posts.title, posts.url, posts.content, posts.created_at, posts.is_self_post, users.username, forums.forum_name, sum(upvoted_posts.vote) AS votes, comments
// FROM posts
// JOIN users on users.id = posts.submitted_by
// JOIN forums on forums.id = posts.forum_id
// JOIN upvoted_posts on upvoted_posts.post_id = posts.id
// FULL OUTER JOIN comment_count USING (post_id)
// WHERE posts.id = '${post_id}'
// GROUP BY posts.id, users.username, forums.forum_name, comment_count.comments, comment_count.post_id;

// WITH RECURSIVE comments AS (
//   SELECT id, post_id, user_id, comment, created_at, in_reply_to_comment_id
//   FROM post_comments
//   WHERE post_id = '410544b2-4002-4271-9855-fec4b6a6442a'

//   UNION

//   SELECT p.id, p.post_id, p.user_id, p.comment, p.created_at, p.in_reply_to_comment_id
//   FROM post_comments p

//   INNER JOIN comments c ON c.post_id= p.in_reply_to_comment_id
// )

// SELECT * FROM comments;
