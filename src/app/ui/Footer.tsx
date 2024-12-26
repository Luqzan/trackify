import Link from "next/link";
import Clock from "./Clock";

export default function Footer() {
  return (
    <footer className="border-t border-border flex justify-center items-center text-xs p-4">
      <span className="font-medium">
        Copyright 2023
        <Link className="px-1 text-blue-500" href="https://qbeep.com/">
          Qbeep
        </Link>
      </span>{" "}
      | <span className="font-light px-1">All rights reserved</span> | <Clock />
    </footer>
  );
}
