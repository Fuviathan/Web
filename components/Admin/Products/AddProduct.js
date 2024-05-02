import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "@/state/Admin/Action";
import Dropzone from "react-dropzone";
import { uploadImg, handleSetImagesToNull } from "../../../state/Admin/Action";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  getProductByBrand,
  getProductByCategory,
  getProducts,
} from "@/state/Products/Action";
import { toast } from "react-toastify";

const AddProduct = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductByBrand());
    dispatch(getProductByCategory());
  }, []);
  const brandList = useSelector((store) => store?.product?.brand?.content);
  const categoryList = useSelector((store) => store?.product?.category?.content);

  const onSubmit = (data) => {
    dispatch(addNewProduct(data));
    setTimeout(() => {
      dispatch(getProducts());
    }, 2000);

  };
  if (categoryList && brandList && props.open)
    return (
      <div id="root">
        <div className="absolute w-3/5 px-10 py-5 mt-4 overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-white min-h-fit h-3/4 min-w-fit top-1/2 left-1/2 rounded-xl">
          <h3 className="mb-4 text-xl font-semibold tracking-wide">
            Thêm sản phẩm mới
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">Tên sản phẩm</label>
            <input
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống tên danh mục
              </div>
            )}
            <div className="flex w-full mt-2">
              <div className="w-1/2 mr-8">
                <label className="block">Nhãn hàng</label>
                <select
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("brand", { required: true })}
                >
                  <option value={""}></option>
                  {brandList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Không được để trống tên danh mục
                  </div>
                )}
              </div>
              <div className="w-1/2 ml-8">
                <label className="block">Danh mục</label>
                <select
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("category", { required: true })}
                >
                  <option value={""}></option>
                  {categoryList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Không được để trống tên danh mục
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full mt-2">
              <div className="w-1/2 mr-8">
                <label className="block">Số lượng</label>
                <input
                  type="number"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("quantity", { required: true })}
                />
                {errors.quantity && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Không được để trống số lượng
                  </div>
                )}
              </div>
              <div className="w-1/2 ml-8">
                <label className="block">Giá tiền</label>
                <input
                  type="number"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <div className="mt-2 text-sm italic text-red-400 text-italic">
                    *Không được để trống giá tiền
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full mt-2">
              <div className="w-1/2 mr-8">
                <label className="block">Giảm giá</label>
                <input
                  type="number"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  {...register("discountPercent", { required: true })}
                />
              </div>
              <div className="w-1/2 ml-8">
                
              </div>
            </div>

            <label className="block mt-2">Mô tả sản phẩm</label>
            <textarea
              className="w-full min-h-[100px] overflow-y-auto p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống thông tin sản phẩm
              </div>
            )}
            <label className="block mt-2">Ảnh của sản phẩm</label>
            <input
              className="w-full p-2 mt-2 overflow-y-auto border border-gray-300 rounded-lg"
              {...register("multipartFile", { required: true })}
              type='file'
            />
            {errors.multipartFile && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống ảnh sản phẩm
              </div>
            )}
            <div className="flex flex-row-reverse gap-5 mt-5">
              <button
                onClick={() => setTimeout(props.onClose, 200)}
                type="submit"
                className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={props.onClose}
                className="p-2 px-6 text-red-500 bg-white border-2 border-red-500 hover:text-white hover:bg-red-500 rounded-2xl"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  else return <></>;
};

export default AddProduct;
