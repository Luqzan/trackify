import Link from "next/link";
import Graph from "./Graph";
import CustomButton from "./CustomButton";

export default async function GraphContainer({
  timeline = "hour24",
}: {
  timeline?: string;
}) {
  console.log(timeline);

  const response = await fetch(
    `http://localhost:3000/api/revenue?timeline=${timeline}`
  );
  const responseJson = await response.json();

  return (
    <div className="w-full h-full flex flex-col gap-4 py-6 px-4">
      <div className="flex-1">
        <Graph data={responseJson.data} />
      </div>
      <div className="flex flex-row gap-2 w-full justify-center items-center">
        <Link href="http://localhost:3000/dashboard?timeline=hour24">
          <CustomButton>24 Hours</CustomButton>
        </Link>

        <Link href="http://localhost:3000/dashboard?timeline=hour48">
          <CustomButton>48 Hours</CustomButton>
        </Link>

        <Link href="http://localhost:3000/dashboard?timeline=day7">
          <CustomButton>7 Days</CustomButton>
        </Link>

        <Link href="http://localhost:3000/dashboard?timeline=month1">
          <CustomButton>30 Days</CustomButton>
        </Link>

        <Link href="http://localhost:3000/dashboard?timeline=month2">
          <CustomButton>60 Days</CustomButton>
        </Link>

        <Link href="http://localhost:3000/dashboard?timeline=year1">
          <CustomButton>1 Year</CustomButton>
        </Link>
      </div>
    </div>
  );
}
