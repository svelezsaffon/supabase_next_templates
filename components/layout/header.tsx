"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { HeaderUser } from "./nav-user"
import Link from "next/link"
import { PropsWithChildren } from "react"
import {useSession} from "@/components/context/session";

type linkItemProps={
  href:string;
}& PropsWithChildren

const LinkItem =({href,children}:linkItemProps)=>{
  return(<Link
  href={href}
  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
  prefetch={false}
>
  {children}
</Link>
  )
}

const SiteHeader =() => {

  const session = useSession()

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center">
          <SidebarTrigger/>
          <Separator  
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="ml-auto flex gap-2">
          <LinkItem href="/">
            Home
          </LinkItem>
          <LinkItem href="/">
            About
          </LinkItem>
          <HeaderUser/>
      </div>      
      </div>
    </header>
  )
}

export default SiteHeader