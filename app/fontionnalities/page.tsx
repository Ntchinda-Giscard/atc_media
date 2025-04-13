import FonctionnalitesCard from "./components/fonc_card";
import { static_content } from "./static-content";

function Functionalities() {
    return ( 
        <>
            <div className="flex flex-col text-center">
                <h1 className="text-3xl font-semibold"> Fonctionnalités de [Nom du site] </h1>
                <p className="font-light mt-7 text-sm px-10 mb-20"> Bienvenue sur [Nom du site], la plateforme ultime pour la gestion et diffusion de contenus multimédias sur écrans connectés. Découvrez nos fonctionnalités avancées conçues pour simplifier et optimiser votre communication visuelle. </p>
                <div className="flex flex-col gap-12">
                    {
                        static_content.map((c, index) =>(
                            <FonctionnalitesCard
                                key={c?.title}
                                image={c?.img}
                                title={c?.title}
                                index={index}
                                desc={c?.desc}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Functionalities;