"use client"
import { Pagination, Select } from '@mantine/core';


function TableFooter() {
    return ( 
        <>
            <div className="flex flex-col md:flex-row justify-between gap-4 mt-5 items-center">
                <Select
                    label="Montrer"
                    placeholder="Sélectionner"
                    data={['10', '20', '30', '40', '50']}
                    defaultValue={'10'}
                    w={'70px'}
                />
                <Pagination total={1} size="sm" color='#EE0202' />;

            </div>
        </>
    );
}

export default TableFooter;