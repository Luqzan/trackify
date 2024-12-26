import { NextResponse } from "next/server";

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

interface OrderResponse {
  data: Order[];
  pagination: {
    currentPage: number;
    resultPerPage: number;
    totalResults: number;
    totalPages: number;
  };
}

interface RevenueResponse {
  xAxis: number;
  yAxis: number;
}

export function res200(
  data: number | OrderResponse | RevenueResponse[] | null
) {
  return NextResponse.json({ error: false, data: data }, { status: 200 });
}

export function res404(message: string) {
  return NextResponse.json({ error: true, message: message }, { status: 404 });
}

export function res500() {
  return NextResponse.json(
    { error: true, message: "Internal server error" },
    { status: 500 }
  );
}
