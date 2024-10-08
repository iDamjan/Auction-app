import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  bid: text("bid").notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name").notNull(),
  startingPrice: numeric("starting_price"),
});

// Authentication tables
export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  password_hash: text("password_hash").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
