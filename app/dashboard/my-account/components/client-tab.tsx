"use client"

import { useDisclosure } from "@mantine/hooks";
import AccountTable from "./account-table";
import AddAccountForm from "./add-acount-form";
import TableFooter from "./table-footer";
import DeleteClientModal from "./delete-account-modal";
import EditClientModal from "./edit-account-modat";

function ClientTab() {
    const [openedDelete, { open: openDelte, close: closeDelete }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const handleDelete = () => {
        // Handle delete action here
        console.log("Delete action triggered");
        openDelte();
    }

    const handleEdit = () => {
        // Handle delete action here
        console.log("Delete action triggered");
        openEdit();
    }
    return ( 
        <>
            <DeleteClientModal
                opened={openedDelete}
                close={closeDelete} 
            />
            <EditClientModal
                close={closeEdit} 
                opened={openedEdit}
            />
            <p className="text-2xl font-semilight my-5"> Liste des sous-comptes </p>
            <section className="space-y-5"> 
                <div className="flex flex-col justify-between gap-4">
                    <AccountTable
                        onDelete={() => handleDelete()}
                        onEdit={() => handleEdit()}
                    />
                    <TableFooter />
                </div>

                <p className="text-2xl font-semilight my-5"> Ajouter un sous-compte </p>
                <AddAccountForm />
            </section>
        </>
    );
}

export default ClientTab;