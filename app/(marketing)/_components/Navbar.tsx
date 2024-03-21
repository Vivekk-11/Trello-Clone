import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="shadow-md border border-gray-300"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get MyTasks for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
