const users = [
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "johnDoe",
    email: "johnDoe@gmail.com",
    password: "waterfall",
  },
  {
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    username: "jwct",
    email: "jwct@gmail.com",
    password: "setonsut",
  },
  {
    user_id: "410884b2-4001-4271-9856-fec4b6a6442a",
    username: "janeDoe",
    email: "janeDoe@gmail.com",
    password: "setonsut",
  },
];

const allSubs = [
  {
    forum_id: "410884b2-6000-4271-9856-fec4b6a6442a",
    forum_name: "nba",
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    is_default: true,
  },
  {
    forum_id: "410884b2-7000-4271-9856-fec4b6a6442a",
    forum_name: "warriors",
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    is_default: false,
  },
  {
    forum_id: "410884b2-8000-4271-9856-fec4b6a6442a",
    forum_name: "news",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    is_default: true,
  },
  {
    forum_id: "410884b2-9000-4271-9856-fec4b6a6442a",
    forum_name: "funny",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    is_default: true,
  },
  {
    forum_id: "410884b2-9100-4271-9856-fec4b6a6442a",
    forum_name: "entertainment",
    user_id: "410884b2-4001-4271-9856-fec4b6a6442a",
    is_default: true,
  },
];

const subscriptions = [
  {
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    forum_name: "news",
  },
  {
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    forum_name: "nba",
  },
  {
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    forum_name: "warriors",
  },
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    forum_name: "funny",
  },
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    forum_name: "nba",
  },
];

const subDataPosts = [
  {
    forum_name: "warriors",
    id: "410544b2-4002-4271-9855-fec4b6a6442a",
    forum_id: "410884b2-7000-4271-9856-fec4b6a6442a",
    title: "Warriors Win",
    submitted_by: "410544b2-4001-4271-9856-fec4b6a6442a",
    content:
      "Warriors have now won 8 of their last 10, what a turnaround for the team.",
    posted_at: Date.now().toString(),
    is_self: true,
  },
  {
    forum_name: "nba",
    id: "410544b2-6662-4271-9855-fec4b6a6442a",
    forum_id: "410884b2-6000-4271-9856-fec4b6a6442a",
    title: "Steph Curry wins Finals MVP",
    url: "https://www.nba.com/news/stephen-curry-wins-2022-bill-russell-nba-finals-mvp-award",
    content:
      "Curry wins the award, his first time as Finals MVP, to go along with his two leage MVP awards.",
    submitted_by: "410544b2-4001-4271-9856-fec4b6a6442a",
    posted_at: Date.now().toString(),
    is_self: false,
  },
  {
    forum_name: "entertainment",
    id: "310944b2-4002-4271-9855-fec4b6a6442a",
    forum_id: "410884b2-9100-4271-9856-fec4b6a6442a",
    title: "Everything, Everywhere All At Once Wins Best Picture",
    content: "Congrats to the cast and crew, what an incredible achievement",
    url: "https://deadline.com/2023/03/2023-oscars-winners-1235285489/",
    submitted_by: "410884b2-4001-4271-9856-fec4b6a6442a",
    posted_at: Date.now().toString(),
    is_self: false,
  },
  {
    forum_name: "news",
    id: "311044b2-4002-4271-9855-fec4b6a6442a",
    forum_id: "410884b2-8000-4271-9856-fec4b6a6442a",
    title:
      "Mitch McConnel to step down as head of Republican Senate in Novemeber",
    url: "https://www.washingtonpost.com/politics/2024/02/28/mcconnell-senate-november/",
    content: `McConnell has served as the GOP's leader in the Senate since 2007, making him the person to hold that role for the longest stretch so far in US history. Per NBC, his replacement will be chosen in November by a vote among the Republican senators, and per AP, McConnell gave "no specific reason for the timing of his decision".`,
    submitted_by: "410884b2-4001-4271-9856-fec4b6a6442a",
    posted_at: Date.now().toString(),
    is_self: false,
  },
];

const subPostComments = [
  {
    comment_id: "410544b2-4002-4300-9855-fec4b6a6442a",
    post_id: "410544b2-4002-4271-9855-fec4b6a6442a",
    submitted_by: "410544b2-4001-4271-9856-fec4b6a6442a",
    comment: "Steph is the best ever",
    // is_parent: true,
  },
  {
    comment_id: "410544b2-4002-4300-9855-fec4b6a6442a",
    post_id: "410544b2-4002-4271-9855-fec4b6a6442a",
    submitted_by: "410544b2-4001-4271-9855-fec4b6a6442a",
    comment: "May they never lose again",
    in_reply_to_comment_id: "410664d2-4002-4300-9855-fec4b6a6442a",
    // is_parent: true,
  },
];

const repliedComments = [
  {
    reply_comment_id: "410664d2-4002-4300-9855-fec4b6a6442a",
    comment_id: "410544b2-4002-4300-9855-fec4b6a6442a",
    comment: "You said it",
  },
  {
    reply_comment_id: "410774d2-4002-4300-9855-fec4b6a6442a",
    comment_id: "410544b2-4002-4300-9855-fec4b6a6442a",
    comment: "The best there could ever be.",
  },
];

const voted_posts = [
  {
    post_id: "410544b2-4002-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vote: 1,
  },
  {
    post_id: "410544b2-6662-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9856-fec4b6a6442a",
    vote: 1,
  },
  {
    post_id: "410544b2-6662-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vote: 1,
  },
  {
    post_id: "410544b2-6662-4271-9855-fec4b6a6442a",
    user_id: "410884b2-4001-4271-9856-fec4b6a6442a",
    vote: 1,
  },
  {
    post_id: "310944b2-4002-4271-9855-fec4b6a6442a",
    user_id: "410884b2-4001-4271-9856-fec4b6a6442a",
    vote: 1,
  },
  {
    post_id: "310944b2-4002-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vote: 1,
  },
  {
    post_id: "311044b2-4002-4271-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vote: 1,
  },
];

const voted_comments = [
  {
    comment_id: "410544b2-4002-4300-9855-fec4b6a6442a",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    vote: 1,
  },
];

// export const data = {
//   users,
//   allSubs,
//   subDataPosts,
//   subPostComments,
//   subscriptions,
//   repliedComments,
//   voted_posts,
//   voted_comments,
// };
