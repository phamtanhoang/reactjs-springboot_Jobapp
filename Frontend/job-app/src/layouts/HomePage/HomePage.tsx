/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListFeatureJobs } from "./components/ListFeatureJobs";
import { Hero } from "./components/Hero";
import { TopEmployers } from "./components/TopEmployers";
import { Profile } from "./components/Profile";
import { Intruction } from "./components/Instruction";
import { useEffect, useState } from "react";
import { ErrorBox, Spinner } from "../../components";
import { EmployerModel } from "../../models/EmployerModel";

export const HomePage = () => {
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      const baseUrl: string = `http://localhost:8080/api/employers/search/findVipEmployers`;
      const response = await fetch(baseUrl);

      const responseJson = await response.json();
      const responseData = responseJson._embedded.employers;
      const loadedEmployers: EmployerModel[] = [];

      for (const key in responseData) {
        loadedEmployers.push({
          id: responseData[key].id,
          name: responseData[key].name,
          address: responseData[key].address,
          description: responseData[key].description,
          image: responseData[key].image,
          banner: responseData[key].banner,
          accountId: responseData[key].accountId,
        });
      }

      setEmployers(loadedEmployers);
      setIsLoading(false);
    };

    fetchEmployers().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

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
      <Hero />
      <ListFeatureJobs />
      <Profile />
      <Intruction />
      <TopEmployers employers={employers} />
    </>
  );
};
