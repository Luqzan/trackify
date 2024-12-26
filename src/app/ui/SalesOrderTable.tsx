import clsx from "clsx";
import StatusBadge from "./StatusBadge";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface Order {
  createdAt: string;
  status: string;
  id: string;
  buyer: {
    fullName: string;
  };
  merchant: {
    name: string;
  };
  transaction: {
    totalPayment: number;
  } | null;
}

interface TableData {
  data: Order[];
  pagination: {
    currentPage: number;
    resultPerPage: number;
    totalResults: number;
    totalPages: number;
  };
}

interface ResponseJson {
  error: boolean;
  data: TableData;
}

export default async function SalesOrderTable({
  query = "",
  sortBy = "",
  sortOrder = "",
  status = "",
  dateFrom = "",
  dateTo = "",
  minAmount = "",
  maxAmount = "",
  currentPage = 1,
  resultPerPage = 9,
  isHomepage = false,
}: {
  query?: string;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: string;
  maxAmount?: string;
  currentPage?: number;
  resultPerPage?: number;
  isHomepage?: boolean;
}) {
  const response: Response = await fetch(
    `http://localhost:3000/api/orders?query=${query}&sortBy=${sortBy}&sortOrder=${sortOrder}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}&minAmount=${minAmount}&maxAmount=${maxAmount}&currentPage=${currentPage}&resultPerPage=${resultPerPage}`
  );
  const responseJson: ResponseJson = await response.json();
  const data: TableData = responseJson.data;

  const params = new URLSearchParams();

  const filters = {
    query,
    sortBy,
    sortOrder,
    status,
    dateFrom,
    dateTo,
    minAmount,
    maxAmount,
    currentPage: currentPage.toString(),
    resultPerPage: resultPerPage.toString(),
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const currentSortBy = params.get("sortBy");
  const currentSortOrder = params.get("sortOrder");

  const sortHeaders = ["id", "buyer", "merchant", "status", "date", "amount"];

  const sortPathnames = sortHeaders.map((header) => {
    const newParams = new URLSearchParams(params);
    if (currentSortBy === header) {
      if (currentSortOrder === "asc" || currentSortOrder === "ASC") {
        newParams.set("sortOrder", "desc");
      } else {
        newParams.set("sortOrder", "asc");
      }
    } else {
      newParams.set("sortBy", header);
    }

    return `/dashboard/sales-orders?${newParams.toString()}`;
  });

  return (
    <div className="w-full p-4 overflow-x-scroll">
      <table className="table table-auto w-full border-separate border-spacing-y-1">
        <thead className="table-header-group">
          <tr className="table-row">
            <th className="table-cell font-semibold text-left pb-2 px-2 text-sm">
              <Link
                href={sortPathnames[0]}
                className="flex flex-row items-center gap-2"
              >
                Order ID{" "}
                {currentSortBy === "id" &&
                (currentSortOrder === "asc" || currentSortOrder === "ASC") ? (
                  <ChevronUpIcon className="h-[16px] w-[16px]" />
                ) : (
                  <ChevronDownIcon className="h-[16px] w-[16px]" />
                )}
              </Link>
            </th>

            <th className="table-cell font-semibold text-left pb-2 px-2 text-sm">
              <Link
                href={sortPathnames[1]}
                className="flex flex-row items-center gap-2"
              >
                Buyer{" "}
                {currentSortBy === "buyer" &&
                (currentSortOrder === "asc" || currentSortOrder === "ASC") ? (
                  <ChevronUpIcon className="h-[16px] w-[16px]" />
                ) : (
                  <ChevronDownIcon className="h-[16px] w-[16px]" />
                )}
              </Link>
            </th>

            <th className="table-cell font-semibold text-left pb-2 px-2 text-sm">
              <Link
                href={sortPathnames[2]}
                className="flex flex-row items-center gap-2"
              >
                Merchant{" "}
                {currentSortBy === "merchant" &&
                (currentSortOrder === "asc" || currentSortOrder === "ASC") ? (
                  <ChevronUpIcon className="h-[16px] w-[16px]" />
                ) : (
                  <ChevronDownIcon className="h-[16px] w-[16px]" />
                )}
              </Link>
            </th>

            <th className="table-cell font-semibold pb-2 px-2 text-sm">
              <Link
                href={sortPathnames[3]}
                className="flex flex-row items-center gap-2 justify-center"
              >
                Status{" "}
                {currentSortBy === "status" &&
                (currentSortOrder === "asc" || currentSortOrder === "ASC") ? (
                  <ChevronUpIcon className="h-[16px] w-[16px]" />
                ) : (
                  <ChevronDownIcon className="h-[16px] w-[16px]" />
                )}
              </Link>
            </th>

            <th
              className={clsx(
                "table-cell font-semibold text-left pb-2 px-2 text-sm",
                {
                  hidden: isHomepage,
                }
              )}
            >
              <Link
                href={sortPathnames[4]}
                className="flex flex-row items-center gap-2"
              >
                Date/Time{" "}
                {currentSortBy === "date" &&
                (currentSortOrder === "asc" || currentSortOrder === "ASC") ? (
                  <ChevronUpIcon className="h-[16px] w-[16px]" />
                ) : (
                  <ChevronDownIcon className="h-[16px] w-[16px]" />
                )}
              </Link>
            </th>

            <th className="table-cell font-semibold text-right pb-2 px-2 text-sm">
              <Link
                href={sortPathnames[5]}
                className="flex flex-row items-center gap-2 justify-end"
              >
                Amount{" "}
                {currentSortBy === "amount" &&
                (currentSortOrder === "asc" || currentSortOrder === "ASC") ? (
                  <ChevronUpIcon className="h-[16px] w-[16px]" />
                ) : (
                  <ChevronDownIcon className="h-[16px] w-[16px]" />
                )}
              </Link>
            </th>

            <th
              className={clsx("table-cell font-semibold pb-2 px-2 text-sm", {
                hidden: isHomepage,
              })}
            >
              More
            </th>
          </tr>
        </thead>

        <tbody className="table-row-group">
          {data
            ? data.data.map((datum) => (
                <tr
                  key={datum.id}
                  className="table-row bg-gradient-to-r from-background via-table-row to-background"
                >
                  <th className="table-cell font-semibold text-left py-3 px-2 text-sm">
                    {datum.id}
                  </th>
                  <th className="table-cell font-normal text-left px-2 text-sm">
                    {datum.buyer.fullName}
                  </th>
                  <th className="table-cell font-normal text-left px-2 text-sm">
                    {datum.merchant.name}
                  </th>
                  <th className="table-cell px-2 text-center align-middle">
                    <StatusBadge status={datum.status} />
                  </th>
                  <th
                    className={clsx(
                      "table-cell font-normal text-left px-2 text-sm",
                      {
                        hidden: isHomepage,
                      }
                    )}
                  >
                    {datum.createdAt}
                  </th>
                  <th className="table-cell font-normal text-right px-2 text-sm">
                    {`RM${
                      datum.transaction
                        ? datum.transaction.totalPayment.toFixed(2)
                        : "error"
                    }`}
                  </th>

                  <th
                    className={clsx("table-cell font-normal px-2 text-sm", {
                      hidden: isHomepage,
                    })}
                  >
                    <div className="flex flex-row justify-center bg-background hover:cursor-pointer">
                      <EllipsisHorizontalIcon className="h-[20px] w-[20px]" />
                    </div>
                  </th>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
