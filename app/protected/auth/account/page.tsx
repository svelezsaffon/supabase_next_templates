"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from '@/components/context/session'
import { useLanguage } from '@/components/context/language'
import MetadataForm from '@/components/forms/account/metdata'

import nameMessages from "../../../../strings/pages/account.json"
import passMEssages from "../../../../strings/pages/password.json"

import PasswordForm from '@/components/forms/account/password'

const Page = () => {
        const session=useSession()
        const language=useLanguage()
        if(!session.user){
            return null
        }

    return (
        <div className="grid grid-cols-2 gap-2">
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl">{nameMessages[language.lang].title.name.h1}</CardTitle>
                <CardDescription>{nameMessages[language.lang].title.name.subheding}</CardDescription>
                </CardHeader>
                <CardContent>
                    <MetadataForm/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl">{passMEssages[language.lang].title.name.h1}</CardTitle>
                <CardDescription>{passMEssages[language.lang].title.name.subheding}</CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordForm/>
                </CardContent>
            </Card>            
        </div>
    )
}

export default Page



