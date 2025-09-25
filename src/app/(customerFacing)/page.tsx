'use client'
import Image, { StaticImageData } from "next/image";
import mainImg from '../../../public/general/mainImage.jpg'
import img2 from '../../../public/general/6aece15f-862c-448e-9a3d-95c69056426e-DeliveryCombo_SalsaVerde.png'
import img3 from '../../../public/general/9aa3ea8f-e20e-4ac9-8ad4-bd12da6b54bf-407748084_d8e1f747-9d46-4acd-8f8c-ecb07d08d37c.jpg'
import img4 from '../../../public/general/ee30f8be-89c7-4c36-9d81-9f9c23e82bb7-20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg'
import img5 from '../../../public/general/logo.png'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion"
import PageHeader from "./_components/PageHeader";
import { Suspense, useEffect, useState } from "react";
import { Item } from "@prisma/client";
import { ProductCardSkeleton } from "./_components/ProductCard";
import { ProductSuspense } from "./Menu/_components/ProductSuspense";
import { MdKeyboardArrowRight } from "react-icons/md";


export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center space-y-10">
      <TopSection />
      <SecondSection/>
      <ThirdSection/>
    </div>
  );
}

export function TopSection() {
  return (
    <div className="flex relative overflow-hidden max-h-screen sm:flex-row sm:w-[85%] flex-col bg-stone-100 rounded-3xl sm:p-2 ">
      <div className="sm:relative absolute z-30 bottom-9  flex flex-col gap-8 items-start justify-end mt-10 md:mb-20 md:w-1/2 p-5  md:p-12">
        <span className="lg:text-7xl text-white sm:text-black text-4xl font-bold leading-10 lg:leading-[80px] "><h1 className="text-orange-500">Refreshing</h1> healthy, and guilt-free <span className="circle-sketch-highlight">
             snow cones
          </span>
        </span>
        <span className="font-semibold text-zinc-400 sm:text-muted-foreground text-md">They're always gluten-free, fat-free, and made to be a treat you can enjoy without worry.</span>

        <Link href="/HostEvent"  >
          <Button size="lg" className="bg-orange-600">
            Book an Event
            <MdKeyboardArrowRight/>
          </Button>
        </Link>

      </div>
      <div className="md:w-1/2 w-full  sm:rounded-3xl overflow-hidden">
        <Image alt="best snow cone in New York city " src={mainImg } className="object-contain " />
        <div className="sm:hidden absolute top-0 bg-auto bg-black/30 backdrop-blur-none z-20 w-full h-full"></div>
      </div>
      
    </div>
  )
}

export function SecondSection() {
  const [productsData, setProductsData] = useState<{
    products: Item[];
    quantity: number;
  }>();
  useEffect(() => {
    const getproducts = async () => {
      const response = await fetch(
        `/api/products?featured=${true}`
      );
      if (response.ok) {
        const data = await response.json();

        setProductsData(data);
      }
    };
    getproducts();
  }, []);
  const products = productsData?.products;
  const quantity = productsData?.quantity;
  return (
    <div className="flex-col space-y-6 sm:flex-row p-3 sm:w-10/12 w-full">
      <div className="flex justify-between">
        <PageHeader>Featured</PageHeader>
        <Link href="/Menu"  >
          <Button size={"lg"} variant={"outline"} className="h-12  outline-neutral-300 text-black bg-transparent text-left">
            View Menu
          </Button>
        </Link>
      </div>
      <div className="grid grid-flow-col justify-start gap-7 w-full  overflow-auto   pb-10">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense products={products} />
        </Suspense>
      </div>
    </div>

  )
}

export function ThirdSection(){
  return (
    <main className="grid grid-cols-1  md:grid-cols-3 sm:w-10/12 w-full gap-6 p-10">
  <HoverCard src= {img2} title="Delicious Taco" />
  <HoverCard src={img3} title="Delicious Taco" />
  <HoverCard src={img4} title="Juicy Burrito" />
  <HoverCard src={img5} title="Cheesy Nachos" />
</main>
  )
}

export function HoverCard({
  src,
  title,
}: {
  src: StaticImageData;
  title: string;
}) {
  const MotionImage = motion(Image);

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative w-full  overflow-hidden rounded-2xl shadow-lg"
    >
      {/* image */}
      <MotionImage
        src={src}
        alt={title}
        className="h-auto object-cover "
        variants={{
          rest: { scale: 1, y: 0 },
          hover: { scale: 1.06, y: -6 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* overlay */}
      <motion.div
        variants={{
          rest: { opacity: 0, y: 8 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="absolute inset-0 bg-black/40 flex items-end p-4"
        style={{ pointerEvents: "none" }}
      >
        <motion.h3 className="text-white text-lg font-semibold">
          {title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}