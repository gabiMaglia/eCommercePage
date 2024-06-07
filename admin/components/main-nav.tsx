import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  handleNav: () => void;
}

export function MainNav({
  className,
  handleNav,
  ...props
}: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/brands`,
      label: "Brands",
      active: pathname === `/${params.storeId}/brands`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Product",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/users`,
      label: "Users",
      active: pathname === `/${params.storeId}/users`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex flex-col lg:flex-row items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          onClick={handleNav}
          key={route.href}
          href={route.href}
          className={cn(
            "m-0 break-words w-full text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}