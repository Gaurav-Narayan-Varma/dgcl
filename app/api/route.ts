import { sql } from "@vercel/postgres";
import { PostForm } from "@/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tagline = url.searchParams.get("tagline");
  console.log("tagline: " + tagline);

  try {
    const post: any = await sql<PostForm>`
    SELECT
    posts.id,
    posts.tagline,
    posts.content
  FROM posts
  WHERE posts.tagline = ${tagline};
`;

    console.log("post:");
    console.log(post);
    return Response.json(post.rows[0].content);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post.");
  }
}
