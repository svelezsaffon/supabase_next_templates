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
import messages from "../../../strings/pages/account.json"

const updateUserMetadata = z.object(
    {
        name:z.string().min(10).max(25)
    }
)

const MetadataForm = () => {
    const supabase = createClient()
    const session=useSession()
    const language=useLanguage()

    const metadataForm = useForm<z.infer<typeof updateUserMetadata>>({
        resolver: zodResolver(updateUserMetadata),
        defaultValues: {
            name: "",
        },
    })

    if(!session.user){
        return null
    }

    async function onSubmit(values: z.infer<typeof updateUserMetadata>) {
        if(session.user){
            try {
                const { error } = await supabase.auth.updateUser({ data: values })        
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
            } catch {
                
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{messages[language.lang].fields.name.heading}</FormLabel>
                        <FormControl>
                            <Input placeholder={messages[language.lang].fields.name.heading} {...field} />
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

export default MetadataForm



