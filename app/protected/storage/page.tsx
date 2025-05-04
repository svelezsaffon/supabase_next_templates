"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, FilesIcon, ImageIcon, LucideIcon} from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import { useSession } from "@/components/context/session"

type BucketsProps = {
    folder:string;
    icon:LucideIcon
}

const BUCKETS:BucketsProps[]=[
    {
        "folder":"pictures",
        "icon":ImageIcon,
    },
    {
        "folder":"files",
        "icon":FilesIcon
    }
]

const StoragePage =()=>{
    const router = useRouter()
    const sesssion=useSession()

    return(
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-4">
                {BUCKETS.map((bucket)=>(
                    <Card key={bucket.folder}>
                        <CardHeader >
                            <div className="flex items-center justify-between">
                                <div className="flex items-start justify-between gap-2">
                                    {bucket.icon && <bucket.icon />}
                                    {bucket.folder}
                                </div>
                                <Button 
                                    onClick={() => router.push(`/protected/storage/bucket/${sesssion.user?.id}/${bucket.folder}`)}
                                    variant="secondary"
                                >
                                    <ArrowRight/>
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default StoragePage