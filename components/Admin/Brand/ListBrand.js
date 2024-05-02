import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByBrand } from "@/state/Products/Action";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import BasicModal from "../Modal/BasicModal";
import DeleteBrand from "./DeleteBrand";
import UpdateBrand from "./UpdateBrand";

const ListBrand = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.product?.brand?.content);
  const [productList, setProductList] = useState([]);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);
  const [totalPage, setTotalPage] = useState(0); // Initialize totalPage with 0
  const [currentPage, setCurrentPage] = useState(0);
  
  const [initB, setInitB] = useState();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  
  useEffect(() => {
    dispatch(getProductByBrand());
  }, [brands]);
  
  const sortByColumn = (column, changeSortingColumn = true) => {
    if (sortingColumn?.includes(column) && changeSortingColumn) {
      const sortData = productList
        .slice()
        .sort((a, b) =>
          b[column].toString().localeCompare(a[column].toString())
        );
      setRowsToShow(
        sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
      );
      if (changeSortingColumn) {
        setSortingColumn([]);
        setProductList(sortData);
      }
    } else {
      const sortData = productList
        .slice()
        .sort((a, b) =>
          a[column].toString().localeCompare(b[column].toString())
        );
      setRowsToShow(
        sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
      );
      if (changeSortingColumn) {
        setProductList(sortData);
        setSortingColumn([`${column}`]);
      } else {
      }
    }
    setActiveColumn([`${column}`]);
  };
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



  return (
    <div
      id="root"
      className="flex justify-center h-full pb-2 bg-white rounded-lg"
    >
      <div className="w-full">
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none">
          <table className="w-full overflow-scroll text-left border table-auto md:overflow-auto">
            <thead
              className={`rounded-lg text-base text-white font-semibold w-full ${
                rowsToShow?.length > 0
                  ? "border-b-0"
                  : "border-b-1 border-black"
              }`}
            >
              <tr className="bg-[#222E3A]/[6%] ">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap w-2/12">
                  Số thứ tự
                </th>
                {/* <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-5/12 ">
                  <div className="flex items-center">
                    <span className="pl-1">ID</span>
                  </div>
                </th> */}
                <th className="py-3 px-3 flex items-center text-[#212B36] sm:text-base font-bold whitespace-nowrap w-4/12 group">
                  <span
                    className="mr-1"
                    // onClick={() => sortByColumn("name")}
                  >
                    Tên nhãn hàng
                  </span>
                  {/* <svg
                    className={`w-4 h-4 cursor-pointer ${
                      activeColumn?.includes("name")
                        ? "text-black"
                        : "text-[#BCBDBE] group-hover:text-black rotate-180"
                    } ${
                      sortingColumn?.includes("name")
                        ? "rotate-180"
                        : "rotate-0"
                    } `}
                    onClick={() => sortByColumn("name")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg> */}
                </th>
                <th className="w-2/12"></th>
              </tr>
            </thead>
            <tbody className="">
              {rowsToShow?.map((data, index) => (
                <>
                  <tr
                    className={`${
                      index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    }`}
                    key={index}
                  >
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
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
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-1 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.name}
                    </td>

                    <td className={`py-4 px-4 flex justify-center font-normal`}>
                      <TrashIcon
                        onClick={() => {
                          setOpen(true);
                          setId(data.id);
                        }}
                        className="w-8 h-8 mr-4 text-red-400 hover:cursor-pointer hover:opacity-50"
                      />
                      <PencilSquareIcon
                        onClick={() => {
                          setOpenUpdate(true);
                          setId(data.id);
                          setInitB(data.title);
                        }}
                        className="w-8 h-8 hover:cursor-pointer hover:opacity-50 text-dark-purple"
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`w-full justify-center mb-2 sm:justify-between flex-col sm:flex-row gap-5 mt-6 px-1 items-center ${
            productList?.length > 0 ? "flex" : "hidden"
          }`}
        >
          <div className="px-4 text-lg">
            Hiển thị {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} đến{" "}
            {currentPage == totalPage - 1
              ? productList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            / {productList?.length} nhãn hàng
          </div>
          <div className="flex px-4">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                  currentPage == 0
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
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage == index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <BasicModal open={open} onClose={() => setOpen(false)}>
                <DeleteBrand onClose={() => setOpen(false)} data={id} />
              </BasicModal>
              <BasicModal open={openUpdate} onClose={() => setOpen(false)}>
                <UpdateBrand
                  open={openUpdate}
                  onClose={() => setOpenUpdate(false)}
                  data={id}
                  brand={initB}
                />
              </BasicModal>
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage == totalPage - 1
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
export default ListBrand;
