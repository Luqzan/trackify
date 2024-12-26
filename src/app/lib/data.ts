import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface Revenue {
  transaction: { createdAt: Date; totalPayment: number } | null;
}

interface ModelId {
  id: number;
}

export async function getTotalRevenueLastMonth() {
  const oneMonthAgo: Date = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const transactions: Revenue[] = await prisma.order.findMany({
      select: {
        transaction: {
          select: { totalPayment: true, createdAt: true },
        },
      },
      where: {
        status: "Completed",
        transaction: {
          createdAt: { gte: oneMonthAgo },
        },
      },
    });

    let totalRevenueLastMonth: number = 0;

    transactions.forEach((transaction) => {
      if (transaction.transaction) {
        totalRevenueLastMonth += transaction.transaction.totalPayment;
      }
    });

    return totalRevenueLastMonth;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getTotalNewUserLastMonth() {
  const oneMonthAgo: Date = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const buyers: ModelId[] = await prisma.buyer.findMany({
      where: { createdAt: { gte: oneMonthAgo } },
      select: { id: true },
    });

    return buyers.length;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getTotalNewMerchantLastMonth() {
  const oneMonthAgo: Date = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const merchants: ModelId[] = await prisma.merchant.findMany({
      where: { createdAt: { gte: oneMonthAgo } },
      select: { id: true },
    });

    return merchants.length;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getTotalActiveUser() {
  try {
    const buyers: ModelId[] = await prisma.buyer.findMany({
      where: { isLoggedIn: true },
      select: { id: true },
    });

    return buyers.length;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getOrders(
  query: string | null,
  sortBy: string | null,
  sortOrder: string | null,
  status: string | null,
  dateFrom: string | null,
  dateTo: string | null,
  minAmount: string | null,
  maxAmount: string | null,
  currentPage: number = 1,
  resultPerPage: number = 10
) {
  try {
    const offset = (currentPage - 1) * resultPerPage;

    let orderBy = {};

    if (sortBy === "id") {
      if (sortOrder === "asc") {
        orderBy = { id: "asc" };
      } else {
        orderBy = { id: "desc" };
      }
    } else if (sortBy === "buyer") {
      if (sortOrder === "asc") {
        orderBy = { buyer: { fullName: "asc" } };
      } else {
        orderBy = { buyer: { fullName: "desc" } };
      }
    } else if (sortBy === "merchant") {
      if (sortOrder === "asc") {
        orderBy = { merchant: { name: "asc" } };
      } else {
        orderBy = { merchant: { name: "desc" } };
      }
    } else if (sortBy === "amount") {
      if (sortOrder === "asc") {
        orderBy = { transaction: { totalPayment: "asc" } };
      } else {
        orderBy = { transaction: { totalPayment: "desc" } };
      }
    } else if (sortBy === "date") {
      if (sortOrder === "asc") {
        orderBy = { createdAt: "asc" };
      } else {
        orderBy = { createdAt: "desc" };
      }
    } else if (sortBy === "status") {
      if (sortOrder === "asc") {
        orderBy = { status: "asc" };
      } else {
        orderBy = { status: "desc" };
      }
    } else {
      orderBy = { createdAt: "desc" };
    }

    const filters = [];

    if (query) {
      filters.push({
        OR: [
          { id: { contains: query } },
          { buyer: { fullName: { contains: query } } },
          { merchant: { name: { contains: query } } },
        ],
      });
    }

    if (status && Object.keys(OrderStatus).includes(status)) {
      filters.push({ status: status });
    }

    if (dateFrom) {
      filters.push({ createdAt: { gte: new Date(dateFrom) } });
    }

    if (dateFrom) {
      filters.push({ createdAt: { gte: new Date(dateFrom) } });
    }

    if (dateTo) {
      filters.push({ createdAt: { lte: new Date(dateTo) } });
    }

    if (minAmount) {
      filters.push({ transaction: { totalPayment: { lte: maxAmount } } });
    }

    if (maxAmount) {
      filters.push({ transaction: { totalPayment: { lte: maxAmount } } });
    }

    const orders = await prisma.order.findMany({
      where: query
        ? {
            AND: filters,
          }
        : undefined,
      orderBy: orderBy,
      skip: offset,
      take: resultPerPage,
      select: {
        id: true,
        status: true,
        createdAt: true,
        buyer: { select: { fullName: true } },
        merchant: { select: { name: true } },
        transaction: { select: { totalPayment: true } },
      },
    });

    const totalCount = await prisma.order.count({
      where: query
        ? {
            AND: filters,
          }
        : undefined,
    });

    return {
      data: orders,
      pagination: {
        currentPage,
        resultPerPage,
        totalResults: totalCount,
        totalPages: Math.ceil(totalCount / resultPerPage),
      },
    };
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function getRevenue(timeline: string) {
  const now: Date = new Date();
  const time: Date = new Date(now.getTime());

  switch (timeline) {
    case "hour24":
      time.setHours(time.getHours() - 24);
      break;
    case "hour48":
      time.setHours(time.getHours() - 48);
      break;
    case "month1":
      time.setMonth(time.getMonth() - 1);
      break;
    case "month2":
      time.setMonth(time.getMonth() - 2);
      break;
    case "year1":
      time.setFullYear(time.getFullYear() - 1);
      break;
    default:
      time.setDate(time.getDate() - 7);
      break;
  }

  console.log(time);

  try {
    const revenues = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdAt: { gte: time } },
      select: { totalPayment: true, createdAt: true },
    });

    const data: { xAxis: number; yAxis: number }[] = [];
    switch (timeline) {
      case "hour24":
        revenues.forEach((revenue) => {
          const indexFound = data.findIndex(
            (datum) => datum.xAxis === revenue.createdAt.getHours()
          );
          if (indexFound >= 0) {
            data[indexFound].yAxis += revenue.totalPayment;
          } else {
            data.push({
              xAxis: revenue.createdAt.getHours(),
              yAxis: revenue.totalPayment,
            });
          }
        });
        break;
      case "hour48":
        revenues.forEach((revenue) => {
          const indexFound = data.findIndex(
            (datum) => datum.xAxis === revenue.createdAt.getHours()
          );
          if (indexFound >= 0) {
            data[indexFound].yAxis += revenue.totalPayment;
          } else {
            data.push({
              xAxis: revenue.createdAt.getHours(),
              yAxis: revenue.totalPayment,
            });
          }
        });
        break;
      case "month1":
        revenues.forEach((revenue) => {
          const indexFound = data.findIndex(
            (datum) => datum.xAxis === revenue.createdAt.getDate()
          );
          if (indexFound >= 0) {
            data[indexFound].yAxis += revenue.totalPayment;
          } else {
            data.push({
              xAxis: revenue.createdAt.getDate(),
              yAxis: revenue.totalPayment,
            });
          }
        });
        break;
      case "month2":
        revenues.forEach((revenue) => {
          const indexFound = data.findIndex(
            (datum) => datum.xAxis === revenue.createdAt.getDate()
          );
          if (indexFound >= 0) {
            data[indexFound].yAxis += revenue.totalPayment;
          } else {
            data.push({
              xAxis: revenue.createdAt.getDate(),
              yAxis: revenue.totalPayment,
            });
          }
        });
        break;
      case "year1":
        revenues.forEach((revenue) => {
          const indexFound = data.findIndex(
            (datum) => datum.xAxis === revenue.createdAt.getMonth()
          );
          if (indexFound >= 0) {
            data[indexFound].yAxis += revenue.totalPayment;
          } else {
            data.push({
              xAxis: revenue.createdAt.getMonth(),
              yAxis: revenue.totalPayment,
            });
          }
        });
        break;
      default:
        revenues.forEach((revenue) => {
          const indexFound = data.findIndex(
            (datum) => datum.xAxis === revenue.createdAt.getDate()
          );
          if (indexFound >= 0) {
            data[indexFound].yAxis += revenue.totalPayment;
          } else {
            data.push({
              xAxis: revenue.createdAt.getDate(),
              yAxis: revenue.totalPayment,
            });
          }
        });
        break;
    }

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
}
