"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [isNavVisible, setIsNavVisible] = useState(false);

  const pages = [
    { id: 1, label: "Dashboard", pathname: "/dashboard" },
    { id: 2, label: "Users", pathname: "/users" },
    { id: 3, label: "Merchants", pathname: "/merchants" },
    { id: 4, label: "Transactions", pathname: "/transactions" },
    { id: 5, label: "Vouchers", pathname: "/vouchers" },
    { id: 6, label: "Coins", pathname: "/coins" },
    { id: 7, label: "Assets", pathname: "/assets" },
    { id: 8, label: "Settings", pathname: "/settings" },
  ];
  return (
    <nav className="mr-auto relative">
      <Bars4Icon
        className="md:hidden size-6 hover:cursor-pointer text-white"
        onClick={() => {
          setIsNavVisible((prev) => !prev);
        }}
      />

      <ul
        className={clsx(
          "absolute top-8 md:static flex-col md:flex-row bg-topbar-background md:bg-transparent rounded-md py-4 md:p-0",
          {
            flex: isNavVisible,
            "hidden md:flex": !isNavVisible,
          }
        )}
      >
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={page.pathname}>
              <div
                className={clsx(
                  "text-sm py-3 pl-4 pr-10 md:py-1 md:px-3 md:rounded-full",
                  {
                    "bg-white text-black": pathname.includes(page.pathname),
                    "text-white": !pathname.includes(page.pathname),
                  }
                )}
              >
                {page.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
