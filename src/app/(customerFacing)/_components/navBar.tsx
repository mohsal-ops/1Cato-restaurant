'use client'
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/general/logo.png"
import AppSideBar from "./sideBar";
import { CartItem } from "@prisma/client";
import CartSideBar from "./Cart-SideBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { usePathname } from "next/navigation";





export function SideBar({ pathname }: { pathname: string }) {
  return (
    <div className="flex w-full  justify-between h-20 items-center ">
      <div className="flex items-center justify-center pl-7">
        <Link href="/">
          <Image alt="snow cone logo" priority   className=" w-auto h-auto" src={Logo} height={50} width={50} />
        </Link>
      </div>

      <div className="flex items-center gap-4 pr-7">
        {pathname !== '/Menu' && (
          <Button asChild size="md" variant="outline" className="text-md border-gray-300">
            <Link href="/Menu">Menu</Link>
          </Button>
        )}
        <div className="flex w-7 justify-center items-center">
          <AppSideBar />
        </div>
      </div>



    </div>
  );
}

export function TopNavBar() {
  const pathname = usePathname()
  const links = [
    {
      name: "Menu",
      link: "/Menu"
    },
    {
      name: "Catering",
      link: "/Menu/Catering"
    },
    {
      name: "Host an event",
      link: "/HostEvent"
    },
    {
      name: "Gift Card",
      link: "/GiftCard"
    },
    // {
    //   name: "Blog",
    //   link: "/Blog",

    // },
    {
      name: "Marketing Collaboration",
      link: "/MarketingCollab"
    },
  ]
  const [cartId, setCartId] = useState<string | null>(null);




  useEffect(() => {
    const fetchCartId = async () => {
      const res = await fetch("/api/getcartId")
      const data = await res.json();
      setCartId(data.cartId);
    };
    fetchCartId();

  }, []);
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-cart-id": cartId ?? "",
      },
    }).then((res) => res.json());



  const { data: CartResObj } = useSWR(cartId ? "/api/cart/get" : null, fetcher);
  const cartItems = (CartResObj?.cart?.items ?? []) as CartItem[]

  return (
    <div className="bg-white flex justify-center " >
      <div className="flex w-full md:hidden">
        <SideBar pathname={pathname} />
        {cartItems.length > 0 && (
          <div className="fixed bottom-1 right-2 left-2 rounded-md flex justify-center z-50">
            <CartSideBar cartId={cartId} cartItems={cartItems} />
          </div>
        )}

      </div>

      <div className="hidden md:flex justify-between h-16 md:h-20 md:w-[80%]  items-center ">
        <div className="flex items-center justify-center w-auto ">
          <Link href="/">
            <Image alt="snow cone logo" className="w-auto h-auto" src={Logo} height={60} width={60} />
          </Link>
        </div>
        <div className="flex justify-end gap-4 items-center">
          <div className="flex overflow-auto gap-2 justify-center w-full py-1">
            {links.map((obj, key) => {
              const isActive = pathname == '/' + obj.link;
              return (
                <Button key={key} className={`font-medium text-md ${isActive && "bg-stone-200 text-accent-foreground "}`} variant='ghost'>
                  <Link

                    href={obj.link}
                    className=' text-gray-600'>
                    {obj.name}
                  </Link>
                </Button>

              );
            })}
          </div>
          <div >
            <CartSideBar cartId={cartId} cartItems={cartItems} />
          </div>
        </div>


      </div>

    </div>
  );
}