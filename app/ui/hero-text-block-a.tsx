import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";

const playfair_display = Playfair_Display({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function HeroTextBlockA() {
  return (
    <section>
      <div
        className={`mt-8 font-bold ${playfair_display.className}`}
        style={{
          fontSize: "32px",
          color: "rgb(40, 47, 59)",
          lineHeight: "44px",
        }}
      >
        Fractional Marketing and Growth Strategy
      </div>
      <div
        className={`mt-4 font-normal ${roboto.className}`}
        style={{ fontSize: "18px", color: "rgb(102, 114, 121)" }}
      >
        I will assess current in-house marketing team, help recruit to fill gaps
        with freelancers, uplevel in-house team skills and find cost effective
        resources globally.
      </div>
    </section>
  );
}
