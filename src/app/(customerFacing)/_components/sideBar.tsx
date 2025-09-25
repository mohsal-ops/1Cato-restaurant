import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from 'next/link';


export default function AppSideBar() {
  const links = [
    {
      name: "Menu",
      link:"Menu"
    },
    {
      name: "Catering",
      link: "Catering"
    },
    {
      name: "Host an event",
      link: "HostEvent"
    },
    {
      name: "Gift Card",
      link: "GiftCard"
    },
    {
      name: "Marketing Collaboration",
      link: "MarketingCollab"
    },
    ]
  return <>
   <div className="flex  overflow-auto gap-8 justify-center w-full py-1">                    
      <Sidebar >
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Application</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {links.map((obj, key) => (
                        <Link
                          key={key}
                          className="hover:bg-zinc-100 hover:duration-300 rounded-md text-center px-2 font-medium py-2"
                          href={`/${obj.link}`}
                        >
                          {obj.name}
                        </Link>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>          
    </div>
  </>
  
}
