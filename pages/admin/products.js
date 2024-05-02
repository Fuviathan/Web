import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import BasicModal from "@/components/Admin/Modal/BasicModal";
import { useState } from "react";
import ProtectAdminRouter from "@/components/ProtectAdminRouter";
import ListProduct from "@/components/Admin/Products/ListProduct";
import AddProduct from "@/components/Admin/Products/AddProduct";

export default function Product() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ProtectAdminRouter>
      <AdminLayout>
        <div className="flex flex-row-reverse">
          <button
            className="p-2 mt-2 mr-12 font-medium bg-white border-2 border-dark-purple text-dark-purple rounded-2xl hover:shadow-xl hover:opacity-80"
            onClick={handleOpen}
          >
            Thêm sản phẩm
          </button>
        </div>
        <BasicModal open={open} onClose={handleClose}>
          <AddProduct onClose={handleClose} open={open}></AddProduct>
        </BasicModal>
        <div className="w-full max-h-screen mt-2 overflow-auto bg-gray-200">
          <div className="px-6 pb-4 mb-0 text-2xl font-semibold">
            Danh sách sản phẩm
          </div>
          <div className="px-8 shadow-xl">
            <ListProduct />
          </div>
        </div>
      </AdminLayout>
    </ProtectAdminRouter>
  );
}
