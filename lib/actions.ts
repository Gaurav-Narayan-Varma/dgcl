"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/db/client";
import { format as prettyFormat } from "pretty-format";

const FormSchema = z.object({
  id: z.string(),
  tagline: z.string().min(1, {
    message: "Please enter a service name",
  }),
  content: z.string().min(1, {
    message: "Please enter content.",
  }),
  editor_state: z.string({ required_error: "Please enter content" }).min(1, {
    message: "Please enter content",
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
  console.log("Tagline:", formData.get("tagline"));
  console.log("content:", formData.get("content"));

  if (formData.get("editor_state") !== null) {
    console.log(
      "editor_state:",
      prettyFormat(JSON.parse(formData.get("editor_state") as string))
    );
    console.log(
      "text:",
      JSON.parse(formData.get("editor_state") as string)?.root?.children[0]
        ?.children[0]?.text
    );
  }

  const validatedFields = CreatePost.safeParse({
    tagline: formData.get("tagline"),
    content: formData.get("content"),
    editor_state: JSON.parse(formData.get("editor_state") as string)?.root
      ?.children[0]?.children[0]?.text,
  });

  if (!validatedFields.success) {
    console.log("INSIDE");
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
    await prisma.service.create({
      data: {
        html: content,
        editor_state: editor_state,
        name: tagline,
        slug: slug,
        card_title: "poop",
        card_description: "de woop",
      },
    });
    return { message: "Service created successfully." };
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
