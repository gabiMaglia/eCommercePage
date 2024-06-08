import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import getBillboards from "@/actions/get-billboards";
import logo from '@/public/images/logos_png/logos folk-02.png'

import Image from "next/image";

const NavBar = async() => {
  const categoriesGroups = await getBillboards();
    return (
    <div className="border-b">
      <Container>
        
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href='/'>
        <Image className="w-[50px] me-4" src={logo} alt="FOLKTECHNOTIENDA" />
          
          </Link>
          <Link href="/store" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Tienda</p>
          </Link>
          <MainNav data={categoriesGroups}/>
          <NavbarActions/>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
