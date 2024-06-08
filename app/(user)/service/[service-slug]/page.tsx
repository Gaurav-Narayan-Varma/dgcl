import { notFound } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { Montserrat } from "next/font/google";
import { fetchServiceHtml } from "@/lib/data";

const playfair_display = Playfair_Display({ subsets: ["latin"] });
const monserrat = Montserrat({ subsets: ["latin"] });

const playfair_display_init = playfair_display.className;
const monserrat_init = monserrat.className;

export default async function Page({
  params,
}: {
  params: { "service-slug": string };
}) {
  const serviceSlug = params["service-slug"];

  const content = await fetchServiceHtml(decodeURIComponent(serviceSlug));

  if (!content) {
    return <div>No content found</div>;
  }

  return (
    <div id="services-page">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
