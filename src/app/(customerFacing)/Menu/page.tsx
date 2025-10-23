import React from 'react'
import { GetCartItems, GetFeaturedProducts, GetGategories, GetPlaces, GetProducts } from './_actions/getDataNeeded'
import MainPageMenu from './_components/mainPage'
import { cookies } from 'next/headers';

export default async function Menu() {

    const cartId = (await cookies()).get("cart_id")?.value;
    const cart = cartId ? await GetCartItems(cartId) : null

  

   const [featuredProducts , places, categories, products] = await Promise.all([
    GetFeaturedProducts(),
    GetPlaces(),
    GetGategories(),
    GetProducts()
   ])





  return (
      <MainPageMenu cartItems={cart?.items ?? []} featuredProducts={featuredProducts}  places={places} products={products} gategories={categories} />

  )
}


