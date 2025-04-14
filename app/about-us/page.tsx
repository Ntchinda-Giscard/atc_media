import AboutUsCard from "./components/about_us_card";
import { about_us_static } from "./static-content";


function AboutUs() {
    return ( 
        <>
            <main className="h-full">
                <div className="flex flex-col text-center w-full">
                    <h1 className="text-3xl font-semibold"> 🚀 À Propos de Nous </h1>
                    <p className="font-light mt-4 text-sm px-10 mb-20"> Découvrez notre parcours, nos réalisations et les valeurs qui nous animent.</p>
                </div>
                <div className="flex flex-col gap-10">
                    {
                        about_us_static.map((a, index) =>(
                            <AboutUsCard
                                image={a?.img}
                                desc={a?.desc}
                                title={a?.title}
                                index={index}
                            />
                        ))
                    }
                </div>
            </main>
        </>
    );
}

export default AboutUs;