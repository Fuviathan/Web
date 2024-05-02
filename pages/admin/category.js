import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import ListCategory from "@/components/Admin/Category/ListCategory";
import BasicModal from "@/components/Admin/Modal/BasicModal";
import { useState } from "react";
import AddCategory from "@/components/Admin/Category/AddCategory";
import ProtectAdminRouter from "@/components/ProtectAdminRouter";

export default function Category() {
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
            Thêm danh mục
          </button>
        </div>
        <BasicModal onClose={handleClose} open={open}>
          <AddCategory onClose={handleClose} open={open}></AddCategory>
        </BasicModal>
        <div className="w-full max-h-screen mt-2 overflow-auto bg-gray-200">
          <div className="px-6 pb-4 mb-0 text-2xl font-semibold">
            Danh sách danh mục
          </div>
          <div className="px-8 shadow-xl">
            <ListCategory></ListCategory>
          </div>
        </div>
      </AdminLayout>
    </ProtectAdminRouter>
  );
}
