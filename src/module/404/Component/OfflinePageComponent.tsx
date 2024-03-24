import { Button, Result } from "antd";
import React from "react";

export default function OfflinePageComponent() {
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Anda sedang offline. silahkan cek koneksi internet."
        extra={<Button type="primary">Muat Ulang</Button>}
      />
    </div>
  );
}
