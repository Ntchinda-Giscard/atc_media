"use client"

import AccountTable from "./account-table";
import AddAccountForm from "./add-acount-form";
import TableFooter from "./table-footer";

function ClientTab() {
    return ( 
        <>
            <p className="text-2xl font-semilight my-5"> Liste des sous-comptes </p>
            <section className="space-y-5"> 
                <div className="flex flex-col justify-between gap-4">
                    <AccountTable />
                    <TableFooter />
                </div>

                <p className="text-2xl font-semilight my-5"> Ajouter un sous-compte </p>
                <AddAccountForm />
            </section>
        </>
    );
}

export default ClientTab;