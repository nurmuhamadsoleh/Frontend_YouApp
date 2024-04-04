import LoginComponent from "../Component/LoginComponent";
import React from "react";

function LoginContainer() {
  const handleSubmit = (vals: any) => {
    console.log("vals submit", vals);
  };
  return <LoginComponent handleSubmit={handleSubmit} />;
}

export default LoginContainer;
