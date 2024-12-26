import StatsCard from "./StatsCard";

export default async function TotalNewMerchant() {
  const response = await fetch(
    "http://localhost:3000/api/cards/new-merchant-month"
  );
  const responseJson = await response.json();

  let header: string, dataDisplay: string, footer: string;

  if (responseJson.error === false) {
    header = "Total New Merchant";
    dataDisplay = responseJson.data.toString();
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
