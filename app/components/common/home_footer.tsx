import Link from "next/link";
import { follow_us, legal_mentions, useful_links } from "../links";
import { Facebook, TwitterIcon } from "lucide-react"
import {IconBrandPinterest} from "@tabler/icons-react"


export default function HomeFooter(){

    return(
        <>
            <footer className="bg-stone-900 px-10 pt-5 mt-10 h-full">
                <div className="flex flex-col lg:flex-row gap-5 md:justify-around justify-center w-full text-start ">
                    <div className="gap-3 flex flex-col ">
                        <p className="text-white font-medium">LIEN UTILES</p>
                        {
                            useful_links.map((u) =>(
                                <Link 
                                    className="text-white text-sm font-extralight" 
                                    key={u?.label} 
                                    href={u?.route}> 
                                    {u?.label} 
                                </Link>
                            ))
                        }
                    </div>

                    <div className="gap-3 flex flex-col ">
                        <p className="text-white font-medium">MENTIONS LEGALES</p>
                        {
                            legal_mentions.map((u) =>(
                                <Link 
                                    className="text-white text-sm font-extralight" 
                                    key={u?.label} 
                                    href={u?.route}> 
                                    {u?.label} 
                                </Link>
                            ))
                        }
                    </div>

                    <div className="gap-3 flex flex-col">
                        <p className="text-white font-medium">SUIVEZ-NOUS</p>
                        <div className="flex flex-row gap-4 w-full justify-center"> 
                            <Facebook color="white" />
                            <TwitterIcon color="white" />
                            <IconBrandPinterest color="white" />
                        </div>
                        
                    </div>

                </div>
                <div className="w-full text-center text-xs font-thin text-white py-4">
                    &copy; Copyright 2019 Atc Média
                </div>
            </footer>
        </>
    )
}