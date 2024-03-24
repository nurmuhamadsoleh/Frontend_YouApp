export interface IRequestProfileInformationDAO<T> {
  rsMemberInfo: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    DATA: T;
  };
}
