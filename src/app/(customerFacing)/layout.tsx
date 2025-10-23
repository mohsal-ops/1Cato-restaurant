import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNavBar } from "./_components/navBar";
import { Footer } from "./page";
import { Toaster } from "sonner";




export default async function Customerlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const dynamic = "force-dynamic";



  return (
    <SidebarProvider>
      <main className="flex relative flex-col w-full  pb-10 ">
        <div className="fixed top-0 left-0 right-0 z-50">
          <TopNavBar />
        </div>
        <div className="flex flex-col md:items-center   ">
          {children}
        </div>
        <div className="flex w-full justify-center">
          <Footer />
        </div>
      </main>
      <Toaster position="top-center" theme="light" />
    </SidebarProvider>
  );
}