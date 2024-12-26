import StatsCard from "./StatsCard";

export default async function TotalRevenue() {
  const response = await fetch(
    "http://localhost:3000/api/cards/total-revenue-month"
  );
  const responseJson = await response.json();

  let header: string, dataDisplay: string, footer: string;

  if (responseJson.error === false) {
    header = "Total Revenue";
    dataDisplay = `RM${responseJson.data
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    footer = "From last month";
  } else {
    header = "";
    dataDisplay = "Error";
    footer = "";
  }

  return (
    <StatsCard
      header={header}
      data={dataDisplay}
      footer={footer}
      error={responseJson.error}
    />
  );
}
