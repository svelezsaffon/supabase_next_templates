"use client"

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { useSession } from "../context/session"
import { Button } from "../ui/button"
import { useRouter } from 'next/navigation'

function cleanMail(mail?:string){
  if(!mail){
    return ':O'
  }

  return `${mail.slice(0,6)}...${mail.slice(-6)}`
}

export function HeaderUser(){
  const session = useSession()
  const router = useRouter()

  if(!session.user){
    return(
      <Button onClick={()=>{
        router.push('/auth/login')
      }}>
        Login
      </Button>
    )
  }
  return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild className="group inline-flex h-9 w-max items-center justify-center px-4 py-2">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage alt={session.user?.email} />
              <AvatarFallback className="rounded-lg">{session.user.email?.slice(0,2)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Usuario</span>
              <span className="truncate text-xs text-muted-foreground">
              {cleanMail(session.user?.email)}
              </span>
            </div>
            <MoreVerticalIcon className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={session.user.email} />
                <AvatarFallback className="rounded-lg">{session.user.email?.slice(0,2)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Usuario</span>
                <span className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserCircleIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={session.logout}>
            <LogOutIcon />
            Log out            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}