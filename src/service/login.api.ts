import store, { IStore } from "store";

import { IDatabaseDAO } from "module/Login/DAO/database.dao";
import { IDatabaseDTO } from "module/Login/DTO/database.dto";
import { ILoginDAO } from "module/Login/DAO/login.dao";
import { ILoginDTO } from "module/Login/DTO/login.dto";
import { IServerInformationDAO } from "dao/serverInformation.dao";
import { UseBaseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import instance from "./interceptor";

// ---- Get Server Information ---- //
export async function GetServerInformationAPI(
  params: UseBaseQueryOptions
): Promise<IServerInformationDAO> {
  const [_queryKey, serverAddress, serverId, clientId, serverPassword] =
    params.queryKey || [];
  const { data } = await axios.get(
    `${serverAddress}?SERVER_ID=${serverId}&CLIENT_ID=${clientId}&SERVER_PASSWORD=${serverPassword}`
  );

  return data;
}

// ---- Get IP Address ---- //
export async function GetIPAddressAPI() {
  const state: IStore = store.getState();
  const { data } = await axios.get("https://api.ipify.org?format=json");
  state.setIpAddress(data.ip);
}

// ---- Get Database Name ---- //
export async function GetDatabaseNameAPI(
  params: IDatabaseDTO
): Promise<IDatabaseDAO> {
  const { data } = await instance.post("SYSMAN/structure", {
    rqCompanyList: params,
  });
  return data;
}

// ---- Mutate Login ---- //
export async function MutateLoginAPI(params: ILoginDTO): Promise<ILoginDAO> {
  const state: IStore = store.getState();

  const { username, password, companyId } = params;
  const { data }: { data: ILoginDAO } = await instance.post("SYSMAN/login", {
    rqloginweb: {
      COMPANY_ID: companyId.toUpperCase(),
      USER_ID: username,
      PASSWORD: password,
      IP: state.ipAddress,
      APP: "WEB",
    },
  });
  if (data.rsLogin.RESULT_CODE === "01") {
    const dataUser = data.rsLogin.SESSION_LOGIN_INFO[0];
    const res = await GetDatabaseNameAPI({
      USER_ID: data.rsLogin.USER_ID,
      SESSION_LOGIN_ID: dataUser.SESSION_LOGIN_ID,
      COMPANY_ID: dataUser.COMPANY_ID,
      SITE_NAME: dataUser.SITE_NAME,
    });
  }
  return data;
}

// ---- Set Server Config ---- //
export async function SetServerConfigAPI() {
  const { setServerConfig }: IStore = store.getState();
  const serverAddress = process.env.NEXT_PUBLIC_SERVER_CHECK;
  const serverId = process.env.NEXT_PUBLIC_SERVER_ID;
  const serverClient = process.env.NEXT_PUBLIC_SERVER_CLIENT;
  const serverPassword = process.env.NEXT_PUBLIC_SERVER_PASSWORD;
  const res = await GetServerInformationAPI({
    queryKey: [
      "Get Server Information",
      serverAddress,
      serverId,
      serverClient,
      serverPassword,
    ],
  });
  setServerConfig(res);
  GetClientKeyAPI(res);
}

// ---- Get Client Key ---- //
export async function GetClientKeyAPI(res: IServerInformationDAO) {
  const state: IStore = store.getState();
  const { serverConfig, setClientKey } = state;

  const { data } = await axios.post(
    `${res.SERVER_END_POINT}/SYSMAN/client`,
    {
      rqClientGetKey: {
        CLIENT_ID: serverConfig?.SERVER_ID,
      },
    },
    {
      headers: {
        SERVER_KEY: res.SERVER_KEY,
      },
    }
  );
  if (data.CLIENT_KEY) {
    setClientKey(data.CLIENT_KEY);
    location.reload();
  }
}
