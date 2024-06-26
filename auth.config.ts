import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login-admin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, method } }) {
      const isLoggedIn = !!auth?.user;
      const isInAdmin = nextUrl.pathname.startsWith("/admin");
      if (isInAdmin) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
