import { Button, Result } from "antd";

import React from "react";

export default function NotFoundComponent() {
  return (
    <div className="text-center text-lg h-[50vh]">
      <Result
        status="404"
        title="404"
        subTitle="Maaf, Halaman yang anda kunjungi tidak ditemukan."
        extra={
          <Button href="/" className="bg-pinkBrand text-white">
            Kembali
          </Button>
        }
      />
    </div>
  );
}
