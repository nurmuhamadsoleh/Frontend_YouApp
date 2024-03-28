import { DatePicker, Input, Skeleton } from "antd";

import React from "react";
import dayjs from "dayjs";

const { Search } = Input;
interface IProps {
  handleSearch: (query: string) => void;
  PortalBerita?: any;
  isLoadingPortalBerita: boolean;
  handleCalender: (e: any, vals: any) => void;
  searchCity: string;
  errorFetching: any;
}
export default function DashboardComponent(props: IProps) {
  const {
    handleSearch,
    isLoadingPortalBerita,
    PortalBerita,
    searchCity,
    handleCalender,
    errorFetching,
  } = props;
  const [arrayPush, setArrayPush] = React.useState<any>([]);
  const handleLinkClick = (item: any, index: number) => {
    // Menambahkan informasi link yang diklik ke dalam array
    const newLink = {
      id: index,
      image: item?.urlToImage,
      url: item?.url,
      title: item?.title,
    };

    // Menambahkan informasi link baru ke dalam array
    setArrayPush([...arrayPush, newLink]);
    // Menyimpan array baru ke dalam local storage
    sessionStorage.setItem(
      "linksClicked",
      JSON.stringify([...arrayPush, newLink])
    );

    // Membuka link dalam tab baru
    window.open(item?.url, "_blank");
  };
  return (
    <div>
      <div className="relative">
        <div className=" !p-1 bg-yellow-500 h-10 fixed top-0 left-0 right-0">
          <h1 className="font-medium text-lg hover:text-white cursor-pointer fixed top-0">
            Portal Berita
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 fixed top-14 left-0 lg:right-2 right-1">
        <h1 className="lg:text-2xl text-sm text-center font-bold lg:ml-2">
          Pencarian
        </h1>
        <div className="lg:w-[90vw] md:w-[60vw] w-[50vw]">
          <Search
            placeholder="Masukan Nama Kota"
            size="large"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            enterButton
          />
        </div>
        <div className="lg:w-[20vw] w-[30vw] ">
          <DatePicker
            defaultValue={dayjs()}
            // className="lg:mx-3"
            format={"DD-MM-YYYY"}
            onChange={(e: any, vals: any) => {
              handleCalender(e, vals);
            }}
          />
        </div>
      </div>
      <div className=" bg-white mt-28">
        {isLoadingPortalBerita ? (
          <div className="bg-white">
            <Skeleton active />
          </div>
        ) : (
          <>
            {searchCity !== "" && PortalBerita?.articles?.length >= 1 ? (
              PortalBerita?.articles?.map((item: any, index: number) => (
                <div
                  className="flex lg:flex-nowrap md:flex-nowrap md:flex-row flex-wrap w-full"
                  key={index}
                >
                  <div className="flex lg:basis-1/5 basis-full hover:cursor-pointer text-white p-3">
                    <img
                      src={item?.urlToImage}
                      alt={item.title}
                      width={250}
                      height={120}
                      className="object-cover mx-auto rounded-md"
                    />
                  </div>
                  <div
                    className="lg:basis-4/5 md:basis-1/2 basis-full"
                    onClick={() => handleLinkClick(item, index)}
                  >
                    <h4
                      className={`px-3 -mt-0 font-bold text-sm text-start hover:cursor-pointer ${
                        item?.title === arrayPush[index]?.title
                          ? "text-blue-600"
                          : "text-black hover:text-white"
                      }`}
                    >
                      {item?.title}
                    </h4>
                    <h6 className="px-3 font-medium text-xs -mt-5  text-black hover:cursor-pointer hover:text-white">
                      Pencipta: {item?.author}
                    </h6>
                    <h6 className="px-3 font-medium text-xs -mt-7  text-black hover:cursor-pointer hover:text-white">
                      Tanggal Publish :{" "}
                      {dayjs(item?.publishedAt).format("ddd, DD MMMM HH.mm")}
                    </h6>
                    <p className="px-3 font-normal text-sm -mt-5 text-black text-justify hover:cursor-pointer hover:text-white">
                      {item?.description}
                    </p>
                  </div>
                </div>
              ))
            ) : errorFetching ? (
              <>
                <p className="font-bold text-red-600 text-center uppercase">
                  {errorFetching?.response?.data?.status}
                </p>
                <p className="font-medium text-red-600 text-xs !text-center">
                  {errorFetching?.response?.data?.message}
                </p>
              </>
            ) : searchCity !== "" && PortalBerita?.articles == undefined ? (
              <div className="font-bold text-red-600">Tidak ada data</div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
