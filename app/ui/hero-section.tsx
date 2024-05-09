import HeroTextBlockA from "./hero-text-block-a";
import NavBar from "./nav-bar";
import ActionButton from "./action-button";
import PlayVideo from "./play-video";

export default function HeroSection() {
  return (
    <main
      className=""
      style={{
        height: "1483.15px",
        backgroundImage: "url('/pattern-6.png')",
        backgroundColor: "#f0f3f9",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <NavBar />
      <HeroTextBlockA />
      <ActionButton />
      <PlayVideo />
    </main>
  );
}
