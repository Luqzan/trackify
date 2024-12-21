"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const pages = [
    { id: 1, label: "Dashboard", link: "/dashboard" },
    { id: 2, label: "Users", link: "/Users" },
    { id: 3, label: "Merchants", link: "/Merchants" },
    { id: 4, label: "Transactions", link: "/Transactions" },
    { id: 5, label: "Vouchers", link: "/Vouchers" },
    { id: 6, label: "Coins", link: "/Coins" },
    { id: 7, label: "Assets", link: "/Assets" },
    { id: 8, label: "Settings", link: "/Settings" },
  ];
  return (
    <nav>
      <ul className="flex flex-row">
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={page.link}>
              <div className="">{page.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
