import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  PrinterIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import CustomButton from "./CustomButton";

export default function TableHeaderButtons() {
  return (
    <div className="flex flex-row gap-2">
      <CustomButton>
        <div className="flex flex-row gap-1 items-center">
          <ArrowsUpDownIcon className="h-[14px] w-[14px]" />

          <p className="font-semibold">Sort</p>
        </div>
      </CustomButton>

      <CustomButton>
        <div className="flex flex-row gap-1 items-center">
          <AdjustmentsVerticalIcon className="h-[14px] w-[14px]" />

          <p className="font-semibold">Filter</p>
        </div>
      </CustomButton>

      <CustomButton>
        <div className="flex flex-row gap-1 items-center">
          <AdjustmentsHorizontalIcon className="h-[14px] w-[14px]" />

          <p className="font-semibold">View</p>
        </div>
      </CustomButton>

      <CustomButton>
        <div className="flex flex-row gap-1 items-center">
          <TableCellsIcon className="h-[14px] w-[14px]" />
        </div>
      </CustomButton>

      <CustomButton>
        <div className="flex flex-row gap-1 items-center">
          <PrinterIcon className="h-[14px] w-[14px]" />
        </div>
      </CustomButton>

      <CustomButton>
        <div className="flex flex-row gap-1 items-center">
          <ArrowDownTrayIcon className="h-[14px] w-[14px]" />
        </div>
      </CustomButton>
    </div>
  );
}
