import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "@/state/Products/Action";
import { TrashIcon } from "@heroicons/react/24/solid";
import BasicModal from "../Modal/BasicModal";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const ListCategory = () => {
  const dispatch = useDispatch();
  const brands = useSelector((store) => store?.product?.category?.content); 
  const [productList, setProductList] = useState([]);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0); // Initialize totalPage with 0
  const [currentPage, setCurrentPage] = useState(0);
  const [initC, setInitC] = useState();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = brands?.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = brands?.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = brands?.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, [productList]);
  useEffect(() => {
    if (brands) {
      const sortedProducts = brands?.slice().sort((a, b) => a.Price - b.Price);
      setProductList(sortedProducts);
      const indexOfLastProduct = (currentPage + 1) * rowsLimit;
      const indexOfFirstProduct = indexOfLastProduct - rowsLimit;
      const currentProducts = sortedProducts?.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );

      setRowsToShow(currentProducts);
      setTotalPage(Math.ceil(sortedProducts?.length / rowsLimit));
    }
  }, [brands]);
  useEffect(() => {
    dispatch(getProductByCategory());
  }, [brands]);

  return (
    <div
      id="root"
      className="flex justify-center h-full pb-2 bg-white rounded-lg"
    >
      <div className="w-full">
        <div className="w-full overflow-x-scroll md:overflow-auto 2xl:max-w-none">
          <table className="w-full overflow-scroll text-left border table-auto md:overflow-auto">
            <thead
              className={`rounded-lg text-base text-white font-semibold w-full ${rowsToShow?.length > 0
                ? "border-b-0"
                : "border-b-1 border-black"
                }`}
            >
              <tr className="bg-[#222E3A]/[6%] w-full">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap w-2/12">
                  Số thứ tự
                </th>
                {/* <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-4/12 ">
                                    <div className="">
                                        <span className="pl-1">ID</span>
                                    </div>
                                </th> */}
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group ">
                  <div className="">
                    <span className="pl-1">Tên danh mục</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group  ">
                  <div className="">
                    <span className="pl-1">Ảnh</span>
                  </div>
                </th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody className="">
              {rowsToShow?.map((data, index) => (
                <>
                  <tr
                    className={`${index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                      }`}
                    key={index}
                  >
                    <td
                      className={`py-2 px-3 font-normal text-base ${index == 0
                        ? "border-t-1 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >
                      {rowsLimit * currentPage + index + 1}
                    </td>
                    {/* <td
                                            className={`py-2 px-3 font-normal text-base ${index == 0
                                                ? "border-t-1 border-black"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?._id}
                                        </td> */}

                    <td
                      className={`py-2 px-3 font-normal text-base ${index == 0
                        ? "border-t-1 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >
                      {data?.name}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base ${index == 0
                        ? "border-t-1 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >

                      <img
                        className="max-w-12 max-h-12"
                        src={`${data?.imageUrl}`}
                      />
                    </td>
                    <td className={`py-4 px-4 flex items-center  font-normal`}>
                      <TrashIcon
                        className="w-8 h-8 mr-4 text-red-400 hover:cursor-pointer hover:opacity-50"
                        onClick={() => {
                          setOpenDelete(true);
                          setId(data.id);
                        }}
                      />
                      <PencilSquareIcon
                        className="w-8 h-8 text-dark-purple hover:cursor-pointer hover:opacity-50"
                        onClick={() => {
                          setOpenUpdate(true);
                          setInitC(data);
                        }}
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`w-full justify-center mb-2 sm:justify-between flex-col sm:flex-row gap-5 mt-6 px-1 items-center ${productList?.length > 0 ? "flex" : "hidden"
            }`}
        >
          <div className="px-4 text-lg">
            Hiển thị {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} đến{" "}
            {currentPage == totalPage - 1
              ? productList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            / {productList?.length} danh mục
          </div>
          <div className="flex px-4" id="root">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                  ? "bg-[#cccccc] pointer-events-none"
                  : " cursor-pointer"
                  }
  `}
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${currentPage == index
                    ? "text-blue-600  border-sky-500"
                    : "border-[#E4E4EB] "
                    }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <BasicModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
              >
                <DeleteCategory
                  onClose={() => setOpenDelete(false)}
                  data={id}
                />
              </BasicModal>
              <BasicModal
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
              >
                <UpdateCategory
                  open={openUpdate}
                  onClose={() => setOpenUpdate(false)}
                  data={initC}
                />
              </BasicModal>
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage == totalPage - 1
                  ? "bg-[#cccccc] pointer-events-none"
                  : " cursor-pointer"
                  }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCategory;
