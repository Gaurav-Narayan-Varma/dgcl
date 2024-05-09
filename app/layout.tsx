import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NavBar from "@/app/ui/nav-bar";
import "@/app/ui/global.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DemandGen Consultant LLC",
  description: "Accelerate Your Business at a Fraction of the Cost",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
