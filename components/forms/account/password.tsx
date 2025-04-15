"use client"

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from '@/components/context/session'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { toast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/context/language'
import messages from "../../../strings/pages/password.json"

const updatePasswordSchema = z.object(
    {
        password:z.string().min(10).max(100)
    }
)

const PasswordForm = () => {
    const supabase = createClient()
    const session=useSession()
    const language=useLanguage()

    const metadataForm = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    if(!session.user){
        return null
    }

    async function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
        if(session.user){
            try {
                const { error } = await supabase.auth.updateUser(values)        
                if(error){
                    toast({
                        title: "Update Error",
                        description: error.message,
                    })
                }else{
                    session.refresh()
                    toast({
                        title: "Update",
                        description: messages[language.lang].success.name,
                    })                    
                }                
            } catch (error: unknown) {
                
                toast({
                    title: "Scheduled: Catch up",
                    description: "Unknown error contatc admin",
                })
            }
        }        
    }    
    return (
        <Form {...metadataForm}>
            <form onSubmit={metadataForm.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={metadataForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{messages[language.lang].fields.name.heading}</FormLabel>
                        <FormControl>
                            <Input placeholder={messages[language.lang].fields.name.heading} {...field} type="password" />
                        </FormControl>
                        <FormDescription>
                            {messages[language.lang].title.name.description}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit">{messages[language.lang].button.submit}</Button>
            </form>
        </Form>
    )
}

export default PasswordForm



