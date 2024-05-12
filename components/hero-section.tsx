import HeroTextBlockA from "./hero-text-block-a";
import ActionButton from "./action-button";
import PlayVideo from "./play-video";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main
      className=""
      style={{
        height: "1483.15px",
        backgroundImage: "url('/pattern-6.png')",
        backgroundColor: "#f0f3f9",
      }}
    >
      <HeroTextBlockA />
      <ActionButton />
      <PlayVideo />
      <Image
        src="/Aditi-1.png"
        width="330"
        height="1"
        alt="CEO profile shot 1"
      />
    </main>
  );
}
