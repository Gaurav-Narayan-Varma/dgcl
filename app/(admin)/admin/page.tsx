import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminHome() {
  return (
    <main className="flex flex-col flex-grow">
      <div>Admin Home</div>
      {/* Create Service */}
      <Link href={"admin/create-page"}>
        <Button>Create Service</Button>
      </Link>
      {/* Logout */}
      <form
        action={async () => {
          "use server";
          await signOut({
            redirect: true,
            redirectTo: "/login-admin",
          });
        }}
      >
        <Button variant="destructive">Sign Out</Button>
      </form>
    </main>
  );
}
