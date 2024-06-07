"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "./ui/modeToggle";
import StoreSwitcher from "@/components/store-switcher";
import { Store } from "@prisma/client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = (params: { stores: Store[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <StoreSwitcher items={params.stores} />
        <div className="lg:flex hidden items-center">
          <MainNav handleNav={handleNav} className="mx-6" />
          <div className="ml-auto flex gap-3 items-center">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div
          onClick={handleNav}
          className="z-50 lg:hidden cursor-pointer"
        >
          <Menu />
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 flex flex-col items-center bg-white z-40 animate-slideDown px-8">
          <MainNav handleNav={handleNav} className="mb-6" />
          <div className="flex  items-center gap-3 mb-6">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
