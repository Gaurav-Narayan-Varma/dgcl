"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";

const FormSchema = z.object({
  id: z.string(),
  tagline: z.string({
    invalid_type_error: "Please enter a tagline.",
  }),
  content: z.string({
    invalid_type_error: "Please enter content.",
  }),
  date: z.string(),
});
