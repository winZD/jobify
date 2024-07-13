import { UserButton } from "@clerk/nextjs";
import LinksDropdown from "./LinksDropdown";
import ModeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 flex px-4 items-center justify-between">
      <div>
        <LinksDropdown></LinksDropdown>
      </div>
      <div className="flex items-center gap-x-4">
        <ModeToggle />

        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
