import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { validateRequest } from "@/lib/validate-request";

import { createItemAction } from "./actions";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Post an item for sale</h1>
      <div className="flex flex-col gap-4 border rounded-md p-4 w-1/2">
        <form action={createItemAction} className="flex flex-col gap-4">
          <Input name="name" placeholder="Name your item" />
          <Input
            name="startingPrice"
            placeholder="Starting price"
            type="number"
            step="0.01"
            min="0"
          />
          <Button className="w-32" type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
