import React from 'react'
import { sendTelegramMessage } from "@/lib/telegram";
import HostEventComponent from "./_components/HostEvent";
import { toast } from "sonner";
import z from "zod";


const hosteventschema = z.object({
    Name: z.string().min(1, "Name is required"),
    Email: z.email("Invalid email"),
    Phone: z.string().min(5, "Phone number required"),
    EventType: z.string().min(1, "Event type required"),
    Date: z.string().min(1, "Date required"), // still string, we’ll not force it to Date
    Guests: z.preprocess((val) => Number(val), z.number().min(1, "Guests required")),
    Notes: z.string().optional(),
  });

export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Parse & validate with Zod
    const result = hosteventschema.safeParse(data);

    if (!result.success) {
      console.log(result.error.issues);
      toast.error("Please fill all required fields correctly.");
      return;
    }

    const validatedData = result.data;




    await sendTelegramMessage(`
      🎪 <b>New Event Request</b>
      📅 ${validatedData.Date}
      📱 ${validatedData.Phone}
      👤 ${validatedData.Name} (${validatedData.Email})
      👥 ${validatedData.Guests} guests
      📝 ${validatedData.Notes || "No notes"}
      `);

    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Your quote request has been sent!");
  }
export default function HostEventPage() {
  return (
   <HostEventComponent/>
  );
}
