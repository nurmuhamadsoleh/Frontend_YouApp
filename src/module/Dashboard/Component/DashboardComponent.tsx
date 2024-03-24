import { Input, Skeleton } from "antd";

import React from "react";
import { useRouter } from "next/router";

const { Search } = Input;
interface IProps {
  handleSearch: (query: string) => void;
  City?: any;
  isLoadingCity: boolean;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  searchCity: string;
  selected: string;
}
export default function DashboardComponent(props: IProps) {
  const {
    handleSearch,
    City,
    isLoadingCity,
    searchCity,
    setSelectedCity,
    selected,
  } = props;
  const router = useRouter();
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="w-1/2">
        <h1 className="text-2xl text-center font-bold mb-4">Country</h1>
        <Search
          placeholder="Masukan Nama Kota"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          enterButton
        />
        <div className="p-4 bg-white h-fit">
          {isLoadingCity ? (
            <div className="bg-white w-full">
              <Skeleton active />
            </div>
          ) : (
            <>
              {searchCity !== "" && City?.length >= 1
                ? City.map((item: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedCity(item?.name?.common);
                        router.push(`/detailcity`);
                      }}
                      className="text-left font-bold text-black cursor-pointer hover:bg-slate-200 p-2"
                    >
                      {item?.name?.common}
                    </div>
                  ))
                : searchCity !== "" &&
                  City == undefined && (
                    <div className="font-bold text-red-600">Tidak ada data</div>
                  )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
