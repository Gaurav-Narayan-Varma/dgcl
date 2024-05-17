import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login-admin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, method } }) {
      console.log("authorized callback begins");
      console.log("Request method:", method); // Log the request method
      const isLoggedIn = !!auth?.user;
      const isInAdmin = nextUrl.pathname.startsWith("/admin");
      console.log("isLoggedIn:", isLoggedIn);
      console.log("Url pathname:", nextUrl.pathname);
      if (isInAdmin) {
        if (isLoggedIn) {
          console.log("still in authorized callback");
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("not on admin page but is logged in");
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
