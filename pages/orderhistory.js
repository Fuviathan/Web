import Layout from "@/components/User/Layout/Layout";
import OrderDetail from "@/components/User/Order/OrderDetail";
import ProtectRouter from "@/components/ProtectRouter";
import React, { useState } from "react";

const Order = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Layout>
      <ProtectRouter>
        <div className="max-w-[1320px] mx-auto my-8 text-2xl font-semibold">Xem danh sách các đơn hàng của bạn</div>
        <div className="self-start max-w-[1320px] mx-auto ">
          <OrderDetail open={open} handleClose={handleClose} handleOpen={handleOpen} />
        </div>
      </ProtectRouter>
    </Layout>
  );
};
  
export default Order;   