'use client'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { formatCurrency } from '@/lib/formatters';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartItem } from '@prisma/client';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { useCart } from '@/app/providers/CartProvider';


export default function CartSideBar({ cartItems: initialItems, cartId }: { cartId: string | null, cartItems: CartItem[] }) {
    const [isMobile, setIsMobile] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems)
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()
    const { mutate } = useCart()

    // Close sheet automatically on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);


    useEffect(() => {
        if (initialItems && initialItems.length > 0) {
            setCartItems(initialItems);
        }
    }, [initialItems]);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    //delete logic

    const deleteCartItem = async (productId: string) => {
        if (!cartId) return;
        try {
            await fetch(`/api/cart/${cartId}/item/${productId}`, {
                method: "DELETE",
            })

                await mutate(["/api/cart/get", cartId]);


            setCartItems(prev => prev.filter(item => item.id !== productId));
        } catch (error) {
            console.error("Failed to delete cart item:", error);
        }
    };




    const adjustQuantity = (productId: string, change: number) => {
        setCartItems(prevItems => {
            const updated = prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: (item.quantity ?? 0) + change }
                    : item
            )

            const target = updated.find(item => item.id === productId)

            if (target && (target.quantity ?? 0) < 1) {
                deleteCartItem(productId)
                return updated.filter(item => item.id !== productId)
            }

            return updated;
        });
    };


    const quantity = cartItems[0] && !cartItems[0].image ? cartItems.length -1 : cartItems.length
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0), 0);






    return (
        <div className='className="flex items-center justify-start'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className={`${isMobile && 'absolute right-0 left-0 bottom-0'}`}>
                    <div style={quantity ? { backgroundColor: "oklch(64.6% 0.222 41.116)", color: 'white' } : {}} className='flex items-center gap-2 justify-center md:border  px-4 py-2 hover:cursor-pointer rounded-xl  bg-background hover:bg-accent hover:text-accent-foreground'>
                        {isMobile ? (
                            <div className='flex items-center gap-3 py-1 text-black font-medium '>
                                <span>View Cart</span>
                                <span>|</span>
                                <span>{quantity > 1 ? quantity + '' + ' Items' : quantity + '' + ' Item'}</span>
                            </div>
                        ) : (
                            <>
                                <PiShoppingCartSimpleFill size={20} />
                                <span style={{ visibility: quantity > 0 ? 'visible' : 'hidden' }}>{quantity > 0 && quantity}</span>
                            </>

                        )}

                    </div>

                </SheetTrigger>
                <SheetContent aria-describedby={undefined} side={isMobile ? "bottom" : "right"}
                    className={isMobile ? "h-[90vh]" : "w-[400px]"}>
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                    </SheetHeader>
                    {/* Cart items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {quantity == 0 ? (
                            <div className="text-center text-muted-foreground mt-10">
                                Your cart is empty.
                            </div>
                        ) : (
                            cartItems.filter((item) => item.image != null && item.image).map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <Image
                                        src={(item.image ?? '/')}
                                        alt={item.name || 'product image'}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium">{item.name}</h3>
                                        {/* Quantity adjuster */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => adjustQuantity(item.id, -1)}
                                            >
                                                <Minus size={14} />
                                            </Button>
                                            <span className="w-5 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => adjustQuantity(item.id, 1)}
                                            >
                                                <Plus size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        {formatCurrency((item.price ?? 0) / 100)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems && cartItems.length > 0 && (
                        <div className="p-4 border-t space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span className="font-medium">${(subtotal / 100).toFixed(2)}</span>
                            </div>
                            <SheetFooter>
                                <Link className="w-full " href={{ pathname: `/Menu/${cartId}/purchase` }}>
                                    <Button className="w-full" variant="mainButton" >
                                        Checkout

                                    </Button>
                                </Link>

                            </SheetFooter>

                        </div>)}

                </SheetContent>
            </Sheet>
        </div>
    )
}
