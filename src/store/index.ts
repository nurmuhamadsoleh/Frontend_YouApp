import createAuthSlice, { IAuthState } from "store/authSlice";
import { devtools, persist } from "zustand/middleware";

import { create } from "zustand";
import createConfigurationSlice, {
  IConfigurationState,
} from "./configurationSlice";

export interface IStore extends IAuthState, IConfigurationState {}
const store: any = persist(
  (set: any, get: any) =>
    <IStore>{
      ...createAuthSlice(set, get),
      ...createConfigurationSlice(set, get),
    },
  {
    name: "XHALONA",
    partialize: (state: any) => ({
      auth: state.auth,
      clientKey: state.clientKey,
      databaseName: state.databaseName,
      ipAddress: state.ipAddress,
      serverConfig: state.serverConfig,
    }),
  }
);

const createStore: any = create(
  devtools<IAuthState>(store, { name: "XHALONA" })
);
export default createStore;
