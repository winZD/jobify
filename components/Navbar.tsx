import { UserButton } from "@clerk/nextjs";
import LinksDropdown from "./LinksDropdown";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-gray-100 py-4 sm:px-16 lg:px-24 flex px-4 items-center justify-between">
      <div>
        <LinksDropdown></LinksDropdown>
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle></ThemeToggle>
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
