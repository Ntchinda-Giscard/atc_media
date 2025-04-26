"use client"
import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image"
import { IconBell, IconChevronDown, IconSearch, IconWorld } from "@tabler/icons-react";
import { TextInput, Avatar, Group, Indicator } from "@mantine/core";
import { useEffect, useState } from "react";
import useStore from '@/stores/store';

function TopBar() {
    // const [user, setUser] = useState<string | null>(null)
    const user = useStore(state => state.user);
    useEffect(() =>{
        const user = localStorage.getItem('user')
        if (user) {
            const parsedUser = JSON.parse(user)
            console.log('User:', parsedUser)

            console.log("Username", parsedUser?.name)
            // setUser(parsedUser)
          }
        
    }, [])
    return ( <>
        <div className="flex justify-between w-full items-center">
            <div className="flex flex-row items-center gap-12">
                <Image src={logo} alt="logo" width={50} height={50} style={{marginLeft: 30}} />
                <TextInput
                    leftSection={<IconSearch width={16} height={16} />}
                    radius={'md'}
                    color="#EE0202"
                    styles={{
                        input:{
                            color: "#EE0202"
                        }
                    }}
                    placeholder="Recherche"
                />

            </div>

            <Group>

                <Group gap={1}>
                    <IconWorld width={20} height={20} stroke={1.5} />
                    <IconChevronDown width={16} height={16} stroke={1.5} />
                </Group>
                
                <Indicator color="#EE0202" size={10}>
                    {/* <ActionIcon variant="subtle">  */}
                        <IconBell style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    {/* </ActionIcon> */}
                </Indicator>
                <div className="flex flex-col">
                    <p className="font-semibold text-base"> GMP TEST </p>
                    <p className="font-semibold text-xs text-red-600"> 0.5 Mo / 20Go - 0% </p>
                </div>
                <Group gap={1}>

                    <Avatar
                        color="initials"
                        src=""
                        //@ts-ignore
                        name= {user?.name}
                        alt="User Avatar"
                        radius="xl"
                        size={40}
                    />
                    <IconChevronDown width={16} height={16}  stroke={1.5} />
                </Group>
            </Group>
            
        </div>
     
    </> );
}

export default TopBar;