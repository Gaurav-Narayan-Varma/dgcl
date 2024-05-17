"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  tagline: z.string({
    invalid_type_error: "Please enter a tagline.",
  }),
  content: z.string({
    invalid_type_error: "Please enter content.",
  }),
  date: z.string(),
});

const CreatePost = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    tagline?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  console.log(formData);

  const validatedFields = CreatePost.safeParse({
    tagline: formData.get("tagline"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }
  // Prepare data for insertion into the database
  const { tagline, content } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO posts (tagline, content, date)
        VALUES (${tagline}, ${content}, ${date})
      `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

  //   revalidatePath('/dashboard/invoices');
  redirect("/admin");
}
