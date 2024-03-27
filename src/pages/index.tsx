import React, { useEffect } from "react";

import DasboardContainer from "module/Dashboard/Container/DasboardContainer";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  // const host = window.location.host;
  useEffect(() => {
    // Periksa apakah URL saat ini memiliki path tambahan setelah http://localhost:8000/
    if (window.location.pathname !== "/") {
      // Jika ada, navigasikan kembali ke halaman indeks
      router.push(`/`);
    }
  }, []);
  return <DasboardContainer />;
}
