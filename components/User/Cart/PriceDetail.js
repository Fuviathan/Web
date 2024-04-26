import React from "react";

const PriceDetail = (props) => {
  return (
    <div className="">
      <div className="items-center px-8 py-4 border rounded-lg shadow ">
        <div className="mb-4 text-3xl font-bold text-center text-gray-700">
          Giá cả chi tiết
        </div>
        <hr></hr>
        <div className="px-4 text-xl font-medium text-black">
          <div className="flex justify-between pt-3">
            <div>Tổng tiền thanh toán</div>
            <div>{props.cart?.cartTotal}$</div>
          </div>
          <div className="flex justify-between pt-3">
            <div>Giảm giá</div>
            <div className="text-green-600">0$</div>
          </div>
          <div className="flex justify-between pt-3 mb-4">
            <div>Phí vận chuyển</div>
            <div className="text-green-600">Miễn phí</div>
          </div>
          <hr></hr>
          <div className="flex justify-between pt-3">
            <div>Tổng số tiền</div>
            <div className="text-green-600">{props.cart?.cartTotal}$</div>
          </div>
        </div>
        <button 
          className="w-full mt-4 py-2 rounded-lg bg-[#baaf9d] shadow hover:bg-[#a7967c] text-xl font-semibold text-white"
          onClick={props.onOpen}
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default PriceDetail;
