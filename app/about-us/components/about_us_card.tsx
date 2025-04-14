import { Button } from "@/components/ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image"
import Link from "next/link";



type Props = {
    image: StaticImport,
    title?: string,
    index: number,
    desc?: Array<string>,
}

function AboutUsCard({image, title, index, desc}: Props) {
    const isEven = index % 2 === 0;
    return ( 
        <>

            <div key={title} className={`flex w-full flex-row justify-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} `}>
                <div className=" w-fit ">
                    <Image src={image} width={500} height={400} alt={"image"} />
                </div>
                <div className="flex flex-col w-2/5">
                    <h2 className="font-semibold text-xl text-start mb-6"> {title} </h2>
                    <div className="flex flex-col gap-5 w-full text-start text-justify">
                        { desc?.map((t) => (
                            <p key={t} className="font-thin text-sm whitespace-nowrap overflow-hidden text-ellipsis"> {t} </p>
                        ))
                            
                        }
                        {
                            index === 2 &&
                            <Button asChild className="hover:bg-transparent w-fit hover:text-inherit r-2 bg-red-600 px-6 py-1 rounded-xl shadow-lg shadow-red-500/50 hover:shadow-none hover:ring-2"> 
                                <Link href={"/fontionnalities"} > Découvrir nos fonctionnalités  </Link>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUsCard;