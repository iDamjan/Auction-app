"use server";

import { items } from "@/db/schema";
import { database as db } from "@/db/database";
import { validateRequest } from "@/lib/validate-request";

import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
  const { user, session } = await validateRequest();

  if (!session) throw new Error("User not authenticated");

  const name = formData.get("name");
  const startingPrice = parseFloat(formData.get("startingPrice") as string);
  if (typeof name !== "string") {
    throw new Error("Invalid name");
  }

  await db.insert(items).values({ name, userId: user.id, startingPrice });

  redirect("/");
}
