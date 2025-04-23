import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image"
import { IconBell, IconChevronDown, IconGlobe } from "@tabler/icons-react";
import { ActionIcon, Avatar, Group, Indicator } from "@mantine/core";

function TopBar() {
    return ( <>
        <div className="flex justify-between">
            <Image src={logo} alt="logo" width={50} height={50} />

            <Group>

                <Group>
                    <IconGlobe width={20} height={20} stroke={1.5} />
                    <IconChevronDown width={20} height={20} stroke={1.5} />
                </Group>
                
                <Indicator size={10}>
                    <ActionIcon> 
                        <IconBell style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Indicator>
                <Group>

                    <Avatar
                        color="initials"
                        src="https://i.pravatar.cc/150?img=3"
                        alt="User Avatar"
                        radius="xl"
                        size={40}
                    />
                    <IconChevronDown width={20} height={20} stroke={1.5} />
                </Group>
            </Group>
            
        </div>
     
    </> );
}

export default TopBar;