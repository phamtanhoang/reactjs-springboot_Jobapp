/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { EmployerModel } from "../../../models/EmployerModel";
import { ErrorBox, Spinner } from "../../../components";
import { employersAPI } from "../../../services";
import { LeftPage, RightPage } from "./components";
import { TopEmployers } from "../HomePage/components";
import { useParams } from "react-router-dom";

const EmployerProfilePage = () => {
  const [employer, setEmPloyer] = useState<EmployerModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const { id } = useParams();

  //get Employer by id
  useEffect(() => {
    if (id) {
      const getEmployerById = () => {
        employersAPI
          .getEmployerById(id)
          .then((res) => {
            setEmPloyer(res.data);
          })
          .catch((error: any) => {
            setHttpError(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      getEmployerById();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  return (
    <>
      <section className="text-gray-[#333333] px-6 pt-8">
        <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto">
          <div className="flex-row lg:flex justify-between container mx-auto">
            <LeftPage employer={employer} />
            <RightPage employer={employer} />
          </div>
        </div>
      </section>
      <TopEmployers />
    </>
  );
};
export default EmployerProfilePage;
