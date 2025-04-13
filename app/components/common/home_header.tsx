"use client"
import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {ChevronDown} from "lucide-react";
import Link from "next/link";
import { home_links } from "../links";
import { usePathname, useRouter } from "next/navigation";



export default function HomeHeader(){
    const pathname = usePathname();
    return(

            <div className={'flex justify-between px-5 py-4 min-w-full items-center '}> 
                <Image src={logo} alt="logo" width={100} height={100} />
                <div className="flex justify-around gap-5 flex-row items-center">
                    {
                        home_links?.map((h) =>(
                            <Link
                                key={h?.route} 
                                className={pathname === h?.route ? "text-red-600 text-sm" : "text-sm"}
                                href={h?.route}> 
                                {h?.label} 
                            </Link>
                        ))
                    }
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row items-center"> 
                        <div>🇫🇷 FR</div>
                        <ChevronDown />
                    </div>
                    
                    <Button asChild className="hover:bg-transparent hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
                        <Link href={"/auth/login"} > Se Connecter  </Link>
                    </Button>
                </div>
                
            </div>
    )
}