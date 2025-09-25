import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {  TopNavBar } from "./_components/navBar";

export default function Customerlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dynamic = "force-dynamic";
  return (
    <SidebarProvider>

      <main className="flex flex-col w-full ">
      <TopNavBar />
        {children}
      </main>
    </SidebarProvider>
  );
}