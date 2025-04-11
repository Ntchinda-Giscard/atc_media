import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {ChevronDown} from "lucide-react";



export default function HomeFooter(){

    return(
        <>
            <div className={'flex flex-between px-2 py-2 '}> 
                <Image src={logo} alt="logo" />
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row"> 
                        <div>🇫🇷 FR</div>
                        <ChevronDown />
                    </div>
                    
                    <Button className="r-2"> Se Connecter </Button>
                </div>
                
            </div>
        </>
    )
}