import com_img from "@/public/assets/home_com_img.svg"
import Image from "next/image"

function HomeBody() {
    return ( 
        <>
            <div className="flex flex-row w-full py-6 px-8 gap-5 items-center">
                <div className="flex flex-col gap-3 w-1/2">
                    <h1 className="font-semibold text-6xl py-5 ">
                        Plateforme de gestion et diffusion de contenus multimédias
                    </h1>
                    <p className="font-light text-base">
                        Transformez vos écrans en puissants supports de communication et engagez votre audience avec des contenus interactifs et dynamiques.
                    </p>
                    <p className="leading-7 text-sm">
                        ✅ Créez & personnalisez des modèles adaptés à votre marque. <br /> ✅ Diffusez sur un réseau d’écrans en temps réel ou selon un planning défini. <br /> ✅ Ajoutez du contenu multimédia : textes, images, vidéos, flux RSS et widgets interactifs. <br />✅ Suivez les performances grâce aux statistiques détaillées et aux rapports en temps réel. <br />
                        🎯 Optimisez votre stratégie de communication et boostez votre visibilité !
                    </p>

                </div>
                <div className="w-1/2">
                    <Image src={com_img} alt={"computer image"} />
                </div>
            </div>
        </> 
    );
}

export default HomeBody;