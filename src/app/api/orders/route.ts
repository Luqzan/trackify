import { getOrders } from "@/app/lib/data";
import { res200, res500 } from "@/app/lib/responses";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    const sortBy = url.searchParams.get("sortBy") || "";
    const sortOrder = url.searchParams.get("sortOrder") || "";
    const status = url.searchParams.get("status") || "";
    const dateFrom = url.searchParams.get("dateFrom") || "";
    const dateTo = url.searchParams.get("dateTo") || "";
    const minAmount = url.searchParams.get("minAmount") || "";
    const maxAmount = url.searchParams.get("maxAmount") || "";
    const currentPage = parseInt(
      url.searchParams.get("currentPage") || "1",
      10
    );
    const resultPerPage = parseInt(
      url.searchParams.get("resultPerPage") || "9",
      10
    );

    const result = await getOrders(
      query,
      sortBy,
      sortOrder,
      status,
      dateFrom,
      dateTo,
      minAmount,
      maxAmount,
      currentPage,
      resultPerPage
    );

    if (result !== null) {
      const formattedResult = result.data.map((order) => ({
        ...order,
        createdAt: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date(order.createdAt)),
        status: order.status.replace(
          /([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g,
          "$1$3 $2$4"
        ),
      }));

      const updatedResponse = { ...result, data: formattedResult };

      return res200(updatedResponse);
    } else {
      return res500();
    }
  } catch (err) {
    console.error(err);
    return res500();
  }
}
