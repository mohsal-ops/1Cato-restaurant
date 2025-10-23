import { Button } from "@/components/ui/button";
import db from "@/db/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";



export default async function Success({
    searchParams,
}: {
    searchParams: { payment_intent: string };
}) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent,
        {
            expand: ["charges.data.balance_transaction"],
        }
    );
    if (paymentIntent == null) return (<div className="flex items-center justify-center text-gray-400 w-full h-screen">
        a problem occured 

    </div>)

    const isSuccess = paymentIntent.status === "succeeded";




    return (
        <div className="flex max-w-5xl items-center justify-center h-96 pt-20  w-full  space-y-10 ">
            <div className="flex flex-col  justify-center items-center min-w-1/3 space-y-5  p-6 bg-green-500 rounded-2xl">
                <div className="text-4xl font-bold text-foreground">
                    {isSuccess ? "Success! " : "Error"}
                </div>
                    <div className=" text-lg tracking-wide font-medium text-center space-y-2">
                        <h1>Thanks for your order</h1>
                        <Button variant='link' className="mt-4 w-full" asChild>
                            {isSuccess ? (
                                <a
                                    href={`/Menu`}
                                >
                                    Back to Menu
                                </a>
                            ) : (
                                <Link
                                    href={`products/${paymentIntent.metadata.cartId}/purchase`}
                                >
                                    Try again
                                </Link>)}
                        </Button>
                </div>
            </div>

        </div>
    );
}

