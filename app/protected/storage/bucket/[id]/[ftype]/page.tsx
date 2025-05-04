'use client'

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from 'react';
import {FileObject} from "@supabase/storage-js"
import { toast } from '@/hooks/use-toast'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { DeleteIcon, EllipsisVertical,ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  


type FileUploadProps = {
    bucketName:string;
    path:string;
}

type FileCardProps = {
    path:string;
    bucketId:string;
    fileObject:FileObject;
}
const FileCard = ({bucketId,fileObject,path}:FileCardProps) =>{
    const supabase = createClient()
    const [imageUrl, setImageURL] = useState<string | null>(null)
    
    useEffect(() => {
        async function downloadImage(name: string) {
          try {
            const { data, error } = await supabase.storage.from(bucketId).download(`${path}/${name}`)
            if (error) {
              throw error
            }
            const url = URL.createObjectURL(data)
            setImageURL(url)
          } catch (error) {
            console.log('Error downloading image: ', error)
          }
        }
    
        if (fileObject) downloadImage(fileObject.name)
      }, [supabase])
    
      const handleDelete = async () =>{
        if(fileObject){
            const { error } = await supabase.storage.from(bucketId).remove([`${path}/${fileObject.name}`])
            if(error){
                toast({
                    title: "Delete Error",
                    description: error.message,
                })
            }else{
                toast({
                    title: "Borrar",
                    description: "El archivo fue borrado",
                })
            }
        }        
    }

    return (
        <Card >
            <CardHeader>
                <div className="flex justify-between gap-2">
                    <ImageIcon size={18}/>
                    <span>{fileObject.name}</span>
                    <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical size={18}/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={handleDelete}
                        >
                            <DeleteIcon/>
                            Delete
                        </DropdownMenuItem>                        
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="justify-center">
                {imageUrl&&(
                        <Image
                            src={imageUrl}
                            width={100}
                            height={100}
                            alt="Image"
                            style={{ height: 100, width: 100 }}
                            className="justify-center"
                        />
                    )}
            </CardContent>
        </Card>
    )
}


const FileUpload = ({bucketName,path=""}:FileUploadProps) => {
    const props = useSupabaseUpload({
      bucketName: bucketName,
      path: path,
      allowedMimeTypes: ['image/*'],
      maxFiles: 10,
      maxFileSize: 1000 * 1000 * 10, // 10MB,
    })
   
    return (
      <div >
        <Dropzone {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>
    )
}

const Page = ({params}: {params: Promise<{ id: string,ftype:string }>}) =>{
    const [bucketId,setBucketId] = useState<string>()
    const [path,setPath] = useState<string>('')
    const [objects,setObjects] = useState<FileObject[]>([])
    const supabase= createClient();

    const getFilesFromBucket = async (bucketIdentifier:string) =>{
        const { data, error } = await supabase
        .storage
        .from(bucketIdentifier)
        .list(path,{
            limit: 100,
            offset: 0,
        })
        if(error){
            toast({
                title: "Error",
                description: error.message,
            })
        }else{
            setObjects(data as FileObject[])
        }         
    }
    
    useEffect( ()=>{
        if(bucketId){
            getFilesFromBucket(bucketId)
        }
    },[bucketId])

    useEffect(()=>{
        const loadBucketId = async () =>{
            const { id,ftype } = await params
            if(id){
                setBucketId(id)
            }
            if(ftype){
                setPath(ftype)
            }
        }  
        loadBucketId()
    },[])

    if(!bucketId){
        return null;
    }
    return (
        <div className="flex flex-col gap-10">
            <div className="grid grid-cols-4 gap-4">
                {objects.map((obj)=>(
                    <FileCard bucketId={bucketId} key={`obj-card-${obj.id}`} fileObject={obj} path={path}/>
                ))}
            </div>            
            {bucketId&&(
                <div>
                    <FileUpload bucketName={bucketId} path={path}/>
                </div>
            )}
        </div>
    )
}

export default Page