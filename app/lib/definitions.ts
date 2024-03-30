export type Post = {
  forum_name: string;
  post_id: string;
  title: string;
  submitted_by: string;
  posted_at: string;
  url: string | undefined;
  votes: number;
  comments: string | null;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  is_admin: boolean;
  is_suspended: boolean;
};

export type LinkPostSubmission = {
  id: string;
  forum_id: string;
  title: string;
  url: string | undefined;
  content: string;
  submitted_by: string;
  created_at: string;
  is_self_post: boolean;
};
