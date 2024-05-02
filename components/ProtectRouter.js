import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProtectRouter = ({ children }) => {
  const router = useRouter()
  const [auth, setAuth] = useState();
  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("user") || "";
    if (value) {
      setAuth(JSON.parse(value));
    }
  }, []);
  if (auth?.role === 'ADMIN') router.push('/admin/products')
  if (!auth && router.pathname !=='/cart' && router.pathname !== '/orderhistory') return <main>{children}</main>
  else return (
    <div>
      {auth ? (
        <main>{children}</main>
      ) : (
        <div>
          <a
            href={"/login"}
            className="flex justify-center p-3 mx-auto font-sans text-2xl font-semibold rounded-lg shadow-md bg-light-brown w-fit h-fit text-orange-gray hover:opacity-75"
          >
            Đăng nhập để mua sắm ngay!
          </a>
        </div>
      )}
    </div>
  );
};

export default ProtectRouter;
