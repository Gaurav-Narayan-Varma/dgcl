import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const servicesTable = pgTable("services_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  html: text("html").notNull(),
  editor_state: text("editor_state").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertService = typeof servicesTable.$inferInsert;
export type SelectService = typeof servicesTable.$inferSelect;
