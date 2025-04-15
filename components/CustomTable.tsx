import { ICustomTableData, ICustomTableHeader } from "@/constant/interphase";
import React from "react";
import AppButton from "./AppButton";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
      <div>
        <div className="absolute gap-3 col-center">
          <div className="text-[var(--title-color)] font-normal text-[13px]">
            Montrer
          </div>
          <div className="text-[var(--title-color)] border border-[var(--fadded-border)] rounded-[5px] col-center gap-2 font-medium text-[15px] py-2 px-3">
            3
            <ChevronDown color="var(--title-color)" size={18} />
          </div>
        </div>
        <div className="flex gap-3 col-center">
          <div className="bg-[var(--secondary-background)] h-[34px] w-[34px] rounded-[5px] col-center cursor-pointer">
            <ChevronLeft size={15} color="var(--fadded-icon)" />
          </div>
          <div className="bg-[var(--primary-color)] h-[34px] w-[34px] rounded-[5px] text-[13px] text-[var(--white)] col-center">
            1
          </div>
          <div className="bg-[var(--secondary-background)] h-[34px] w-[34px] rounded-[5px] col-center cursor-pointer">
            <ChevronRight size={15} color="var(--fadded-icon)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
