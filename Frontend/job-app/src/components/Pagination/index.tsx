/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
  type: boolean;
}> = (props) => {
  const pageNumbers = [];

  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }

    pageNumbers.push(props.currentPage);

    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }

  return (
    <>
      {props.type ? (
        <ul className="inline-flex -space-x-px text-sm sm:text-base">
          <li>
            <button
              className="font-medium flex items-center justify-center px-3 h-8 sm:h-10 ml-0   text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={() => props.paginate(1)}
            >
              Trang đầu
            </button>
          </li>

          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={
                  "flex items-center justify-center px-3 h-8 sm:h-10 border border-gray-300" +
                  (props.currentPage === number
                    ? "text-gray-700 bg-gray-200 font-medium"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700")
                }
                onClick={() => props.paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}

          <li>
            <button
              className="font-medium flex items-center justify-center px-3 h-8 sm:h-10   text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={() => props.paginate(props.totalPages)}
            >
              Trang cuối
            </button>
          </li>
        </ul>
      ) : (
        <ul className="inline-flex -space-x-px text-2xl gap-4 pt-2">
          <li>
            <button
              className={`flex items-center justify-center p-1 sm:p-2  ring-2 text-lg sm:text-xl text-orangetext ring-orangetext hover:bg-orangetext hover:text-white rounded-full ${
                props.currentPage <= 1 ? "hidden" : ""
              }`}
              onClick={() => props.paginate(props.currentPage - 1)}
            >
              <AiFillCaretLeft />
            </button>
          </li>
          <li>
            <button
              className={`flex items-center justify-center p-1 sm:p-2  ring-2 text-lg sm:text-xl text-orangetext ring-orangetext hover:bg-orangetext hover:text-white rounded-full ${
                props.currentPage >= props.totalPages ? "hidden" : ""
              }`}
              onClick={() => props.paginate(props.currentPage + 1)}
            >
              <AiFillCaretRight />
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;
