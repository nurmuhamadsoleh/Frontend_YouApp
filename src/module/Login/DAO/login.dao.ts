export interface ILoginDAO {
  rsLogin: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    USER_ID: string;
    DATABASE_NAME: string;
    SESSION_LOGIN_INFO: {
      SESSION_LOGIN_ID: string;
      LOGIN_DATE: string;
      LOGIN_IS_EXPIRED: boolean;
      LOGIN_IP_FROM: string;
      COMPANY_ID: string;
      SITE_ID: string;
      SITE_NAME: string;
      DEF_COMPANY_ID: string;
      DEF_SITE_ID: string;
    }[];
  };
}
