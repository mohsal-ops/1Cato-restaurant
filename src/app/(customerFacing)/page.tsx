
import Image from "next/image";
import mainImg from '@/../public/general/mainImage.jpg'
import img2 from '@/../public/general/prod1.jpg'
import img3 from '@/../public/general/vibe.jpg'
import Link from "next/link";
import PageHeader from "./_components/PageHeader";
import { Suspense } from "react";
import { CartItem, Item, Location } from "@prisma/client";
import { ProductSuspense } from "./Menu/_components/ProductSuspense";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FaStar } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiPackageFill } from "react-icons/pi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { BsBagCheckFill } from "react-icons/bs";
import { TbPlant2Off } from "react-icons/tb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Map from "@/components/map";
import GetPlaces from "./_components/getPlaces";
import Logo from "@/../public/general/logo.png"
import { GetCartItems, GetFeaturedProducts } from "./Menu/_actions/getDataNeeded";
import { ProductCardSkeleton } from "./_components/ProductCardServer";
import { cookies } from "next/headers";
import { ThirdSectionComponent } from "./_components/AnimatedImages";
import { Button } from "@/components/ui/button";




export const metadata = {
  title: "1Cato Snow Cones | Refreshing Snow Cones in NYC",
  description: "Order delicious, gluten-free, fat-free snow cones for schools, corporate events, and festivals in NYC. Book online or request a quote!",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "1Cato Snow Cones | NYC",
    description: "Refreshing, natural snow cones for events and daily orders. Gluten-free, fat-free, and fully customizable.",
    url: "https://1cato.com",
    siteName: "1Cato Snow Cones",
    images: [{ url: "/general/mainImage.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1Cato Snow Cones | NYC",
    description: "Order fresh snow cones online or book for your event.",
    images: ["/general/mainImage.jpg"],
  },
};


export default async function Home() {

  // Server-side fetch for SEO
  const products: Item[] = await GetFeaturedProducts();
  const cartId = (await cookies()).get("cart_id")?.value;
  const cart = cartId ? await GetCartItems(cartId) : null

  const placesRes = await GetPlaces();
  const places: Location[] = placesRes?.places ?? [];
  const lat = places[0]?.lat ?? 0;
  const lng = places[0]?.lng ?? 0;
  return (
    <>
      {/* ---------------- JSON-LD LocalBusiness ---------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "1Cato Snow Cones",
            image: "https://1cato.com/general/mainImage.jpg",
            priceRange: "$",
            telephone: "(619) 443-2165",
            address: {
              "@type": "PostalAddress",
              streetAddress: "921 E 86th St",
              addressLocality: "Brooklyn",
              addressRegion: "NY",
              postalCode: "11236",
              addressCountry: "US"
            },
            url: "https://1cato.com",
            sameAs: ["https://www.instagram.com/1cato", "https://www.facebook.com/1cato"]
          }),
        }}
      />
      <div className="flex pt-20 flex-col gap-8 items-center justify-center  md:space-y-20 space-y-10  [&>*:not(:first-child)]:m-2">
        <TopSection />
        <SecondSection products={products} cartItems={cart?.items ?? []} />
        <ThirdSection />
        <ReviewsSection />
        <div className="p-2 w-full flex justify-center">
          <OrderDirectlyfromOUrWebsite />
        </div>
        <Featuring />
        <DistinctiveFeatures />
        {/* <div className="p-2 w-full">
          <RewardsProgram />
        </div> */}
        <div className="p-4 w-full flex justify-center">
          <Frequentlyaskedquestions />
        </div>
        <OurLocation places={places} lat={lat} lng={lng} />

      </div>
    </>
  );
}

export function TopSection() {
  return (
    <div className="flex relative overflow-hidden max-h-svh sm:flex-row sm:w-[85%] flex-col bg-stone-100 sm:rounded-3xl sm:p-2 ">
      <div className="sm:relative absolute z-30 bottom-20  flex flex-col gap-8 items-start justify-end mt-10 md:mb-20 md:w-1/2 p-5  md:p-12">
        <span className="lg:text-5xl text-white sm:text-black text-4xl font-bold leading-10 lg:leading-[60px] "><h1 className="text-orange-500">Refreshing</h1> healthy, and guilt-free <span className="circle-sketch-highlight">
          snow cones
        </span>
        </span>
        <span className="font-semibold text-zinc-400 sm:text-muted-foreground text-md">They're always gluten-free, fat-free, and made to be a treat you can enjoy without worry.</span>

        <Link href="/HostEvent"  >
          <Button size="lg" variant="mainButton">
            Book an Event
            <MdKeyboardArrowRight />
          </Button>
        </Link>

      </div>
      <div className="md:w-1/2 w-full  sm:rounded-3xl overflow-hidden">
        <Image priority alt="best snow cone in New York city " src={mainImg} className="object-contain " />
        <div className="sm:hidden absolute top-0 bg-auto bg-black/30 backdrop-blur-none z-20 w-full h-full"></div>
      </div>

    </div>
  )
}

export function SecondSection({ products, cartItems }: { products: Item[], cartItems: CartItem[] }) {

  return (
    <div className="flex-col space-y-6 p-3 sm:w-10/12 w-full  overflow-hidden">
      <div className="flex justify-between">
        <PageHeader>Featured</PageHeader>
        <Link href="/Menu"  >
          <Button size="lg" variant="outline" className="h-12  text-left">
            View Menu
          </Button>
        </Link>
      </div>
      <div className="grid grid-flow-col justify-start gap-7 w-full  overflow-auto  pb-10">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense cartItems={cartItems} products={products} />
        </Suspense>
      </div>
    </div>

  )
}

export function ThirdSection() {
  return (
    <ThirdSectionComponent />
  )
}


function ReviewCard({ name, review }: { name: string, review: string }) {
  return (
    <Card className="w-full  overflow-hidden rounded-2xl shadow-lg ">
      <CardHeader className="flex flex-row">
        {[...Array(5)].map((_, i) =>
          <FaStar key={i} />
        )}
        <FaStar />
      </CardHeader>
      <CardContent className="font-normal">
        {review}
      </CardContent>
      <CardFooter className="flex justify-start gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-lg font-semibold">{name}</p>
      </CardFooter>
    </Card>
  )

}
export function ReviewsSection() {
  const reviews = [
    {
      name: "Pedro L.",
      review: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate non quibusdam dolores velit sit nesciunt voluptas animi numquam laboriosam nisi alias nemo hic, cum quas soluta mollitia adipisci iusto excepturi error nostrum? Deleniti, at."
    },
    {
      name: "Pedro L.",
      review: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate non quibusdam dolores velit sit nesciunt voluptas animi numquam laboriosam nisi alias nemo hic, cum quas soluta mollitia adipisci iusto excepturi error nostrum? Deleniti, at."
    },
    {
      name: "Pedro L.",
      review: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate non quibusdam dolores velit sit nesciunt voluptas animi numquam laboriosam nisi alias nemo hic, cum quas soluta mollitia adipisci iusto excepturi error nostrum? Deleniti, at."
    }
  ]
  return (
    <div className=" flex flex-col items-center  md:w-10/12 p-10 space-y-10 bg-gray-100 rounded-4xl">
      <div className="text-center space-y-4">
        <PageHeader>What our guests are saying</PageHeader>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3 sm:w-10/12 w-full  gap-6 ">
        {reviews.map((Rev, key) =>
          <ReviewCard key={key} name={Rev.name} review={Rev.review} />
        )}
      </div>
    </div>
  )

}

export function OrderDirectlyfromOUrWebsite() {
  return (
    <div className="relative flex items-end max-h-svh sm:w-10/12  rounded-3xl overflow-hidden   ">
      <Image priority src={mainImg} alt="best snow cone in NYC" className="object-cover w-full h-full" />
      <div className="p-1 - absolute  md:left-30  md:top-1/3 sm:w-[50rem] ">
        <Card className=" md:p-8 md:space-y-4 bg-stone-300 rounded-3xl  md:w-[45rem]">
          <CardHeader>
            <PageHeader>Order From Our Website</PageHeader>
          </CardHeader>
          <CardContent className="font-semibold text-lg text-accent-foground ">
            Order directly from our website to save money in fees, get faster service, earn free food via our rewards program, and support local business.
          </CardContent>
          <CardFooter>
            <Link href="/Menu"  >
              <Button size="lg" variant="mainButton">
                Order Online
                <MdKeyboardArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card></div>
    </div>
  )
}
export function DistinctiveFeatures() {
  return (
    <div className="flex flex-col space-y-5 md:w-10/12 rounded-3xl overflow-hidden ">
      <div className="flex md:flex-row flex-col justify-between  md:h-[33rem] h-full">
        <Image priority src={img2} alt="Refreshing snow cones" className="object-cover md:w-[45%] w-full h-full rounded-3xl" />
        <div className="flex flex-col space-y-7 p-5 justify-center   md:w-[45%] w-full h-full">
          <PageHeader>Only refreshing scow cones</PageHeader>
          <p className="text-lg font-medium text-gray-500">We invest in quality ingredients to ensure our customers get the great taste we're famous for. Because we believe that you deserve the best.</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-between md:h-[33rem] h-full">
        <div className="flex md:order-1 order-2 flex-col space-y-7 p-5 justify-center   md:w-[45%] w-full h-full">
          <PageHeader>Sip, chill, and smile</PageHeader>
          <p className="text-lg font-medium text-gray-500">Our drinks are made to refresh your day, using real fruits, balanced flavors, and the perfect chill for every moment.</p>
        </div>
        <Image priority src={img3} alt="Refreshing snow cones" className="object-cover flex items-start bg-amber-200 md:order-2 order-1 md:w-[45%] w-full h-full rounded-3xl" />
      </div>

    </div>
  )
}
export function Featuring() {
  const featuring = [
    {
      name: "Takeaway",
      image: PiPackageFill
    },
    {
      name: "Family friendly",
      image: MdOutlineFamilyRestroom
    },
    {
      name: "Catering",
      image: BsBagCheckFill
    },
    {
      name: "Gluten-Free Options",
      image: TbPlant2Off
    },
  ]
  return (
    <div className=" flex flex-col gap-14 items-center py-16 w-full md:w-1/2  ">
      <PageHeader>Featuring</PageHeader>
      <div className="grid md:grid-cols-4 grid-cols-2  w-full gap-10  text-lg font-semibold ">
        {featuring.map((feature, index) =>
          <div key={index} className="flex flex-col items-center gap-5 text-center">
            <feature.image size={25} />
            <span>{feature.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
export function RewardsProgram() {
  return (
    <div className="relative flex items-end max-h-svh  rounded-3xl overflow-hidden   ">
      <Image priority src={mainImg} alt="best snow cone in NYC" className="object-cover w-full h-full" />
      <div className="p-1 - absolute  md:left-30  md:top-1/3 sm:w-[50rem] ">
        <Card className=" md:p-8 md:space-y-4 bg-stone-300 rounded-3xl md:w-[45rem]">
          <CardHeader>
            <PageHeader>1Cato Snow Cones Rewards</PageHeader>
          </CardHeader>
          <CardContent className="font-semibold text-lg text-accent-foground ">
            Join our rewards program to earn points, get free items, and stay up to date with us.
          </CardContent>
          <CardFooter>
            <Link href="/Menu"  >
              <Button size="lg" variant="mainButton">
                Order Online
                <MdKeyboardArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card></div>
    </div>
  )
}

export function Frequentlyaskedquestions() {
  return (
    <div className="flex items-center w-full flex-col md:py-10 md:w-10/12 overflow-hidden ">
      <div className="mb-10">
        <PageHeader >Frequently asked questions</PageHeader>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger >What are you known for?</AccordionTrigger>
          <AccordionContent className="text-balance text-lg w-full font-medium bg-sidebar-accent p-4 ">
            We’re known for our refreshing snow cones made with exotic and tropical flavors — like mango chili, passion fruit, blue raspberry, and coconut dream. Our signature blends are crafted with premium syrups, fresh ingredients, and just the right crunch of shaved ice that keeps our customers coming back for more!          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger >What meals do you serve?</AccordionTrigger>
          <AccordionContent className="text-balance text-lg font-semibold bg-sidebar-accent p-4 ">
            snow cones
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger >Do you offer delivery or takeout?</AccordionTrigger>
          <AccordionContent className="text-balance  text-lg font-semibold bg-sidebar-accent p-4 ">
            Yes we offer takeout
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger >Where are you located?</AccordionTrigger>
          <AccordionContent className="text-balance text-lg font-semibold bg-sidebar-accent p-4 ">
            We are located in <p className="font-bold">921 E 86th St, Brooklyn, NY 11236, United States</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

type placeObject = {
  name: string,
  lat: number,
  lng: number
}

export function OurLocation({ places, lat, lng }: { places: Location[], lat: number, lng: number }) {
  return (
    <div className=" flex text-sm flex-col sm:flex-row sm:justify-center  sm:items-center p-4  sm:space-x-10 sm:pr-10 h-[35rem] sm:h-[20rem] sm:w-[75%] sm:space-y-0 space-y-5 pb-10 bg-stone-200 rounded-4xl">
      <div className=" h-1/3  sm:h-full sm:w-[35rem] w-full rounded-4xl  overflow-hidden">
        <Map lat={lat} lng={lng} className="h-full w-full " />
      </div>

      <div className="flex flex-col items-end justify-end h-2/3 sm:h-full w-full text-md font-medium space-y-5">
        <div className="flex  flex-col sm:justify-between sm:h-10/12 w-full h-full sm:pt-5  space-y-10 ">
          <span className="w-full ">
            <p className="sm:text-lg">1Cato Snow Cones Exotic Natural Flavors</p>
            <p className="text-gray-500">NC, mobile location</p>
          </span>
          <span className="flex flex-col sm:items-end sm:flex-row w-full h-ful sm:space-y-0 space-y-10">
            <div className="space-y-3">
              <h2 className="text-gray-500 ">Address</h2>
              <h3 className="w-2/3  ">{places[0]?.name}</h3>
            </div>
            <div className="space-y-3">
              <h2 className="text-gray-500 ">Contact</h2>
              <h3>(619) 443-2165<br />ottavioslakeside@gmail.com</h3>
            </div>
          </span>
        </div>
        <div className="flex justify-between items-center w-full py-2 border  border-t-gray-300">
          <div>
            <p>Workinh Hours</p>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div>
            <Link href="/HostEvent"  >
            <Button size="sm" variant="mainButton">
              Book an Event
              <MdKeyboardArrowRight />
            </Button>
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  )

}
export function Footer() {
  return (
    <div className="flex w-full text-sm gap-4 items-center md:py-10  justify-between md:justify-center flex-col h-[35rem] sm:h-[15rem] sm:space-x-10  sm:pr-10  md:w-[98%] bg-stone-200 rounded-4xl">
      <div className=" flex flex-col md:flex-row  md:justify-center w-full h-4/5">
        <div className="flex  items-start sm:h-full h-1/3 justify-center w-full md:w-32">
          <Link href="/">
            <Image priority alt="snow cone logo" className="w-auto h-auto" src={Logo} height={70} width={70} />
          </Link>
        </div>
        <div className="flex text-start md:space-x-20 text-sm items-start p-4 md:justify-center font-semibold w-full md:w-3/5 flex-col md:flex-row">
          <div className="flex flex-col gap-2">
            <Button variant="link" ><Link href="/Home">Home</Link></Button>
            <Button variant="link" ><Link href="/Menu">Menu</Link></Button>
            <Button variant="link" ><Link href="/Blog">Blog</Link></Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="link" ><Link href="/Catering">Catering</Link></Button>
            <Button variant="link" ><Link href="/GiftCard">Gift Card</Link></Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="link" ><Link className="text-start" href="/MarketingCollab">Marketing Collaboration</Link></Button>
          </div>

        </div>
        <div className="md:h-full  h-1/5  w-full p-2  md:w-1/5 ">
          <Link href="/HostEvent"  >
            <Button size="sm" className="w-full" variant="mainButton">
              Book an Event
              <MdKeyboardArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center  justify-center md:justify-start  h-1/4 w-full py-2 border md:w-2/3  border-t-gray-300">
        <Button variant="link"><Link className="text-gray-500" href="/terms">Terms & Policies</Link></Button>
      </div>

    </div>
  )
}

