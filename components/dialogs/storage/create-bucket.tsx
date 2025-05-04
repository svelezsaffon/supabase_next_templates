import { PlusIcon } from "lucide-react"

import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createClient } from '@/lib/supabase/client'
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
import { useState } from "react"

const createBucketSchema = z.object(
    {
        name:z.string().min(5).max(100)
    }
)

type CreateBucketFormProps={
    onSuccess:()=>void
}

export function CreateBucketForm({onSuccess}:CreateBucketFormProps) {

    const supabase = createClient()
    const session=useSession()

    const [openDialog,setOpenDialog] = useState<boolean>(false)

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
                const { error } = await supabase.storage.createBucket(values.name, 
                    {
                        public: false,
                        allowedMimeTypes: ['image/*'],
                        fileSizeLimit: 1000 * 1000 * 10
                    })
                if(error){
                    toast({
                        title: "Error",
                        description: error.message,
                    })
                }else{
                    toast({
                        title: "Bucket was created",
                        description: "La Carperta fue create correctamente",
                    })
                    onSuccess()
                }
            } catch {                
                toast({
                    title: "Scheduled: Catch up",
                    description: "Unknown error contatc admin",
                })
            }finally{
                setOpenDialog(false)
            }
        }        
    }     
    return (
        <Dialog open={openDialog}>
            <Button
                onClick={()=>{
                    setOpenDialog(true)
                }}
                className="flex items-center gap-2"
            >
                <PlusIcon/>
                Crear Carpeta
            </Button>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Crear Carpeta</DialogTitle>
                    <DialogDescription>
                        Una nueva carpeta para guardar tus images
                    </DialogDescription>
                </DialogHeader>
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
                        <DialogFooter className="flex items-center justify-betwee">
                            <Button 
                                onClick={()=>{
                                    setOpenDialog(false)
                                }}
                                type="button" 
                                variant="secondary"
                            >
                                    Close
                            </Button>
                            <Button type="submit">Guardar</Button>
                        </DialogFooter>                        
                    </form>                    
                </Form>
            </DialogContent>
        </Dialog>
    )
}
