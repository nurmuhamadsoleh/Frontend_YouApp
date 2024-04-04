import { Button, Form as FromANTD } from "antd";
import { Field, Form } from "react-final-form";

import Input from "component/Input";
import Link from "next/link";
import React from "react";

export default function ProfileComponent() {
  return (
    <main className="bg-drankblue h-screen overflow-hidden">
      <div className="flex">
        <div className="justify-start">
          <Button className="my-4 mx-4">Kembali</Button>
        </div>
        <div className="justify-center">
          <p>@johndoe123</p>
        </div>
      </div>
    </main>
  );
}
