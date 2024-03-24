import { IServerInformationDAO } from "../dao/serverInformation.dao";
export interface IConfigurationState {
  ipAddress?: string;
  serverConfig?: IServerInformationDAO;
  setServerConfig: (_params: IServerInformationDAO) => void;
  setIpAddress: (_ip: string) => void;
}

const initialState = {};

const createConfigurationSlice = (set: any, _get: any) =>
  <IConfigurationState>{
    ...initialState,
    setServerConfig: (serverConfig) => {
      set(() => ({
        serverConfig,
      }));
    },
    setIpAddress: (ipAddress) => {
      set(() => ({
        ipAddress,
      }));
    },
  };

export default createConfigurationSlice;
