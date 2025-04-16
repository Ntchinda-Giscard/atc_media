import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image"

type Props = {
    image: StaticImport,
    title: string,
    index: number,
    desc?: Array<string>,
}

function FonctionnalitesCard({image,title, index, desc}: Props) {
    const isEven = index % 2 === 0;
    return ( 
        <>
            <div key={title} className={`flex flex-row justify-center gap-15  ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="">
                    <Image src={image} width={500} height={400} alt={"image"} />
                </div>
                <div className="flex flex-col text-justify break-words text-pretty">
                    <h2 className="font-semibold text-xl text-start mb-6"> {title} </h2>
                    <div className="flex flex-col gap-5 w-full text-start">
                        { desc?.map((t) => (
                            <p key={t} className="font-thin text-sm"> {t} </p>
                        ))

                            
                        }
                    </div>
                </div>
            </div>
        </>
     );
}

export default FonctionnalitesCard;