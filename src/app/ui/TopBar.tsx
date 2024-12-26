import { UserButton } from "@clerk/nextjs";
import Nav from "./Nav";
import Search from "./Search";

export default function TopBar() {
  return (
    <header className="sticky top-0 bg-topbar-background p-4 md:px-8 flex flex-row gap-2 items-center">
      <Nav />

      <div className="flex flex-row items-center gap-4">
        <Search placeholder="Search..." disabled={true} />

        <UserButton />
      </div>
    </header>
  );
}
