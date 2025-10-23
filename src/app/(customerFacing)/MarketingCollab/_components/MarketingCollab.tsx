"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import pic2 from '../../../../../public/general/nightfestival.png'
import { handleSubmit } from "../page";


export default function MarketingCollabComponent() {
    const [open, setOpen] = useState(false);
    const handleSubmitfun = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleSubmit(e)
            setOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Failed to send request. Please try again.")
        }
    };

    return (
        <main className="flex flex-col items-center  pt-20  md:w-[80vw]">
            {/* Hero */}
            <section className="relative w-full  h-[80vh] flex flex-col items-center justify-center text-center px-6  text-gray-200 ">

                <div className="h-auto  w-1/2 p-4 " >
                    <Image
                        src={pic2}
                        alt="Collaboration background"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />

                </div>



                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg z-10">
                    Partner with Us & Get Your Brand Noticed
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-xl z-10">
                    Custom branding opportunities on our truck, packaging, and event presence.
                </p>
                <div className="mt-8 z-10">
                    <Button
                        variant="mainButton"
                        className="rounded-full text-lg px-6 py-3"
                        onClick={() => setOpen(true)}
                    >
                        Get Collab Info
                    </Button>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-6 max-w-6xl text-center">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="grid gap-6 sm:grid-cols-3">
                    <Card className="rounded-2xl shadow-md p-6">
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">1. Choose Visibility</h3>
                            <p>Select options such as truck graphics, branded cups or event banners.</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl shadow-md p-6">
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">2. Launch Activation</h3>
                            <p>We deploy at high-energy events and drive brand awareness live.</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl shadow-md p-6">
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">3. Measure Impact</h3>
                            <p>Receive a report with impressions, engagement and brand lift.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Package Tiers */}
            <section className="py-16 px-6 bg-gray-50 w-full">
                <h2 className="text-3xl font-bold text-center mb-10">Collab Packages</h2>
                <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
                    {[
                        { name: "Bronze", benefits: ["Logo on Cups", "Social Shout-out"], price: "From $1,500" },
                        { name: "Silver", benefits: ["Logo on Truck Banner", "Sampling Table", "Email Feature"], price: "From $3,000" },
                        { name: "Gold", benefits: ["Full Co-Branded Packaging", "Dedicated Promo Event", "Custom Analytics Report"], price: "Custom Quote" },
                    ].map((tier, i) => (
                        <Card key={i} className="rounded-2xl shadow-md overflow-hidden">
                            <CardContent className="p-6 space-y-3">
                                <h3 className="text-2xl font-bold">{tier.name}</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    {tier.benefits.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                                <p className="text-xl font-semibold mt-4">{tier.price}</p>
                                <Button className="rounded-full mt-3" onClick={() => setOpen(true)}>
                                    Request Collab
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Logo Wall */}
            <section className="py-16 px-6 max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-8">Trusted By</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center">
                    {["logo1.png", "logo2.png", "logo3.png", "logo4.png", "logo5.png", "logo6.png"].map((src, i) => (
                        <div key={i} className="flex items-center justify-center p-4">
                            <Image src={`/images/${src}`} alt={`Partner logo ${i + 1}`} width={120} height={60} className="object-contain" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Request Collab Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent aria-describedby={undefined} className="max-w-lg p-4">
                    <DialogHeader>
                        <DialogTitle>Request a Collaboration</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitfun} className="space-y-4 mt-4">
                        <Input name="Company" placeholder="Company Name" required />
                        <Input name="Name" placeholder="ex: Mr. petter" required />
                        <Input name="Email" placeholder="Email" type="email" required />
                        <Input name="Phone" type="tel" placeholder="Phone Number" required />
                        <Input name="Budget" placeholder="Budget / Desired Exposure" />
                        <Textarea name="Notes" placeholder="Tell us about your brand and goals" />
                        <Button variant="mainButton" type="submit" className="w-full rounded-full">
                            Send Request
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Footer CTA */}
            <section className="py-12 px-6 text-center">
                <p className="text-lg mb-4">Have a custom idea? We’d love to hear it.</p>
                <Button variant="mainButton" className="rounded-full px-8 py-3" onClick={() => setOpen(true)}>
                    Let’s Talk Collab
                </Button>
            </section>
        </main>
    );
}
