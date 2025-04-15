import { ICustomTableData, ICustomTableHeader } from "@/constant/interphase";
import React from "react";

type TableProps = {
  headers: ICustomTableHeader[];
  data: ICustomTableData[];
  renderRow: (item: ICustomTableData, index: number) => React.ReactNode;
};

const CustomTable: React.FC<TableProps> = ({ headers, data, renderRow }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate min-w-max border-spacing-y-4">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-2 py-3 text-[var(--title-color)] font-bold text-[15px] text-center whitespace-nowrap">{header.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
