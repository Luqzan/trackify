import SalesOrderTable from "@/app/ui/SalesOrderTable";
import Search from "@/app/ui/Search";
import TableHeaderButtons from "@/app/ui/TableHeaderButtons";
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sortBy?: string;
    sortOrder?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    minAmount?: string;
    maxAmount?: string;
    currentPage?: string;
    resultPerPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sortBy || "";
  const sortOrder = searchParams?.sortOrder || "";
  const status = searchParams?.status || "";
  const dateFrom = searchParams?.dateFrom || "";
  const dateTo = searchParams?.dateTo || "";
  const minAmount = searchParams?.minAmount || "";
  const maxAmount = searchParams?.maxAmount || "";
  const currentPage = Number(searchParams?.currentPage) || 1;
  const resultPerPage = Number(searchParams?.resultPerPage) || 10;

  return (
    <div className="w-full h-full p-4 md:py-6 md:px-12">
      <div className="flex flex-row pb-4">
        <Link href="/dashboard">
          <div className="text-foreground-subtle pr-3">Dashboard</div>
        </Link>

        <Link href="/dashboard/sales-orders">
          <div className="font-semibold px-3 pb-2 border-b-2 border-black">
            Sales Orders
          </div>
        </Link>
      </div>

      <div className="border border-border rounded-xl overflow-hidden flex flex-row">
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="p-3 flex flex-row border-b border-border">
            <div className="flex items-center flex-1">
              <Search />
            </div>

            <TableHeaderButtons />
          </div>

          <SalesOrderTable
            query={query}
            sortBy={sortBy}
            sortOrder={sortOrder}
            status={status}
            dateFrom={dateFrom}
            dateTo={dateTo}
            minAmount={minAmount}
            maxAmount={maxAmount}
            currentPage={currentPage}
            resultPerPage={resultPerPage}
          />
        </div>

        <div>Test</div>
      </div>
    </div>
  );
}
