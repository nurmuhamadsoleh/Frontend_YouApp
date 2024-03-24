export interface IRequestRoleGroupListDAO<T> {
  rsRoleGroupList: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    DATA: T;
  };
}
