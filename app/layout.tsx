import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NavBar from "@/components/nav-bar";
import "@/styles/global.css";

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
      <body
        className={`relative ${montserrat.className}`}
        style={{
          backgroundImage: "url('/pattern-6.png')",
          backgroundColor: "#f0f3f9",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
