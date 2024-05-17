import { Playfair_Display } from "next/font/google";
import { Montserrat } from "next/font/google";

const playfair_display = Playfair_Display({ subsets: ["latin"] });
const monserrat = Montserrat({ subsets: ["latin"] });

const ExampleTheme = {
  code: "editor-code",
  heading: {
    h1: `editor-heading-h1 ${playfair_display.className} text-black text-[36px]`,
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  image: "editor-image",
  link: "editor-link",
  list: {
    listitem: "editor-listitem",
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
  },
  ltr: "ltr",
  paragraph: `editor-paragraph ${monserrat.className} text-[16px]`,
  placeholder: "editor-placeholder",
  quote: "editor-quote",
  rtl: "rtl",
  text: {
    bold: "editor-text-bold text-blue-500",
    code: "editor-text-code",
    hashtag: "editor-text-hashtag",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    strikethrough: "editor-text-strikethrough",
    underline: "editor-text-underline",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
  },
};

export default ExampleTheme;
