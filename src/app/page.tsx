import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database as db } from "@/db/database";
import { bids, itemsTable } from "@/db/schema";
import { validateRequest } from "@/lib/validate-request";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { logout } from "./actions";
import { redirect } from "next/navigation";

export default async function Home() {
  // const allItems = await db.query.itemsTable.findMany();

  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  async function createItem(formData: FormData) {
    "use server";
    const name = formData.get("name");
    if (typeof name !== "string") {
      throw new Error("Invalid name");
    }
    await db.insert(itemsTable).values({ name, userId: user.id });
    revalidatePath("/");
  }
  return (
    <>
      <h1>Home</h1>
      <form action={createItem}>
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Create</Button>
      </form>
    </>
  );
}
