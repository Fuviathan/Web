import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "@/state/Admin/Action";
import Dropzone from "react-dropzone";
import { uploadImg, handleSetImagesToNull } from "../../../state/Admin/Action";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { getProductByCategory } from "@/state/Products/Action";


const AddCategory = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      multipartFile: [],
      name: "",
    },
  });
  let img = []

  const onSubmit = (data) => {
    data.multipartFile = data.multipartFile[0]
    dispatch(addNewCategory(data));
    setTimeout(() => {
      dispatch(getProductByCategory());
    }, 2000);
  };
  if (props.open)
    return (
      <div id="root">
        <div className="absolute w-3/5 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white min-w-fit top-1/2 left-1/2 rounded-xl">
          <h3 className="mb-4 text-xl font-semibold tracking-wide">
            Thêm danh mục mới
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block">Tên danh mục</label>
            <input
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống tên danh mục
              </div>
            )}
            <label className="block mt-3">Ảnh của danh mục</label>
            <input
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register("multipartFile", { required: true })}
              type='file'
            />
            {errors.multipartFile && (
              <div className="mt-2 text-sm italic text-red-400 text-italic">
                *Không được để trống ảnh của danh mục
              </div>
            )}
            {/* <div className="p-5 mt-6 text-center bg-white border border-gray-400 rounded-lg cursor-pointer">
              <Dropzone
                onDrop={(acceptedFiles) => {
                  img.push(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Kéo và thả ảnh vào đây, hoặc bấm vào để chọn ảnh</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div> */}
            <div className="flex flex-row-reverse gap-5 mt-5">
              <button
                onClick={() => {
                  setTimeout(props.onClose, 200);
                }}
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

export default AddCategory;
