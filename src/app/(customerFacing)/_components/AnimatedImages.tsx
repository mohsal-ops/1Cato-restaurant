'use client'
import React from 'react'
import PageHeader from './PageHeader';
import { motion } from "framer-motion";
import Image, { StaticImageData } from 'next/image';
import img2 from '../../../../public/general/6aece15f-862c-448e-9a3d-95c69056426e-DeliveryCombo_SalsaVerde.png'
import img3 from '../../../../public/general/9aa3ea8f-e20e-4ac9-8ad4-bd12da6b54bf-407748084_d8e1f747-9d46-4acd-8f8c-ecb07d08d37c.jpg'
import img4 from '../../../../public/general/ee30f8be-89c7-4c36-9d81-9f9c23e82bb7-20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg'



export function ThirdSectionComponent() {
  return (
    <div className=" sm:w-[85%] p-10 space-y-10">
      <div className="space-y-4">
        <PageHeader>Somes Of Our Lovely moments</PageHeader>
        <span className="font-bold text-gray-300 sm:text-muted-foreground text-lg">Hope you will join us soon :)</span>
      </div>


      <main className="grid grid-cols-1  md:grid-cols-3  w-full gap-6 ">
        <HoverCard src={img2} title="Delicious Taco" />
        <HoverCard src={img3} title="Delicious Taco" />
        <HoverCard src={img4} title="Juicy Burrito" />
        <HoverCard src={img4} title="Cheesy Nachos" />
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
        priority
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


