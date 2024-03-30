"use server";

import { auth, getUser, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { query } from "@/db";
import { revalidatePath } from "next/cache";

export type CreateUserState = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  message: string | null;
};

const UserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  username: z.string().min(3, {
    message: "Usernames must be longer than 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Passwords must be greater than 6 characters.",
  }),
});

const LinkPostSchema = z.object({
  forum: z.string(),
  title: z.string(),
  url: z.string(),
  content: z.string(),
});

const CreateUser = UserSchema;
const CreateLinkPost = LinkPostSchema;

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: CreateUserState,
  formData: FormData
) {
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create User",
    };
  }

  const { email, username, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [username, email, hashedPassword];
    await query(
      `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
        `,
      values
    );
  } catch (error) {
    return {
      message: "Database error: Failed to create User",
    };
  }
  await signIn("credentials", formData);

  redirect("/");
}

export async function createLinkPost(formData: FormData) {
  const loggedInUser = await auth();
  const userEmail = loggedInUser?.user?.email?.toString();
  const user = await getUser(userEmail);

  const { forum, title, url, content } = CreateLinkPost.parse({
    forum: formData.get("forum"),
    title: formData.get("title"),
    url: formData.get("url"),
    content: formData.get("content"),
  });

  try {
    const forum_data = await query(`
      SELECT id FROM forums where forum_name = '${forum}';
    `);
    const forum_id = forum_data.rows[0].id;

    const values = [forum_id, title, url, content, user.id, false];
    const insertPost = await query(
      `
      INSERT INTO posts (forum_id, title, url, content, submitted_by, is_self_post)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      values
    );
    try {
      const values = [insertPost.rows[0].id, user.id, 1];
      const insertDefaultUpvote = await query(
        `
        INSERT INTO upvoted_posts (post_id, user_id, vote)
        VALUES ($1, $2, $3)
      `,
        values
      );
    } catch (error) {
      return {
        message: "Database error: Failed to find upvote data.",
      };
    }
  } catch (error) {
    return {
      message: "Database error: Failed to find forum data.",
    };
  }

  revalidatePath(`/t/${forum}`);

  redirect(`/t/${forum}`);
}
