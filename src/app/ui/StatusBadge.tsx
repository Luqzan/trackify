import clsx from "clsx";
import React from "react";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <div
      className={clsx("text-xs rounded-xl py-1 px-2 font-normal inline-block", {
        "bg-[#e9e9e9]":
          status === "Pending" ||
          status === "Refunded" ||
          status === "Did Not Pickup",
        "bg-green-500 text-white": status === "Completed",
        "bg-[#f9e9cc] text-black": status === "Preparing",
        "bg-[#dff0ff] text-black":
          status === "Waiting For Pickup" || status === "Waiting To Refund",
      })}
    >
      {status}
    </div>
  );
}
