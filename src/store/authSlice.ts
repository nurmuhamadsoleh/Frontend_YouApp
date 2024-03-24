import { ILoginDAO } from "module/Login/DAO/login.dao";
import { IPermissionDAO } from "module/Permission/DAO/permission.dao";

export interface IAuthState {
  auth?: {
    LOGIN_DATE: string;
    LOGIN_IP_FROM: string;
    LOGIN_IS_EXPIRED: boolean;
    SESSION_LOGIN_ID: string;
    SITE_ID: string;
    APP_ID: string;
    USER_ID: string;
    SITE_NAME: string;
    ROLE_ID: string;
    DATA_DS: string;
    DEF_COMPANY_ID: string;
  };
  clientKey?: string;
  databaseName?: string;
  permission: IPermissionDAO[];
  setAuth: (_params?: ILoginDAO) => void;
  setClientKey: (_params?: string) => void;
  logOut: () => void;
  setPermission: (_permissionList: IPermissionDAO[]) => void;
}

const initialState = {};

const createAuthSlice = (set: any, _get: any) =>
  <IAuthState>{
    ...initialState,
    setClientKey: (params) => {
      set(() => ({ clientKey: params }));
    },
    setAuth: (params) => {
      const data = params?.rsLogin;
      const dataSession = data?.SESSION_LOGIN_INFO?.[0];
      const payload = {
        ...dataSession,
        USER_ID: data?.USER_ID,
      };
      set(() => ({ auth: payload, databaseName: data?.DATABASE_NAME }));
      // location.reload();
    },
    logOut: () => {
      set(() => ({ auth: undefined }));
      localStorage.clear();
    },
    setPermission: (permission) => {
      set(() => ({ permission }));
    },
  };

export default createAuthSlice;
