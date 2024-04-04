import React, { useEffect } from "react";

import dayjs from "dayjs";

interface IProps {
  children: any;
}

export default function Template(props: IProps) {
  const { children } = props;
  const [dateNow, setDateNow] = React.useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => {
      setDateNow(dayjs());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <div className="bg-yellow-500 text-white flex h-[26px] pb-1 text-sm z-20 fixed w-full">
        <div className="flex ml-auto mr-3">
          <p className="my-1 font-bold">{`${dateNow
            .locale("id")
            .format("dddd, DD MMMM YY HH:mm")}`}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
