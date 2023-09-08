import { ListFeatureJobs } from "./components/ListFeatureJobs";
import { Hero } from "./components/Hero";
import { TopEmployers } from "./components/TopEmployers";
import { Profile } from "./components/Profile";
import { Intruction } from "./components/Instruction";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ListFeatureJobs />
      <Profile />
      <Intruction />
      <TopEmployers />
    </>
  );
};
