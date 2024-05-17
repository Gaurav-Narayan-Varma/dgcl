import { signOut } from "@/auth";
import PowerIcon from "@heroicons/react/24/outline/PowerIcon";
import { headers } from "next/headers";

export default function AdminHome() {
  return (
    <div>
      <div>Admin Home</div>
      <form
        action={async () => {
          "use server";
          const origin = headers().get("origin");
          console.log("Headers:", headers());
          console.log("Origin:", origin);

          await signOut({
            redirect: true,
            redirectTo: `${origin}/login-admin`,
          });
        }}
      >
        <button className="...">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
