import {
  BellOutlined,
  DollarCircleOutlined,
  DownOutlined,
  FileTextOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React, { useState } from "react";
import Store, { IStore } from "store";
import { useMutation, useQuery } from "@tanstack/react-query";

import { GetDropdownMenu } from "service/menu.api";
import IconPOS from "assets/images/pos-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { LogoutUser } from "service/logoutuser.api";
import { MenuProps } from "antd/lib";
import ModalChangePasswordContainer from "module/User/Container/ModalChangePasswordContainer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

require("dayjs/locale/id");

interface IProps {
  children: any;
}

export default function Template(props: IProps) {
  const { children } = props;
  const router = useRouter();
  const { logOut, auth }: IStore = Store();
  const [changePasswordIsShow, setChangePasswordIsShow] =
    useState<boolean>(false);

  // ---- Get API ---- //
  const { data: dataDrodownMenuMaster } = useQuery(
    ["Get List Data Dropdown Menu", "MASTER"],
    GetDropdownMenu
  );
  const { data: dataDrodownLaporanMaster } = useQuery(
    ["Get List Data Dropdown Menu", "LAPORAN"],
    GetDropdownMenu
  );

  const { data: dataDrodownFinanceMaster } = useQuery(
    ["Get List Data Dropdown Menu", "FINANCE"],
    GetDropdownMenu
  );

  const { data: dataMenu } = useQuery(["Get List Menu"], GetListMenuAPI);

  let listMenu =
    dataMenu?.rsMenuList?.DATA_APPLICATION[0]?.DATA_MODULE[0]?.DATA_MENU;

  let listNonMenu =
    dataMenu?.rsMenuList?.DATA_APPLICATION[0]?.DATA_MODULE[0]?.DATA_MENU[0]
      .DATA_SUBMENU;

  // ---- End Get API ---- //

  // ---- Mutate ---- //
  const mutateLogoutUser = useMutation(LogoutUser, {
    onSuccess: (data: any) => {
      if (data.rsloginStatus.RESULT_CODE === "01") {
        // toast.success(data.rsloginStatus.MESSAGE);
        logOut();
        router.push("/login");
        return;
      }
      if (data.rsloginStatus.RESULT_CODE === "00") {
        toast.success(data.rsloginStatus.MESSAGE);
        logOut();

        return;
      }
    },
    onError: (error: any) => {
      if (error.message === "Network Error") {
        toast.warning(error.message);
        logOut();
        return;
      }
      if (error.message.includes("Cannot read properties of undefined")) {
        toast.warning("Mohon Maaf ! Terjadi Kesalahan Server");
        logOut();
        return;
      } else {
        toast.error(error.message);
        logOut();
        return;
      }
    },
  });
  const handleLogout = () => {
    mutateLogoutUser.mutate({
      rqLogout: {
        USER_ID: auth?.USER_ID,
        SESSION_LOGIN_ID: auth?.SESSION_LOGIN_ID,
      },
    });
  };
  // ---- End Mutate ---- //

  // ---- Menu Dropdown ---- //
  const financeMenu: MenuProps["items"] =
    (dataDrodownFinanceMaster?.rsMenuList?.DATA_APPLICATION[0] &&
      dataDrodownFinanceMaster?.rsMenuList?.DATA_APPLICATION[0].DATA_MODULE[0]
        ?.DATA_MENU[0] &&
      dataDrodownFinanceMaster?.rsMenuList?.DATA_APPLICATION[0].DATA_MODULE[0]?.DATA_MENU[0].DATA_SUBMENU.map(
        (item: any, index: number) => {
          return {
            key: index.toString(),
            label: (
              <Link href={`/${item?.COMPONENT_ID}`}>{item?.SubMenuDesc}</Link>
            ),
          };
        }
      )) ||
    [];

  const masterMenu: MenuProps["items"] =
    (dataDrodownMenuMaster?.rsMenuList?.DATA_APPLICATION[0] &&
      dataDrodownMenuMaster?.rsMenuList?.DATA_APPLICATION[0].DATA_MODULE[0]
        ?.DATA_MENU[0] &&
      dataDrodownMenuMaster?.rsMenuList?.DATA_APPLICATION[0].DATA_MODULE[0]?.DATA_MENU[0].DATA_SUBMENU.map(
        (item: any, index: number) => {
          return {
            key: index.toString(),
            label: (
              <Link href={`/${item?.COMPONENT_ID}`}>{item?.SubMenuDesc}</Link>
            ),
          };
        }
      )) ||
    [];

  const laporanMenu: MenuProps["items"] =
    (dataDrodownLaporanMaster?.rsMenuList?.DATA_APPLICATION[0] &&
      dataDrodownLaporanMaster?.rsMenuList?.DATA_APPLICATION[0].DATA_MODULE[0]
        ?.DATA_MENU[0] &&
      dataDrodownLaporanMaster?.rsMenuList?.DATA_APPLICATION[0].DATA_MODULE[0]?.DATA_MENU[0].DATA_SUBMENU.map(
        (item: any, index: number) => {
          let routeMenu =
            item?.SUBMENU_ROOT && item?.SUBMENU_ROOT.toLowerCase();
          let routeMenuSplit = routeMenu?.split("/").pop();
          return {
            key: index.toString(),
            label: <Link href={`/${routeMenuSplit}`}>{item?.SubMenuDesc}</Link>,
          };
        }
      )) ||
    [];
  const masterData: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            router.push("/produk");
          }}
        >
          Produk
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            router.push("/karyawan");
          }}
        >
          Karyawan
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            router.push("/kustomer");
          }}
        >
          Kustomer
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            router.push("/rekening");
          }}
        >
          Rekening
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div
          onClick={() => {
            router.push("/supplier");
          }}
        >
          Supplier
        </div>
      ),
    },
  ];
  const userMenu: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-2 font-medium cursor-pointer"
          onClick={() => {
            setChangePasswordIsShow(true);
          }}
        >
          <UserOutlined />
          Ganti Password
        </div>
      ),
    },

    {
      key: "2",
      label: (
        <>
          <div
            className="flex items-center gap-2 font-medium cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutOutlined className="text-red-500 text-sm" />
            Keluar
          </div>
        </>
      ),
    },
  ];
  // ---- End Menu Dropdown ---- //

  // ---- Icon Menu ---- //

  return (
    <>
      <div className="flex items-center justify-between bg-pinkBrand px-3 py-3 rounded-b-xl text-white">
        <div className="flex items-center gap-5 ">
          <div
            className="flex flex-col items-center hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={IconPOS} width={30} height={25} alt="" color="white" />
            <div>POS</div>
          </div>

          <div
            className="flex flex-col items-center hover:cursor-pointer"
            onClick={() => router.push("/daftartransaksi")}
          >
            <ShoppingCartOutlined style={{ fontSize: "25px" }} />
            <div>Transaksi</div>
          </div>

          <Dropdown menu={{ items: laporanMenu }} arrow>
            <div className="flex flex-col items-center hover:cursor-pointer">
              <FileTextOutlined style={{ fontSize: "25px" }} />
              <div>
                Laporan <DownOutlined />{" "}
              </div>
            </div>
          </Dropdown>

          <Dropdown menu={{ items: masterData }} arrow>
            <div className="flex flex-col items-center cursor-pointer">
              <SettingOutlined style={{ fontSize: "25px" }} />
              <div>
                Master Data <DownOutlined />{" "}
              </div>
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center gap-8">
          <Dropdown menu={{ items: userMenu }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className="flex gap-2 items-center cursor-pointer">
                  <UserOutlined style={{ fontSize: "25px" }} />
                </div>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      {children}
      {changePasswordIsShow && (
        <ModalChangePasswordContainer
          onClose={() => {
            setChangePasswordIsShow(false);
          }}
        />
      )}
    </>
  );
}
