/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PaginationAdmin: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
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
    <div className="flex items-center justify-between mt-4">
      <a
        href="#"
        className="flex items-center px-5 py-2 text-sm text-gray-70 hover:text-gray-900 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
        onClick={() => {
          props.currentPage == 1
            ? props.paginate(1)
            : props.paginate(props.currentPage - 1);
        }}
      >
        <AiOutlineArrowLeft />
        <span>Left Page</span>
      </a>

      <div className="items-center hidden md:flex gap-x-3">
        {pageNumbers.map((number, i) => (
          <a
            key={i}
            href="#"
            className={
              "px-2 py-1 text-base text-blue-500 rounded-md " +
              (props.currentPage === number && "bg-blue-100/60")
            }
            onClick={() => props.paginate(number)}
          >
            {number}
          </a>
        ))}
      </div>

      <a
        href="#"
        className="flex items-center px-5 py-2 text-sm text-gray-700 hover:text-gray-900 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
        onClick={() => {
          props.currentPage == props.totalPages
            ? props.paginate(props.totalPages)
            : props.paginate(props.currentPage + 1);
        }}
      >
        <span>Right Page</span>
        <AiOutlineArrowRight />
      </a>
    </div>
  );
};

export default PaginationAdmin;
