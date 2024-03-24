import Store, { IStore } from "store";

import { IKustomerDAO } from "module/POS/DAO/kustomer.dao";
import { IRequestDAO } from "dao/request.dao";
import { UseBaseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export async function GetKustomerAPI(
  params: UseBaseQueryOptions
): Promise<IRequestDAO<IKustomerDAO[]>> {
  const [_queryKey, filterValue] = params.queryKey || [];

  const { auth }: IStore = Store.getState();

  const { data } = await axios.post("SALES/m_kustomer", {
    ACTION_ID: "LIST_H",
    COMPANY_ID: auth?.DEF_COMPANY_ID,
    FILTER_FIELD: "",
    FILTER_VALUE: filterValue || "",
    PAGE_NO: "1",
    PAGE_ROW: "10",
    SORT_ORDER_BY: "SUPPLIER_ID",
    SORT_ORDER_TYPE: "DESC",
  });

  return data;
}

export async function CreateKustomerAPI(params: any) {
  const { data } = await axios.post("/SALES/m_kustomer", params);
  return data;
}
