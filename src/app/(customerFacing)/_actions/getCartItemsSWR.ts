'use client'

import useSWR from "swr";




export default function GetCartItemsSWR({cartId} :{cartId:string | undefined}) {

    const fetcher = (url: string) =>
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "x-cart-id": cartId ?? "",
                },
            }).then((res) => res.json());
    
        // 3️⃣ Use SWR only when cartId is known
    
    
        const { data: CartResObj } = useSWR(cartId ? "/api/cart/get" : null, fetcher);
        if(!CartResObj) return 
  return CartResObj
}
