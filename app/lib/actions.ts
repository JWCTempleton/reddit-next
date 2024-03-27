"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { query } from "@/db";

export type State = {
  errors?: {
    note?: string[];
  };
  message?: string | null;
};

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

const CreateUser = UserSchema;

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
      message: "Database error: Failed to create Note",
    };
  }
  await signIn("credentials", formData);

  redirect("/");
}
