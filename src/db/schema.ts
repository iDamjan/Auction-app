import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  bid: text("bid").notNull(),
});
