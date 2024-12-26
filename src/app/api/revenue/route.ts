import { getRevenue } from "@/app/lib/data";
import { res200, res500 } from "@/app/lib/responses";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const timeline = url.searchParams.get("timeline") || "";

  try {
    const result = await getRevenue(timeline);

    if (result !== null) {
      return res200(result);
    } else {
      return res500();
    }
  } catch (err) {
    console.error(err);
    return res500();
  }
}
