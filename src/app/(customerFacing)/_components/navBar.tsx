"use client";

import Image from "next/image";
import Link from "next/link";
import {  useState } from "react";
import { PiShoppingCartSimpleFill } from "react-icons/pi";import { TbUserFilled } from "react-icons/tb";
import Logo from "../../../../public/general/logo.png"
import AppSideBar from "./sideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// export function NavBarOrSideBar() {
//   const [screenSize, setscreenSize] = useState<number>()

//   useEffect(() => {
//     setscreenSize(window.innerWidth) 
//   },[])

//   return <nav>{screenSize && screenSize > 640 && <TopNavBar />}</nav>;
// }

// export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {

//   //sodeBarItems

//   const pathname = usePathname();
//   return (
//     <Link
//       {...props}
//       className={cn(
//         "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground duration-200",
//         pathname === props.href && "bg-background text-foreground"
//       )}
//     />
//   );
// }

export function SideBar() {
  

  return ( 
      <div className="flex w-full justify-between h-20 items-center">
        <div className="flex items-center justify-center w-32">
        <Link href="/">
          <Image alt="snow cone logo" src={Logo} height={50} width={50} />
        </Link>
      </div>

      <div>
        <AppSideBar/>
        <SidebarTrigger/>
        
        
        </div>
      </div>
  );
}
export function TopNavBar() {
  const links = [
    {
      name: "Menu",
      link: "Menu"
    },
    {
      name: "Catering",
      link: "Catering"
    },
    {
      name: "Host an event",
      link: "HostEvent"
    },
    {
      name: "Gift Card",
      link: "GiftCard"
    },
    {
      name: "Marketing Collaboration",
      link: "MarketingCollab"
    },
  ]
  const [NumberOfBagItems, setNumberOfBagItems] = useState<number>(0);

   // Depend on `pathname` to trigger the effect on route change

  return (
    <div className=" shadow-sm">
      <div className="flex md:hidden">
        <SideBar/>
      </div>

      <div className="hidden md:flex justify-between h-16 md:h-20 items-center  ">
        <div className="flex items-center justify-center w-32">
          <Link href="/">
            <Image alt="snow cone logo" src={Logo} height={50} width={50} />
          </Link>        </div>

        <div className="flex overflow-auto gap-8 justify-center w-full py-1">
          {links.map((obj, key) => (
            <Link
              key={key}
              className="hover:bg-zinc-100 hover:duration-300 rounded-md text-center px-2 text-lg text-gray-700 font-medium py-2"
              href={`/${obj.link}`}
            >
              {obj.name}
            </Link>
          ))}
        </div>
          <div className="flex items-center justify-start w-40">
          <Link href={'/Menu'}>
            <Button variant={NumberOfBagItems > 0 ?"destructive":"outline"} className="flex justify-center rounded-xl h-12">
              <PiShoppingCartSimpleFill />              
              <div className={NumberOfBagItems === 0 ?'hidden':''}>{NumberOfBagItems}</div>
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}