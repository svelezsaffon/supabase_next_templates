"use client"
import {
    LanguagesIcon,
} from "lucide-react"

import { 
    createContext, 
    useContext,
    PropsWithChildren, 
    useState, 
    useMemo 
} from "react";
import { Switch } from "../ui/switch";
import DynamicTextIcon from "../ui/dynamic-icon";


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

    return (
        <div className="flex w-full px-2 items-center justify-between">
            <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 text-sm outline-none ">
                <LanguagesIcon size={ICON_SIZE}/>
                <span>Language</span>
            </div>
            <div className="flex items-center justify-between gap-2">
                <DynamicTextIcon text="Es" size={ICON_SIZE}/>
                <Switch 
                    checked={language.lang === 'es'}
                    onCheckedChange={(a)=>{
                    language.setLanguage(a?'es':'en')
                }}/>
                    <DynamicTextIcon text="En" size={ICON_SIZE}/>
            </div>
        </div>
      );
}

export default LanguageProvider