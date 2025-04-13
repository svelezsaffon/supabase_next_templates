"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { UpdatePasswordForm } from '@/components/update-password-form'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
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

const updateUserMetadata = z.object(
    {
        name:z.string().min(10)
    }
)


const Page = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()
    const session=useSession()



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
                        description: "Usuario ha sido actualizado",
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
    <div className="grid grid-cols-3 gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tu nombre</CardTitle>
          <CardDescription>Please enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...metadataForm}>
                <form onSubmit={metadataForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={metadataForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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



