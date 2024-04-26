import {
  removeProductFromCart,
  updateProductInCart,
} from "@/state/Cart/Action";
import { Delete, Remove } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="flex w-full mb-2 border rounded-lg shadow">
        <div className="flex justify-center w-2/6 p-4 max-h-[9rem] min-h-fit ">
          <img
            className="object-contain"
            src={data?.product?.images[0].url}
          ></img>
        </div>
        <div className="flex flex-col w-2/6">
          <div
            className="text-black text-2xl font-semibold pt-5 text-ellipsis text-nowrap w-[20rem] overflow-hidden"
            title={data?.title}
          >
            {data?.title}
          </div>
          {/* <div className="text-xl font-semibold text-gray-500 ">
            Color: Black
          </div> */}
          <div className="flex flex-row gap-5 pt-6 mt-6 text-xl font-semibold text-black">
            <div>
              {data?.price - (data?.price * data?.product?.discount) / 100}$
            </div>
            <div className="text-gray-500 line-through">
              {(data?.price * data?.product?.discount) / 100}$
            </div>
            <div className="text-green-500">{data?.product?.discount}%</div>
          </div>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <div className="text-xl font-semibold text-black place-self-center">
            Số lượng:
          </div>

          <IconButton
            className="w-fit h-fit"
            onClick={() => {
              dispatch(
                updateProductInCart({
                  id: data?.product?._id,
                  quantity: data?.count - 1,
                })
              );
            }}
            disabled={data?.cout < 2}
            aria-label="delete"
            size="large"
          >
            <Remove />
          </IconButton>
          <div className="font-semibold text-black place-self-center">
            {data?.count}
          </div>
          <IconButton
            className=" w-fit h-fit"
            onClick={() => {
              dispatch(
                updateProductInCart({
                  id: data?.product?._id,
                  quantity: data?.count + 1,
                })
              );
            }}
            aria-label="delete"
            size="large"
          >
            <AddIcon></AddIcon>
          </IconButton>
        </div>
        <div className="p-0 w-fit h-fit ml-auto my-[auto]">
          <IconButton aria-label="delete" size="large">
            <Delete
              className="text-red-500"
              onClick={() => {
                dispatch(removeProductFromCart(data.product._id));
              }}
            ></Delete>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
