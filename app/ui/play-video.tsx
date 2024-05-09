import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export default function PlayVideo() {
  return (
    <div id="wrapper" className="mt-8">
      <Link
        href="https://www.youtube.com/watch?v=tAzI4v9idEw"
        className="flex flex-row"
      >
        <div id="play-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-16 h-16"
            style={{ margin: "-6px" }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke="white"
              fill="white"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              stroke="teal"
              fill="teal"
            />
          </svg>
        </div>
        <div
          id="cta-text"
          className={`ml-3 self-center text-xl ${roboto.className}`}
        >
          Play Video
        </div>
      </Link>
      <iframe
        width="280"
        src="https://www.youtube.com/embed/xopvkx6CpNs?si=w19IiO0CmM0BsIul"
        title="YouTube video player"
      ></iframe>
    </div>
  );
}
