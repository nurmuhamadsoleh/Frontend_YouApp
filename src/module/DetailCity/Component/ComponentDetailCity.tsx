import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function ComponentDetailCity() {
  const router = useRouter();
  return (
    <div className="px-3 py-1">
      <Button
        size="middle"
        className="text-white font-normal bg-[#8362F2]"
        onClick={() => router.push("/")}
      >
        <ArrowLeftOutlined className="font-bold" />
        Back HomePage
      </Button>
      <div className="">
        <div className=" mt-6 w-full">
          <div className="flex ml-4  px-4">
            <div className="w-1/2">
              <span className="text-sm font-medium">LatLong</span>
              <p className="font-bold -mt-1 text-[#8362F2] text-2xl">
                -27.0,133.0
              </p>
            </div>
            <div className="w-1/2 -mt-4">
              <ul className="list-none">
                <li>
                  Capital : <span className="font-medium">Canberra</span>
                </li>
                <li>
                  Capital : <span className="font-medium">Canberra</span>
                </li>
                <li>
                  Capital : <span className="font-medium">Canberra</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex px-4">
            <div className="w-1/2">
              <span className="text-sm font-medium">Calling Code</span>
              <p className="font-bold text-[#8362F2] text-5xl mt-1 mb-1">61</p>
              <Link
                href="/detailcity"
                className="underline text-[#8362F2] text-sm font-medium"
              >
                3 countries
              </Link>
              <span className="text-sm"> with this calling code</span>
            </div>
            <div className="w-1/2">
              <span className="text-sm font-medium">Currency</span>
              <p className="font-bold text-[#8362F2] text-5xl mt-1 mb-1">61</p>
              <Link
                href="/detailcity"
                className="underline text-[#8362F2] text-sm font-medium"
              >
                9 countries
              </Link>
              <span className="text-sm"> with this currency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
