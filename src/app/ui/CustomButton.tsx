import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CustomButton({ children, onClick }: Props) {
  return (
    <button
      className="border border-border rounded-lg py-2 px-3 text-xs text-foreground bg-elevation-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
