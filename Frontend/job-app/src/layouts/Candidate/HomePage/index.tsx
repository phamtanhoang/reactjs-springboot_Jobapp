/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hero, Intruction, Profile, TopEmployers, TopJobs } from "./components";

const HomePage = () => {
  return (
    <>
      <Hero />
      <TopJobs />
      <Profile />
      <Intruction />
      <TopEmployers />
    </>
  );
};
export default HomePage;
