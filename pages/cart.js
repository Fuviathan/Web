import Cart from "@/components/User/Cart/Cart";
import Layout from "@/components/User/Layout/Layout";
// import ProtectRouter from "@/components/ProtectRouter";
import React from "react";
import { useState } from "react";
// import BasicModal from "@/components/Admin/Modal/BasicModal";
// import ConfirmOrderModal from "@/components/Cart/ConfirmOrderModal";

const UserCart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
      <Layout className="bg-white">
        {/* <ProtectRouter> */}
          {/* <BasicModal onClose={handleClose} open={open} >
            <ConfirmOrderModal onClose={handleClose} open={open}></ConfirmOrderModal>
          </BasicModal> */}
          <Cart onOpen={handleOpen}></Cart>
        {/* </ProtectRouter> */}
      </Layout>
  );
};

export default UserCart;
