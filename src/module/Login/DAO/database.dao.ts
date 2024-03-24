export interface IDatabaseDAO {
  rsCompanyList: {
    DATA: {
      User_ID: string;
      Company_ID: string;
      CompanyName: string;
      DATABASE_NAME: string;
      DATABASE_SERVER: string;
    }[];
    MESSAGE: string;
    RESULT_CODE: string;
    RESULT_DESC: string;
  };
}
