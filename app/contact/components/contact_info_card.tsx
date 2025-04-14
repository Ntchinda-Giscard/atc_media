import { Facebook, LucideTwitter } from "lucide-react";
import {IconBrandPinterest}  from "@tabler/icons-react";

function ContactInfoCard() {
    return ( 
        <>
            <div className="relative bg-red-600 w-64 min-h-100 h-full overflow-hidden rounded-md">
                <div className="flex flex-col text-white p-3 gap-4">
                    <p className="font-medium text-md"> 📍 Nos Coordonnées </p>
                    <div className="flex flex-col gap-3 font-thin text-md text-xs">
                        <p> 📞 Téléphone : +XXX XXX XXX XXX </p>
                        <p> 📩 Email : support@votresite.com </p>
                        <p> 📍 Adresse : [Votre adresse] </p>
                    </div>
                </div>

                <div className="flex flex-col p-3 gap-4">
                    <p className="text-white font-medium text-md "> 🤝 Restons connectés ! </p>
                    <div className="flex flex-row gap-4">
                        <Facebook color="white" />
                        <LucideTwitter color="white" />
                        <IconBrandPinterest color="white" />
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 w-16 h-16 bg-zinc-900/50 rounded-full"></div>


                <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                    <div className="w-50 h-50 bg-stone-900/90 rounded-full"></div>
                </div>
            </div>
        </>

    );
}

export default ContactInfoCard;