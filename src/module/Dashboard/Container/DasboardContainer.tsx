import React, { useState } from "react";

import DashboardComponent from "../Component/DashboardComponent";
import { GetBeritaAPI } from "service/city.api";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

export default function DasboardContainer() {
  const [searchBerita, setSearchBerita] = useState<string>("tesla");
  const [selected, setSelected] = useState<string>("");
  const [date, setDate] = useState(dayjs().format("DD"));
  const [month, setMonth] = useState(dayjs().format("MM"));
  const [year, setYear] = useState(dayjs().format("YYYY"));

  const handleCalender = (e: any, vals: any) => {
    const [dateStr, monthStr, yearStr] = vals?.split("-");
    setDate(dateStr);
    setMonth(monthStr);
    setYear(yearStr);
  };
  const handleSearch = (query: string) => {
    if (query?.length >= 3) {
      setSearchBerita(query);
      refetechPortal();
    } else {
      setSearchBerita("tesla");
      refetechPortal();
      sessionStorage.clear();
    }
  };
  console.log("search berita", searchBerita);
  const {
    data: data,
    isFetching: isFetchingPortalBerita,
    refetch: refetechPortal,
    error: errorFetching,
  } = useQuery(
    ["Get List City", searchBerita, date, month, year],
    GetBeritaAPI
  );
  console.log("error fetching", errorFetching);
  return (
    <>
      <DashboardComponent
        errorFetching={errorFetching}
        handleCalender={handleCalender}
        searchCity={searchBerita}
        setSelectedCity={setSelected}
        isLoadingPortalBerita={isFetchingPortalBerita}
        PortalBerita={data}
        handleSearch={handleSearch}
      />
    </>
  );
}
