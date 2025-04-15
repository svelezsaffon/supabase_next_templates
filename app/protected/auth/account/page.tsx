"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
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
import messages from "../../../../strings/pages/account.json"

const updateUserMetadata = z.object(
    {
        name:z.string().min(10)
    }
)


const Page = () => {

    const [isLoading, setIsLoading] = useState(false)
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
            } catch (error: unknown) {
                
                toast({
                    title: "Scheduled: Catch up",
                    description: "Unknown error contatc admin",
                })
            } finally {
                setIsLoading(false)
            }
        }        
    }    
  return (
    <div className="grid grid-cols-2 gap-2">
        <Card>
            <CardHeader>
            <CardTitle className="text-2xl">{messages[language.lang].title.name.h1}</CardTitle>
            <CardDescription>{messages[language.lang].title.name.subheding}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...metadataForm}>
                    <form onSubmit={metadataForm.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={metadataForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{messages[language.lang].fields.name.heading}</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {messages[language.lang].title.name.description}
                                </FormDescription>
                                <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                </Form>
            </CardContent>
        </Card>
        <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{messages[language.lang].title.name.h1}</CardTitle>
          <CardDescription>{messages[language.lang].title.name.subheding}</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...metadataForm}>
                <form onSubmit={metadataForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={metadataForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{messages[language.lang].fields.name.heading}</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                {messages[language.lang].title.name.description}
                            </FormDescription>
                            <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </CardContent>
      </Card>        
    </div>
  )
}

export default Page



