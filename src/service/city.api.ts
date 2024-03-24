import axios from "axios";

export async function GetCityAPI(params: any) {
  const [filterValue] = params.queryKey || [];
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${filterValue}`,
    params
  );
  return data;
}
