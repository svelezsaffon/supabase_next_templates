"use client"

import React from 'react';
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
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { toast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/context/language'
import messages from "../../../strings/pages/password.json"

const createBucketSchema = z.object(
    {
        name:z.string().min(5).max(100)
    }
)

type BucketFormProps ={
    onSuccess:()=>void
}

const BucketForm = ({onSuccess}:BucketFormProps) => {
    const supabase = createClient()
    const session=useSession()
    const language=useLanguage()

    const form = useForm<z.infer<typeof createBucketSchema>>({
        resolver: zodResolver(createBucketSchema),
        defaultValues: {
            name: "",
        },
    })

    if(!session.user){
        return null
    }

    async function onSubmit(values: z.infer<typeof createBucketSchema>) {
        if(session.user){
            try {
                const { data, error } = await supabase.storage.createBucket(values.name, 
                    {
                        public: true,
                        allowedMimeTypes: ['image/png'],
                        fileSizeLimit: 1024
                    })      
                if(error){
                    toast({
                        title: "Error",
                        description: error.message,
                    })
                }else if(data){
                    toast({
                        title: "Bucket was created",
                        description: "Unknown error contatc admin",
                    })
                }
            } catch {                
                toast({
                    title: "Scheduled: Catch up",
                    description: "Unknown error contatc admin",
                })
            }finally{
                onSuccess()
            }
        }        
    }    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={"Nombre Carpeta"} {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{messages[language.lang].button.submit}</Button>
            </form>
        </Form>
    )
}

export default BucketForm



