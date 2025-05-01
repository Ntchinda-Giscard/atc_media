import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ICustomTableData, ICustomTableHeader } from "@/constant/interphase";

type TableProps = {
    headers: ICustomTableHeader[];
    data: ICustomTableData[];
    renderRow: (
        item: ICustomTableData,
        index: number,
        onClick?: (id: number) => void
    ) => React.ReactNode;
    onClick?: (id: number) => void;
};

const CustomTable: React.FC<TableProps> = ({ headers, data, renderRow, onClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleChangeRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-separate min-w-max border-spacing-y-4">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-2 py-3 text-[var(--title-color)] font-bold text-[15px] text-center whitespace-nowrap"
                            >
                                {header.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index}>{renderRow(item, index, onClick)}</tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                {/* Rows Per Page */}
                <div className="flex items-center gap-2 text-[13px] text-[var(--title-color)]">
                    Montrer
                    <select
                        value={rowsPerPage}
                        onChange={handleChangeRows}
                        className="border border-[var(--fadded-border)] rounded-[5px] py-1 px-2 bg-transparent text-[var(--title-color)]"
                    >
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                    entrées par page
                </div>

                {/* Page Navigation */}
                <div className="flex items-center gap-3">
                    {/* Previous Button */}
                    <div
                        onClick={handlePrev}
                        className={`h-[34px] w-[34px] rounded-[5px] col-center ${currentPage === 1
                            ? "bg-[var(--secondary-background)] cursor-not-allowed"
                            : "bg-gray-200 cursor-pointer"
                            }`}
                    >
                        <ChevronLeft
                            size={15}
                            color={
                                currentPage === 1 ? "var(--fadded-icon)" : 'var(--black)'
                            }
                        />
                    </div>

                    {/* Current Page */}
                    <div className="bg-[var(--primary-color)] h-[34px] px-4 rounded-[5px] text-[13px] text-[var(--white)] col-center">
                        {currentPage}
                    </div>

                    {/* Next Button */}
                    <div
                        onClick={handleNext}
                        className={`h-[34px] w-[34px] rounded-[5px] col-center ${currentPage === totalPages || totalPages === 0
                            ? "bg-[var(--secondary-background)] cursor-not-allowed"
                            : "bg-gray-200 cursor-pointer"
                            }`}
                    >
                        <ChevronRight
                            size={15}
                            color={
                                currentPage === totalPages || totalPages === 0
                                    ? "var(--fadded-icon)"
                                    : "var(--black)"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTable;
