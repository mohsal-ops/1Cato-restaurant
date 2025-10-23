import React from 'react'
import { cookies } from 'next/headers';
import CateringMainPage from '../_components/cateringMainPage';
import { GetCartItems, GetCateringProducts, GetGategories } from '../_actions/getDataNeeded';

export default async function Menu() {

    const cartId = (await cookies()).get("cart_id")?.value;
    const cart = cartId ? await GetCartItems(cartId) : null

  

   const [ categories, products] = await Promise.all([
    GetGategories(),
    GetCateringProducts()
   ])





  return (
      <CateringMainPage cartItems={cart?.items ?? []} products={products} gategories={categories} />

  )
}


