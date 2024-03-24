import React, { useState } from "react";

import ContainerDetailCity from "module/DetailCity/Container/ContainerDetailCity";
import DashboardComponent from "../Component/DashboardComponent";
import { GetCityAPI } from "service/city.api";
import { useQuery } from "@tanstack/react-query";

export default function DasboardContainer() {
  const [searchCity, setSearchCity] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const { data: data, isFetching: isFetchingDataCity } = useQuery(
    ["Get List City", searchCity],
    GetCityAPI
  );
  const handleSearch = (query: string) => {
    if (query?.length >= 5) {
      setSearchCity(query);
    } else {
      setSearchCity("");
      setSelected("");
    }
  };
  return (
    <>
      <DashboardComponent
        setSelectedCity={setSelected}
        searchCity={searchCity}
        isLoadingCity={isFetchingDataCity}
        City={data}
        handleSearch={handleSearch}
      />
      {selected && <ContainerDetailCity />}
    </>
  );
}
