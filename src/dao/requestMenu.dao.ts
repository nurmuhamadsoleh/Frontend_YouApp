export interface IRequestMenuDAO<T> {
  rsMenuList: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    DATA_APPLICATION: T;
  };
}
