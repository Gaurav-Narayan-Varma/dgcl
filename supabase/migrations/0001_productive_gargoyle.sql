CREATE TABLE IF NOT EXISTS "services_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"html" text NOT NULL,
	"editor_state" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
