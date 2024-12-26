import { Metadata } from "next";
import TotalRevenue from "../ui/TotalRevenue";
import TotalNewUser from "../ui/TotalNewUser";
import TotalNewMerchant from "../ui/TotalNewMerchant";
import TotalActiveUser from "../ui/TotalActiveUser";
import { Suspense } from "react";
import StatsCardSkeleton from "../ui/skeletons/StatsCardSkeleton";
import CustomButton from "../ui/CustomButton";
import SalesOrderTable from "../ui/SalesOrderTable";
import LoadingSpinner from "../ui/LoadingSpinner";
import Link from "next/link";
import GraphContainer from "../ui/GraphContainer";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    timeline?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const timeline = searchParams?.timeline || "";
  return (
    <div className="md:h-full flex flex-col gap-2 md:gap-6 p-4 md:p-12">
      <div className="w-full flex flex-row flex-wrap gap-2 md:gap-6">
        <Suspense fallback={<StatsCardSkeleton />}>
          <TotalRevenue />
        </Suspense>

        <Suspense fallback={<StatsCardSkeleton />}>
          <TotalNewUser />
        </Suspense>

        <Suspense fallback={<StatsCardSkeleton />}>
          <TotalNewMerchant />
        </Suspense>

        <Suspense fallback={<StatsCardSkeleton />}>
          <TotalActiveUser />
        </Suspense>
      </div>

      <div className="grid gap-2 md:gap-6 grid-cols-1 lg:grid-cols-[5fr,6fr]">
        <div className="rounded-xl border border-border overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <GraphContainer timeline={timeline} />
          </Suspense>
        </div>

        <div className="rounded-xl border border-border min-h-[400px]">
          <div className="w-full flex flex-row gap-2 py-3 px-5 items-center border-b border-border">
            <h3 className="mr-auto text-foreground-subtle font-medium text-sm">
              Sales Orders
            </h3>

            <Link href="/dashboard/sales-orders">
              <CustomButton>View All</CustomButton>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <SalesOrderTable isHomepage={true} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
