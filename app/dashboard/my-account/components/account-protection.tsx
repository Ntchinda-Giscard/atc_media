import { Button } from "@mantine/core";
import AccountTable from "./account-table";
import { Download } from "lucide-react";
import useStore from '@/stores/store';
//@ts-ignore
import Cookies from 'js-cookie'
import {useRouter} from 'next/navigation';
import { useState } from "react";
import { error_notification } from "../../utils/notification-center";

function AccountProtection() {
    const router  = useRouter()
    const deleteUser  = useStore(state => state.deleteUser)
    const token = Cookies.get('auth_token');
    const [isLoading, setIsLoading] = useState(false)
    const handleDelete = async () =>{
        try{
            setIsLoading(true)
            await deleteUser(token);
            Cookies.remove('auth_token', { path: '/' })
            localStorage.removeItem('user');
            setIsLoading(false)
            router.push("/auth/login")
        }catch(error){
            //@ts-ignore
            error_notification("Echeque de suppression de compte", error?.response?.data?.reason)
            setIsLoading(false)
        }
        

    }
    
    return ( 
        <>
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-semilight my-5"> Protection des données </p>
                <div className="border  cursor-pointer rounded-xl border-red-600 py-2 px-1 w-fit">
                    <div className="flex flex-row items-center gap-3"> 
                        <span> 📥 </span>
                        <div className="flex flex-col justify-start">
                            <p className="text-sm font-semilight"> Télécharger </p>
                            <p className="text-sm text-gray-500"> Télécharger mes données </p>
                        </div>
                        <Download  size={16} color="#EE0202" />
                    </div>
                </div>
               
                <p className="text-xl font-semilight my-5"> Historique des connexions </p>
                <AccountTable 
                    elements={undefined} 
                />
                <div className="flex flex-col text-start">
                    <p> 🔐 Suppression du compte </p>
                    <p> Cette action est irréversible. Vos données seront supprimées définitivement après validation. </p>
                </div>

                <Button variant="outline" radius="md" w="200px" color="#EE0202"  >
                    Supprimer mon compte
                </Button>
            </div>

        </>
    );
}

export default AccountProtection;


