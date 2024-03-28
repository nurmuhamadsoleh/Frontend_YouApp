/** @type {import('next').NextConfig} */
// import { getImageDomains } from "./src/helpers/config";
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "nypost.com",
      "i.insider.com",
      "wm.observador.pt",
    ], // Menambahkan host ke daftar yang diizinkan
  },
  output: "export",
};

module.exports = nextConfig;
// export async function getConfig() {
//   const domains = await getImageDomains();

//   return {
//     reactStrictMode: true,
//     images: {
//       domains: domains,
//     },
//   };
// }

// export default getConfig();
