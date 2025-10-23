import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItem } from '@prisma/client';
import ProductCardClient, { AllDishesCardClient, PopularDishesCardClient } from './productCardClient';

type productObjectPath = {
    id: string;
    name: string;
    priceInCents: number;
    description: string;
    image: string;
    cartItems: CartItem[]
};



export default function ProductCardServer({ id, name, priceInCents, description, image, cartItems }: productObjectPath) {
  return (
    <ProductCardClient
      id={id}
      name={name}
      priceInCents={priceInCents}
      description={description}
      image={image}
      cartItems={cartItems}
    />
  );
}



export function PopularDishesCardServer({ id, name, priceInCents, description, image, cartItems }: productObjectPath) {
  return (
    <PopularDishesCardClient
      id={id}
      name={name}
      priceInCents={priceInCents}
      description={description}
      image={image}
      cartItems={cartItems}
    />
  );
}

export function AllDishesCardServer({ id, name, priceInCents, description, image, cartItems }: productObjectPath) {
  return (
    <AllDishesCardClient
      id={id}
      name={name}
      priceInCents={priceInCents}
      description={description}
      image={image}
      cartItems={cartItems}
    />
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
