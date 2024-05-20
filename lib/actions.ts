"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/db/db";
import { servicesTable, InsertService } from "@/db/schema";

const FormSchema = z.object({
  id: z.string(),
  tagline: z.string({
    invalid_type_error: "Please enter a tagline.",
  }),
  content: z.string({
    invalid_type_error: "Please enter content.",
  }),
  editor_state: z.string({
    invalid_type_error: "Please enter content.",
  }),
});

const CreatePost = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    tagline?: string[];
    content?: string[];
  };
  message?: string | null;
};

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

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    tagline: formData.get("tagline"),
    content: formData.get("content"),
    editor_state: formData.get("editor_state"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }
  // Prepare data for insertion into the database
  const { tagline, content, editor_state } = validatedFields.data;

  try {
    await db
      .insert(servicesTable)
      .values({ name: tagline, html: content, editor_state: editor_state });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

  //   revalidatePath('/dashboard/invoices');
  redirect("/admin");
}
