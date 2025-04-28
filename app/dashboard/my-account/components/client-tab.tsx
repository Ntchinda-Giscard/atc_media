"use client"

import { useDisclosure } from "@mantine/hooks";
import AccountTable from "./account-table";
import AddAccountForm from "./add-acount-form";
import TableFooter from "./table-footer";
import DeleteClientModal from "./delete-account-modal";
import EditClientModal from "./edit-account-modat";
import { useEffect, useState } from "react";
import useOtherStore from '@/stores/clientStore';
//@ts-ignore
import Cookies from 'js-cookie';

function ClientTab() {
    const [openedDelete, { open: openDelte, close: closeDelete }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const { clients, fetchClients, updateClient, deleteClient } = useOtherStore();
    const [itemDelete, setItemDelete] = useState()
    const [itemEdit, setItemEdit] = useState()
    const token = Cookies.get('auth_token');


    const handleDelete = (item: any) => {
        // Handle delete action here
        console.log("Delete action triggered", item);
        setItemDelete(item);
        openDelte();
        
    }

    const handleEdit = (item: any) => {
        // Handle delete action here
        console.log("Edit action triggered", item);
        setItemEdit(item);
        openEdit();
    }

    useEffect(() =>{
        fetchClients(token)
        console.log("Clients", clients);
    })
    
    return ( 
        <>
            <DeleteClientModal
                opened={openedDelete}
                close={closeDelete}
                //@ts-ignore
                item={itemDelete } 
            />
            <EditClientModal
                close={closeEdit} 
                opened={openedEdit}
                item={itemEdit}
            />
            <p className="text-2xl font-semilight my-5"> Liste des sous-comptes </p>
            <section className="space-y-5"> 
                <div className="flex flex-col justify-between gap-4">
                    <AccountTable
                    //@ts-ignore
                        onDelete={(item: any) => handleDelete(item)}
                        //@ts-ignore
                        onEdit={(item: any) => handleEdit(item)}
                        elements={clients}
                    />
                    {/* <TableFooter /> */}
                </div>

                <p className="text-2xl font-semilight my-5"> Ajouter un sous-compte </p>
                <AddAccountForm />
            </section>
        </>
    );
}

export default ClientTab;