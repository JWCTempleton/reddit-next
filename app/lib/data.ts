import { query } from "@/db";

// DEFAULT forums that all non logged in users see on page load
export async function fetchDefaultForums() {
  try {
    console.log(`Fetching forum data`);

    const data = await query(
      `SELECT forums.id, forums.forum_name, forums.owner_id, forums.created_at, forums.is_suspended, users.username FROM forums 
      JOIN users on users.id = forums.owner_id WHERE forums.is_default = true;`
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
            SELECT posts.id, posts.title, posts.url, posts.content, posts.created_at, posts.is_self_post, users.username, forums.forum_name, forums.is_default, sum(upvoted_posts.vote) AS votes
            FROM posts
            JOIN users on users.id = posts.submitted_by
            JOIN forums on forums.id = posts.forum_id
            JOIN upvoted_posts on upvoted_posts.post_id = posts.id
            WHERE forums.is_default = true
            GROUP BY posts.id, users.username, forums.forum_name, forums.is_default;
        `);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}
