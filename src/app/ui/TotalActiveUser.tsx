import StatsCard from "./StatsCard";

export default async function TotalActiveUser() {
  const response = await fetch(
    "http://localhost:3000/api/cards/active-user-current"
  );
  const responseJson = await response.json();

  let header: string, dataDisplay: string, footer: string;

  if (responseJson.error === false) {
    header = "Total Active User";
    dataDisplay = responseJson.data.toString();
    footer = "Currently";
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
