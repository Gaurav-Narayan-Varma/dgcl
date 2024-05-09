import Link from "next/link";
import { DM_Sans } from "next/font/google";

const dm_sands = DM_Sans({ subsets: ["latin"] });

export default function ActionButton() {
  return (
    <div className="mt-10">
      <Link
        href="/"
        className={`text-base font-bold text-white px-10 rounded ${dm_sands.className}`}
        style={{
          backgroundColor: "rgb(17, 133, 134)",
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
      >
        Free Consultation
      </Link>
    </div>
  );
}
