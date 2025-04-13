"use client"

import { User } from "@supabase/supabase-js"
import { createContext, useContext,PropsWithChildren, useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'

type SessionContextType = {
    user?:User;
    logout:()=>void;
    setUser:React.Dispatch<React.SetStateAction<User | undefined>>
}

const SessionContext = createContext<SessionContextType|undefined>(undefined)

export const useSession = () =>{
    const context = useContext(SessionContext)
    if(!context){
        throw new Error('Session context must be used inside a provider')
    }
    return context
}

const SessionProvider =({children}:PropsWithChildren) =>{
  const supabase = createClient()
  const router = useRouter()
  const [user,setUser] = useState<User | undefined>(undefined)

  const getUserData = async ()=>{
    const response = await supabase.auth.getUser()
    if(response.data){
        setUser(response.data.user as User)
    }else{
        setUser(undefined)
    }
  }

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    getUserData()
    router.push('/auth/login')
  }  

  useEffect(()=>{
    getUserData()
  },[supabase])

  const sessionContextMemo = useMemo<SessionContextType>(()=>({user,logout,setUser}),[user?.id])

  return (
    <SessionContext.Provider value={sessionContextMemo}>
        {children}
    </SessionContext.Provider>
  )

}

export default SessionProvider