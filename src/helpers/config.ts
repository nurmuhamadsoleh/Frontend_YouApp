export async function getImageDomains() {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=2024-02-27&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  const domains = data.articles.map(
    (article: any) => new URL(article.urlToImage).host
  );
  return domains;
}
