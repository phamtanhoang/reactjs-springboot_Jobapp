/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PaginationAdmin: React.FC<{
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
    <div className="flex items-center justify-between my-3 font-medium">
      <a
        href="#"
        className={
          "flex items-center px-5 py-2 text-sm text-gray-500 hover:text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 " +
          (props.type ? "hover:bg-purple-100" : "hover:bg-blue-100")
        }
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
            className={`px-2 py-1 text-base rounded-md ${
              props.type ? "text-purple-500" : "text-blue-500"
            } ${
              props.currentPage === number && props.type
                ? "bg-purple-100/60"
                : props.currentPage === number && !props.type
                ? "bg-blue-100/60"
                : ""
            }`}
            onClick={() => props.paginate(number)}
          >
            {number}
          </a>
        ))}
      </div>

      <a
        href="#"
        className={
          "flex items-center px-5 py-2 text-sm text-gray-500 hover:text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 " +
          (props.type ? "hover:bg-purple-100" : "hover:bg-blue-100")
        }
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
