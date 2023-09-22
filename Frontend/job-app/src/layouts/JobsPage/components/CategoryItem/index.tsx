/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { CategoryModel } from "../../../../models/CategoryModel";
import { jobsAPI } from "../../../../services";

const CategoryItem: React.FC<{
  category: CategoryModel;
  categoryField: any;
}> = (props) => {
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchJobCountByCategory = async () => {
      try {
        const response = await jobsAPI.getJobsByCategoryId(props.category.id);
        setJobCount(response.data._embedded.jobs.length);
      } catch (error) {
        setJobCount(0);
      }
    };
    fetchJobCountByCategory();
  }, [props.category.id]);

  return (
    <a
      href="#"
      className="font-semibold mx-1 hover:text-orangetext text-sm"
      onClick={() => {
        props.categoryField(props.category.id);
      }}
    >
      - {props.category.name}
      <span className="text-gray-700 text-xs font-light inline-block pl-1">
        ({jobCount} công việc)
      </span>
    </a>
  );
};

export default CategoryItem;
