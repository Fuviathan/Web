import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/state/Cart/Action";
import { getUser } from "@/state/Auth/Action";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function covertDataToUnsigned(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function FirstRow() {
  const [auth, setAuth] = useState();
  const user = useSelector((store) => store?.auth?.user);

  const dispatch = useDispatch();
  const router = useRouter();

  const cartItem = useSelector((store) => store?.cart?.cartItem);
  const cart = useSelector((store) => store?.cart?.cart);
  // const dataPro = useSelector((store) => store?.product?.products);

  // const [search, setSearch] = useState("");
  // const [dataSearch, setDataSearch] = useState([]);
  // const [showList, setShowList] = useState(false);

  let value;
  if (typeof window !== "undefined") {
    value = JSON.parse(localStorage.getItem("user")) || null;
  }
  
  useEffect(() => {
    // Get the value from local storage if it exists
    setAuth(value);
    dispatch(getCart(auth?.id));
  }, [cart?.cartTotal, cartItem?.cartTotal]);


  function redirect() {
    window.location.href = '/'
  }

  function handleLogout() {
    setAuth("");
    localStorage.clear();
    toast.success("Bạn đã đăng xuất");
    setTimeout(redirect, 1000)
  }

  return (
    <div className="w-full bg-[#ede2d1]">
      <div className="grid items-center grid-cols-6 py-4 max-w-[1320px] mx-auto">
        <Link
          href="/"
          className="px-5 mb-0 font-sans text-3xl font-semibold tracking-wide text-orange-gray hover:cursor-pointer"
        >
          ElectricalD
        </Link>
        <div className="relative flex flex-row items-stretch w-full col-span-3">
          <input
            type="text"
            className="w-full px-3 py-2 border-[1px] border-x-2 border-white focus:outline-none rounded-full bg-white"
            placeholder="Tìm kiếm sản phẩm ở đây ..."
          // value={search}
          // onChange={(e) => {
          //   setSearch(e.target.value);
          //   setShowList(true);

          //   setDataSearch(
          //     dataPro.filter((data) =>
          //       covertDataToUnsigned(data.title).includes(
          //         covertDataToUnsigned(e.target.value)
          //       )
          //     )
          //   );
          // }}
          // onBlur={() => setTimeout(() => setShowList(false), 200)}
          />
          {/* {showList && (
            <div className="absolute z-[80] w-[94%] rounded-lg top-11 ">
              {dataSearch.length > 0 ? (
                <div className="overflow-y-auto rounded-lg h-[50vh]">
                  {dataSearch.map((i) => (
                    <div
                      key={i._id}
                      className="hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/product/${i._id}`);
                      }}
                    >
                      <div className="flex px-4 py-2 bg-white hover:bg-gray-200">
                        <img
                          className="w-12 h-12 mr-2"
                          src={i.images[0].url}
                          alt={i.title}
                        />
                        <div>{i.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white">Không tìm thấy sản phẩm</div>
              )}
            </div>
          )} */}
          <div className="absolute top-0 bottom-0 right-0 flex px-3 py-2 align-middle border-[1px] border-x-2 hover:opacity-80 border-white bg-[#ede2d1] rounded-r-full hover:cursor-pointer">
            <MagnifyingGlassIcon className="w-6 h-6 text-center text-orange-gray" />
          </div>
        </div>
        <div className="flex flex-row justify-between col-span-2 px-4 ml-8">
          <a className='flex items-center hover:cursor-pointer hover:opacity-75'>
            <HeartIcon className='w-10 h-10 font-thin text-orange-gray' />
            <p className='ml-2 text-sm font-medium text-orange-gray'>Sản phẩm<br></br>ưa thích</p>
          </a>
          <div className="flex items-center hover:cursor-pointer hover:opacity-75">
            <UserIcon className="w-10 h-10 font-thin text-orange-gray" />
            {!auth ? (
              <Link
                href="/login"
                className="ml-2 text-sm font-medium text-orange-gray"
              >
                Đăng nhập<br></br>Đăng ký
              </Link>
            ) : (
              <div>
                <div className="ml-2 text-sm font-medium uppercase text-orange-gray ">
                  {auth?.lastName} {auth?.firstName}
                </div>
                <p
                  onClick={handleLogout}
                  className="ml-2 text-sm font-medium text-orange-gray"
                >
                  Đăng xuất
                </p>
              </div>
            )}
          </div>
          <Link
            href={"/cart"}
            className="flex items-center hover:cursor-pointer hover:opacity-75"
          >
            <ShoppingCartIcon className="w-10 h-10 font-thin text-orange-gray" />

            {/* {auth && (
              <div className="font-medium text-md text-orange-gray">
                {cart ? `${cart?.cartTotal}$` : ""}{" "}
              </div>
            )} */}
          </Link>
        </div>
      </div>
    </div>
  );
}
