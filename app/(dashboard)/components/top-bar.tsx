import topLogo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image"

function TopBar() {
    return ( <>
        <div className="flex justify-between">
            <Image
                alt="top logo"
                src={topLogo} 
                width={67}
                height={50}
            />
        </div>
     
    </> );
}

export default TopBar;