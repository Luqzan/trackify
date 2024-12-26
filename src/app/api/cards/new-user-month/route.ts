import { getTotalNewUserLastMonth } from "@/app/lib/data";
import { res200, res500 } from "@/app/lib/responses";

export async function GET() {
  try {
    const result: number | null = await getTotalNewUserLastMonth();

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
