export const tokenHeaders = () => {
  return {
    SERVER_KEY: process.env.NEXT_PUBLIC_SERVER_KEY,
    DATA_DS: process.env.NEXT_PUBLIC_DATA_DS,
  };
};
export const TokenLogout = () => {
  return {
    SERVER_KEY: process.env.NEXT_PUBLIC_SERVER_KEY,
  };
};
