import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import { HiMiniPlusSmall } from "react-icons/hi2";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { PiHeartStraightThin } from "react-icons/pi";
type productObjectPath = {
    id: string;
    name: string;
    priceInCents: number;
    description: string;
    image: string;
};

export default function ProductCard({
    id,
    name,
    priceInCents,
    description,
    image,
}: productObjectPath) {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const hndler = async () => {
        setisLoading(true);
        const response = await fetch("/api/addtowishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        if (response.status === 500) {
            setisLoading(false);
        }

        if (response.ok) {
            setisLoading(false);
        } else {
            setisLoading(false);
        }
    };
    return (
        <div>
            <Card className="flex  overflow-hidden gap-5 h-72 flex-col w-72 " key={id}>
                {/* <CardHeader className="relative w-full h-5/6 aspect-video">
                </CardHeader> */}
                <CardContent className="flex items-end relative h-full p-0 w-full text-center" >
                    <div className='  absolute top-0 h-full w-full '>
                        <Image src={image} fill alt={name} className= 'object-cover ' />

                    </div>
                    <div className='z-50 flex justify-between w-full p-3'>
                        <div className="flex  flex-col gap-4 z-20 ">
                            <CardTitle className="font-semibold text-lg text-white te">{name}</CardTitle>
                        </div>
                        <div className='flex gap-2 items-center  '>
                            <Button  size="icon" variant="outline" className=' rounded-full'>
                                <PiHeartStraightThin onClick={hndler} className='w-4 h-3'/>
                            </Button>
                            <Link href="/Menu">

                                <Button variant="outline" className='w-10 h-10 '><HiMiniPlusSmall /></Button>

                            </Link>

                        </div>

                    </div>




                </CardContent>
            </Card>
        </div>
    );
}

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden flex animate-pulse">
            <CardHeader>
                <CardTitle>
                    <div className="w-3/4 h-6 rounded-full bg-gray-300" />
                </CardTitle>
                <CardDescription>
                    <div className="w-1/2 h-4 rounded-full bg-gray-300" />
                </CardDescription>
            </CardHeader>
            <div className="w-1/2 aspect-video bg-gray-300" />
        </Card>
    );
}
