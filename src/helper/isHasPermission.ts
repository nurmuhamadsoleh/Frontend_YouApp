import Store, { IStore } from "store";

type IModuleAbility =
  | "IsApprove"
  | "IsCheck"
  | "IsDelete"
  | "IsExcel"
  | "IsInsert"
  | "IsPdf"
  | "IsSelect"
  | "IsUpdate";

export function isHavePermission(
  module: string,
  ability: IModuleAbility
): boolean {
  const { permission }: IStore = Store.getState();
  if (permission) {
    const selModule = permission.find((x) => x.COMPONENT_ID === module);
    if (selModule) {
      if (selModule[ability]) {
        return true;
      }
      // return false;
      // Return false if permission adjusted from BE
      return true;
    }
    return false;
  }
  return false;
}
