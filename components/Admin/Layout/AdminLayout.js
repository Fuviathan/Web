import React from 'react'
import { ChartBarIcon, AdjustmentsHorizontalIcon, ClipboardDocumentListIcon, PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Sidebar from './Sidebar/Sidebar';
import AdminHeader from './AdminHeader';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout(props) {
  const Menus = [
    {
      title: "Thiết lập sản phẩm", icon: AdjustmentsHorizontalIcon, children: [
        { title: "Danh sách sản phẩm", icon: ClipboardDocumentListIcon, path: '/admin/products' },
        { title: "Danh sách nhãn hàng", icon: ClipboardDocumentListIcon, path: '/admin/brand' },
        { title: "Danh sách danh mục", icon: ClipboardDocumentListIcon, path: '/admin/category' },
      ]
    },
    // { title: "Quản lý người dùng", icon: UserGroupIcon, path: '/admin/customer' },
    // { title: "Quản lý đơn hàng", icon: ClipboardDocumentListIcon, path: '/admin/orders' },
  ];
  const Menusub = [
    {
      title: "Thiết lập sản phẩm", icon: AdjustmentsHorizontalIcon, children: [
        { title: "Danh sách sản phẩm", icon: ClipboardDocumentListIcon, path: '/admin/products' },
        { title: "Danh sách nhãn hàng", icon: ClipboardDocumentListIcon, path: '/admin/brand' },
        { title: "Danh sách danh mục", icon: ClipboardDocumentListIcon, path: '/admin/category' },
      ]
    },
    { title: "Quản lý đơn hàng", icon: ClipboardDocumentListIcon, path: '/admin/orders' },
  ];
  return (
    <>
      <Provider store={store}>
        <div id='root'>
          <div className="flex">
            <ToastContainer></ToastContainer>
            <Sidebar Menus={Menus} Menusub={Menusub}/>
            <div className="flex flex-col w-full h-screen bg-gray-200">
              <AdminHeader />
              {props.children}
            </div>
          </div>
        </div>
      </Provider>
    </>

  )
}
