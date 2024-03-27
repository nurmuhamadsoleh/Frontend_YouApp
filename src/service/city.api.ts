import axios from "axios";

export async function GetBeritaAPI(params: any) {
  const [_queryKey, filterValue, filterDate, filterMonth, filterYears] =
    params.queryKey || [];
  const { data } = await axios.get(
    `https://newsapi.org/v2/everything?q=${filterValue}&from=${filterDate}-${filterMonth}-${filterYears}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    params
  );
  return data;
}
