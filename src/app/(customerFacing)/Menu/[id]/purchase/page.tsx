import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { StripeCheckoutForm } from "../../_components/StripeCheckoutForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function page(
  {
    params 
  }:
    {
      params: { id: string }
    }
) {

  const id = params.id


  const cart = await db.cart.findUnique({
    where: { id },
    include: { items: true }

  })
  if (!cart || !id) return (
    <div className="h-svh justify-center w-full flex items-center text-stone-400">
      your Cart Id not found
      <Button variant='link'><Link href='/Menu'>Try again</Link> </Button>

    </div>
  )

  const total = cart.items.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0), 0);




  const paymentIntents = await stripe.paymentIntents.create({
    amount: total ,
    currency: "USD",
    metadata: { cartId: cart.id }
  })

  if (paymentIntents.client_secret == null) {
    throw Error("Stripe failed to create payment intents ")
  }


  return <StripeCheckoutForm priceInCents={total} clientSecret={paymentIntents.client_secret} />


}