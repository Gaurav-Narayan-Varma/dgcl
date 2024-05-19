"use client";

import { notFound } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { Montserrat } from "next/font/google";

const playfair_display = Playfair_Display({ subsets: ["latin"] });
const monserrat = Montserrat({ subsets: ["latin"] });

const playfair_display_init = playfair_display.className;
const monserrat_init = monserrat.className;

export default function Page({ params }: { params: { tagline: string } }) {
  const [htmlString, setHtmlString] = useState("");

  const tagline = params.tagline;
  console.log("slug: " + tagline);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api?tagline=${tagline}`,
        {
          method: "GET",
          headers: {},
        }
      );

      if (response.ok) {
        const result = await response.json();
        setHtmlString(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="services-page">
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    </div>
  );
}
