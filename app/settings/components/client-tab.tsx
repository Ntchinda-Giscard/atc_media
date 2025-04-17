"use client"

import AccountTable from "./account-table";

function ClientTab() {
    return ( 
        <>
            <p className="text-2xl font-semilight my-5"> Liste des sous-comptes </p>
            <section className="space-y-5"> 
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <AccountTable />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                </div>
            </section>
        </>
    );
}

export default ClientTab;