export interface IRequestCompayListDAO<T> {
  rsCompanyList: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    DATA: T;
  };
}
