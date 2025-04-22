import { Button } from "@mantine/core";
import AccountTable from "./account-table";
import { Download } from "lucide-react";

function AccountProtection() {
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
                <AccountTable />
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


