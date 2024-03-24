import Store, { IStore } from "store";

import { ILoginDTO } from "../DTO/login.dto";
import LoginComponent from "../Component/LoginComponent";
import { MutateLoginAPI } from "service/login.api";
import React from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function LoginContainer() {
  const { setAuth, logOut }: IStore = Store();
  const router = useRouter();
  const mutateLogin = useMutation(MutateLoginAPI, {
    onSuccess: (data) => {
      if (data.rsLogin.RESULT_CODE === "01") {
        // alert("Login Berhasil");
        setAuth(data);
        router.push("/pos");
        return;
      }
      if (data.rsLogin.RESULT_CODE === "00") {
        toast.error(data.rsLogin.MESSAGE);
        logOut();
        localStorage.clear();
        router.push("/login");
        return;
      }
    },
    onError: (error: any) => {
      if (error.message === "Network Error") {
        toast.warning(error.message);
        logOut();
        localStorage.clear();
        router.push("/login");
        return;
      }
      if (error.message.includes("Cannot read properties of undefined")) {
        toast.warning("Mohon Maaf ! Terjadi Kesalahan Server");
        logOut();
        localStorage.clear();
        router.push("/login");
        return;
      } else {
        toast.error(error.message);
        logOut();
        localStorage.clear();
        router.push("/login");
        return;
      }
    },
  });
  const handleSubmit = (vals: ILoginDTO) => {
    mutateLogin.mutate(vals);
  };
  return (
    <LoginComponent
      handleSubmit={handleSubmit}
      isLoading={mutateLogin.isLoading}
    />
  );
}
