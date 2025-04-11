import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {ChevronDown} from "lucide-react";



export default function HomeHeader(){

    return(

            <div className={'flex justify-between px-5 py-4 min-w-full items-center '}> 
                <Image src={logo} alt="logo" width={100} height={100} />
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row items-center"> 
                        <div>🇫🇷 FR</div>
                        <ChevronDown />
                    </div>
                    
                    <Button className="hover:bg-transparent hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
                        Se Connecter 
                    </Button>
                </div>
                
            </div>
    )
}