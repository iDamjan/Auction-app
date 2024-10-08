import { CircleUser, Menu, Package2, PlusCircle, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "../app/actions";
import { validateRequest } from "@/lib/validate-request";

export default async function Header() {
  const { user } = await validateRequest();

  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="text-lg font-semibold hover:underline">Bidder</span>
        </Link>

        <Button className="ml-4" variant="secondary">
          <Link
            href="/create-bid "
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <PlusCircle className="h-6 w-6" />
            <span>Add your bid</span>
          </Link>
        </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
      </Sheet>
      <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {user && (
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        )}
        {user && (
          <>
            <div>Welcome, {user.username}</div>{" "}
            <form action={logout}>
              <Button>Logout</Button>
            </form>
          </>
        )}
        {!user && (
          <Button variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        )}
        {!user && (
          <Button>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        )}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
