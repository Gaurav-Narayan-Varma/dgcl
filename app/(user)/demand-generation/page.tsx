import DemandGenMD from "@/markdown/demand-generation.mdx";
import { Playfair_Display } from "next/font/google";

const playfair_display = Playfair_Display({ subsets: ["latin"] });

interface Props {
  children?: React.ReactNode;
}

function CustomH1({ children }: Props) {
  return (
    <h1 style={{ fontFamily: playfair_display.className, fontSize: "36px" }}>
      {children}
    </h1>
  );
}

const overrideComponents = {
  h1: CustomH1,
};

export default function DemandGeneration() {
  return (
    <div>
      <DemandGenMD components={overrideComponents} />
    </div>
  );
}
