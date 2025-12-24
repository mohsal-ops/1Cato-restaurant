'use client'
import React from 'react'
import PageHeader from './PageHeader';
import { motion } from "framer-motion";
import Image, { StaticImageData } from 'next/image';
import img1 from '@/../public/general/img5.jpeg'
import img2 from '@/../public/general/img8.jpeg'
import img3 from '@/../public/general/img1.jpeg'
import img4 from '@/../public/general/img4.webp'
import img5 from '@/../public/general/img10.webp'
import img6 from '@/../public/general/img11.jpeg'
import img7 from '@/../public/general/img19.webp'
import img8 from '@/../public/general/img13.webp'
import img9 from '@/../public/general/img12.png'
import img10 from '@/../public/general/img18.webp'
import img11 from '@/../public/general/img20.jpeg'
import img12 from '@/../public/general/img16.png'





export function ThirdSectionComponent() {
  const images = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12]
  return (
    <div className=" sm:w-[85%] p-10 space-y-10">
      <div className="space-y-4">
        <PageHeader>Somes Of Our Lovely moments</PageHeader>
        <span className="font-medium text-gray-500 sm:text-muted-foreground text-lg">Hope you will join us soon :)</span>
      </div>


      <main className="grid grid-cols-1 sm:grid-cols-3  md:grid-cols-3  w-full gap-6 ">
        {images.map((image,i)=>(
          <HoverCard key={i} src={image} title="Lovely moment at 1Cato Snow Cone :)" />
        ))}
        
        
      </main>
    </div>

  )
}

export function HoverCard({
  src,
  title,
}: {
  src: StaticImageData;
  title: string;
}) {
  const MotionImage = motion.create(Image);

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative w-full  overflow-hidden rounded-2xl shadow-lg"
    >
      {/* image */}
      <MotionImage
        loading="lazy"
        src={src}
        alt={title}
        className="object-cover w-full h-full"
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


