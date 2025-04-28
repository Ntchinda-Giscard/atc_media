"use client"

import { useAutoLogout } from "@/lib/hooks/useAutoLogout";

export default function AutoLayoutClient(){
    useAutoLogout();
    return null
}