import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database as db } from "@/db/database";
import { bids } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const addedBids = await db.query.bids.findMany();
  console.log(addedBids);
  return (
    <div className="text-black">
      <form
        action={async (formData) => {
          "use server";
          const bid = formData.get("bid");
          await db.insert(bids).values({
            bid: bid as string,
          });
          revalidatePath("/");
        }}
      >
        <Input type="text" name="bid" className="border border-gray-300" />
        <Button type="submit" className="bg-blue-500 text-white mx-2">
          Place bid
        </Button>
      </form>

      {addedBids.map((bid) => (
        <div key={bid.id} className="text-red-500">
          {bid.bid} dada
        </div>
      ))}
    </div>
  );
}
