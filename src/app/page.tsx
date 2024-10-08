import { database as db } from "@/db/database";

export default async function Home() {
  const allItems = await db.query.items.findMany();

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold">Available items for sale</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {allItems.map((item) => (
          <>
            <div className="border rounded-md p-4" key={item.id}>
              <span className="text-lg font-bold">{item.name}</span>
              <span className="text-sm text-gray-500 mx-2">
                Starting price: ${item.startingPrice}
              </span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
