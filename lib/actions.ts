"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/db/client";

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

  // Convert to slug
  function convertToSlug(tagline: string) {
    return tagline
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  const slug = convertToSlug(tagline);

  try {
    // await db.insert(servicesTable).values({
    //   name: tagline,
    //   slug: slug,
    //   html: content,
    //   editor_state: editor_state,
    // });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function updateService(
  state: State | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = CreatePost.safeParse({
    tagline: formData.get("tagline"),
    content: formData.get("content"),
    editor_state: formData.get("editor_state"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create service.",
    };
  }

  // Prepare data for insertion into the database
  const { tagline, content, editor_state } = validatedFields.data;
  try {
    await prisma.service.updateMany({
      where: { name: decodeURIComponent(tagline) },
      data: { html: content, editor_state: editor_state },
    });
    return { message: "Service updated successfully." };
  } catch (error) {
    return {
      message: "Database Error: Failed to update service.",
    };
  }
}
