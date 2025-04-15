"use client"
import {
    LanguagesIcon
  } from "lucide-react"

import { 
    createContext, 
    useContext,
    PropsWithChildren, 
    useState, 
    useMemo 
} from "react";
import { Button } from "../ui/button";

type language="es" | "en"

type LanguageContextType = {
    lang:language;
    setLanguage:React.Dispatch<React.SetStateAction<language>>
}

const LanguageContext = createContext<LanguageContextType >({lang:'es',setLanguage:()=>{
    throw Error("Un implemented set language")
}})

export const useLanguage = () =>{
    const context = useContext(LanguageContext)
    if(!context){
        throw new Error('Language context must be used inside a provider')
    }
    return context
}

const LanguageProvider =({children}:PropsWithChildren) =>{
  const [lang,setLanguage] = useState<language>("es")

  const languageContextMemo = useMemo<LanguageContextType>(()=>(
    {lang,setLanguage}
),[lang])

  return (
    <LanguageContext.Provider value={languageContextMemo}>
        {children}
    </LanguageContext.Provider>
  )

}

const ICON_SIZE = 16;

export const SelectLanguage = () =>{
    const language=useLanguage()

    return(
        <div className="flex w-full px-2 items-center justify-between">
            <LanguagesIcon size={ICON_SIZE} />
            <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm p-2 text-sm">
                <Button
                    size="sm"
                    variant={language.lang==="es"?"default":"secondary"} 
                    onClick={()=>{language.setLanguage("es")}}
                >
                    Es
                </Button>
                <Button 
                    size="sm"
                    variant={language.lang==="en"?"default":"secondary"} 
                    onClick={()=>{language.setLanguage("en")}}
                >
                    En
                </Button>
            </div>
        </div>
    )
}

export default LanguageProvider