import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import PriceDetail from "./PriceDetail";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/state/Cart/Action";
import Link from "next/link";

const Cart = (props) => {
  const [auth, setAuth] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store?.cart?.cart);
  const cartItem = useSelector((store) => store);
  const userID = useSelector((store) => store?.auth?.user?.id)
  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("token") || "";
    setAuth(value);
    dispatch(getCart(userID));
  }, [cart]);
  if (!cart || cart.cartTotal == 0 ) return (
    <div className="flex flex-col items-center justify-center h-full my-4 bg-white">
      <div className="p-6 text-2xl font-medium bg-white">
        Giỏ hàng của bạn chưa có sản phẩm nào
      </div>
      <Link href='/product' className="flex justify-center p-3 mx-auto font-sans text-2xl font-semibold rounded-lg shadow-md bg-light-brown w-fit h-fit text-orange-gray hover:opacity-75">
        Quay lại mua sắm
      </Link>
    </div>
  ) 
  else if (cart) return (
    <div className="h-full my-4">
      <div className="flex justify-between mx-auto max-w-[1320px]">
        <div className="w-4/6 mr-8">
          {cart?.products.map((item) => (
            <CartItem key={item._id} data={item}></CartItem>
          ))}
        </div>
        <div className="w-1/3">
          <PriceDetail cart={cart} onOpen={props.onOpen}></PriceDetail>
        </div>
      </div>
    </div>
  );
};

export default Cart;
