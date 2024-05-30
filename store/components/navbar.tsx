import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import getBillboards from "@/actions/get-billboards";

const NavBar = async() => {
  const categoriesGroups = await getBillboards();
  console.log(categoriesGroups)
    return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Store</p>
          </Link>
          <MainNav data={categoriesGroups}/>
          <NavbarActions/>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
