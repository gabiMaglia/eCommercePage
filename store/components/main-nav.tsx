'use client'

import { cn } from "@/lib/util";
import { Billboard } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Billboard[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data.map((route) => ({
    href: `/store/${route.id}`,
    label: route.label,
    active: pathname === `/store/${route.id}`,
  }));
  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6"
    >
        {routes.map((route) => (
            <Link
            key={route.href}
            href={route.href}
            className={cn(
                'text-sm fort-medium transition-colors hover:text-black',
                route.active ? "text-black": "text-neutral-500"
            )}
            >
                {route.label}
            </Link>
        ))}
    </nav>
  );
};

export default MainNav;
