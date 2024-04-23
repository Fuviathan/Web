import Link from "next/link";
import React from "react";

export default function SecondRow() {
  return (
    <div className="w-full bg-brown-green">
      <div className="flex items-center max-w-[1320px] p-4 text-sm leading-5 font-normal mx-auto text-white">
        <Link
          href={"/"}
          className="pr-5 mb-0 font-medium text-white uppercase hover:cursor-pointer hover:opacity-75"
        >
          Trang chủ
        </Link>
        <a
          href={"/product"}
          className="px-5 mb-0 font-medium text-white uppercase hover:cursor-pointer hover:opacity-75"
        >
          Mua sắm
        </a>
        <Link
          href={"/orderhistory"}
          className="px-5 mb-0 font-medium text-white uppercase hover:cursor-pointer hover:opacity-75"
        >
          Đơn hàng
        </Link>
        {/* <Link
          href={""}
          className="px-5 mb-0 font-medium text-white uppercase hover:cursor-pointer hover:opacity-75"
        >
          Liên hệ
        </Link> */}
      </div>
    </div>
  );
}
