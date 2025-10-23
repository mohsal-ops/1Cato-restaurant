import React from 'react'
import z from "zod";
import { sendTelegramMessage } from "@/lib/telegram";
import MarketingCollabComponent from "./_components/MarketingCollab";
import { toast } from "sonner";

const MarketingCollabSchema = z.object({
    Company: z.string().min(1, "Name is required"),
    Name: z.string().min(1, "Name is required"),
    Email: z.string().email("Invalid email"),
    Phone: z.string().min(5, "Phone number required"),
    Budget: z.preprocess((val) => Number(val), z.number().min(1, "Guests required")),
    Notes: z.string().optional(),
  });
  export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Parse & validate with Zod
    const result = MarketingCollabSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.issues);
      toast.error("Please fill all required fields correctly.");
      return;
    }

    const validatedData = result.data;

    await sendTelegramMessage(`
📈 <b>New Marketing collaboration</b>
👤 ${validatedData.Name}
🏢 ${validatedData.Company}
📱 ${validatedData.Phone}
✉️ ${validatedData.Email}
💰 ${validatedData.Budget} $
📝 ${validatedData.Notes || "No notes"}
`)

    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Thanks! Your collaboration request has been sent.");
  }


export default function MarketingCollabPage() {
  

  return (
    <MarketingCollabComponent/>
  )
}




