"use client"
import logo from "@/public/assets/top_bar_logo.svg";
import Image from "next/image"
import { IconBell, IconChevronDown, IconLogout, IconSearch, IconUser, IconWorld } from "@tabler/icons-react";
import { TextInput, Avatar, Group, Indicator, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import useStore from '@/stores/store';
import Link from "next/link"
import { TopUserButton } from "./user-menu";
//@ts-ignore
import Cookies from 'js-cookie';
import { error_notification } from "../utils/notification-center";
import {useRouter} from "next/navigation"
import { LangaugePicker } from "@/app/(site)/components/common/header_exp";


function TopBar() {
    // const [user, setUser] = useState<string | null>(null)
    const router = useRouter()
    const user = useStore(state => state.user);
    const logout = useStore(state => state.logout);
    const token = Cookies.get('auth_token');

    const handleLogout = async () =>{
        try{
            await logout(token);
            router.push("/auth/login")
        }catch(error){
            //@ts-ignore
            error_notification("Déconnexion", error?.response?.data?.reason)
        }
    }

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

                {/* <Group gap={1}>
                    <IconWorld width={20} height={20} stroke={1.5} />
                    <IconChevronDown width={16} height={16} stroke={1.5} />
                </Group> */}
                <LangaugePicker c={""} />
                
                <Indicator color="#EE0202" size={10}>
                        <IconBell style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </Indicator>
                <div className="flex flex-col">
                    <p className="font-semibold text-base"> {
                        //@ts-ignore
                        user?.name} </p>
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
                    <Menu shadow="md">
                              <Menu.Target>
                                <IconChevronDown width={16} height={16}  stroke={1.5} />
                              </Menu.Target>
                              <Menu.Dropdown>
                              <Menu.Item>
                                <TopUserButton name={user?.name} email={user?.email} />
                              </Menu.Item>
                              <Menu.Item component={Link} href={"/dashboard/my-account"} leftSection={<IconUser size={14} />}>
                                Mon compte 
                            </Menu.Item>

                            <Menu.Item color="red" onClick={handleLogout} leftSection={<IconLogout size={14} />}>
                                Déconnexion
                            </Menu.Item>

                            <Menu.Divider></Menu.Divider>
                            <Menu.Item>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-base"> {
                                        //@ts-ignore
                                        user?.name} </p>
                                    <p className="font-semibold text-xs text-red-600"> 0.5 Mo / 20Go - 0% </p>
                                </div>
                            </Menu.Item>

                              </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
            
        </div>
     
    </> );
}

export default TopBar;