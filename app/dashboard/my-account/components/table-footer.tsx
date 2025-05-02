"use client"
import { Pagination, Select } from '@mantine/core';
import { number } from 'zod';

interface TableFooterProps{
    total_items: number,
    per_page: number,
    onPageChange: (p: number) => void
}

function TableFooter({total_items, per_page, onPageChange} : TableFooterProps) {
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
                <Pagination 
                    total={Math.ceil(total_items/per_page)} 
                    size="sm" color='#EE0202' 
                    onChange={(p) => onPageChange(p)}
                />;

            </div>
        </>
    );
}

export default TableFooter;