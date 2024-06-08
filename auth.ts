import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
// import { sql } from "@vercel/postgres";
import { z } from "zod";
// import type { User } from "@/lib/definitions";
import bcrypt from "bcrypt";
// import { db } from "./db/db";
// import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { prisma } from "@/db/client";

async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          console.log("password:", password);
          console.log("user.password:", user.password);

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
