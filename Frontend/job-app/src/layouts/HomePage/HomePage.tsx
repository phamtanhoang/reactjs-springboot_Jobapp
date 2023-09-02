import { ListFeatureJobs } from "./components/ListFeatureJobs";
import { Hero } from "./components/Hero";
import { TopCompanys } from "./components/TopCompanys";
import { Profile } from "./components/Profile";
import { Intruction } from "./components/Instruction";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ListFeatureJobs />
      <Profile />
      <Intruction />
      <TopCompanys />
    </>
  );
};
