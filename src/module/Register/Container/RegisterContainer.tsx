import React from "react";
import RegisterComponent from "../Component/RegisterComponent";

export default function RegisterContainer() {
  const handleSubmit = (vals: any) => {
    console.log("vals submit", vals);
  };
  return <RegisterComponent handleSubmit={handleSubmit} />;
}
