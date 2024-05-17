import { signOut } from "@/auth";
import PowerIcon from "@heroicons/react/24/outline/PowerIcon";

export default function AdminHome() {
  return (
    <div>
      <div>Admin Home</div>
      <form
        action={async () => {
          "use server";
          await signOut({
            redirect: true,
            redirectTo: "http://localhost:3000/login-admin",
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
