import { ListVipEmployer } from "./components";

const VipsPageEmployer = () => {
  return (
    <>
      <section className="py-8 relative ">
        <div className="">
          <div className="mx-auto max-w-xl text-center px-5">
            <span className="font-medium text-gray-400 tracking-widest">
              Our price
            </span>
            <h2 className="text-3xl font-semibold tracking-tight mt-3">
              Price Plans
            </h2>
            <div className="w-24 mx-auto mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 h-[2px]"></div>
            <p className="mt-3 text-gray-600">
              Choose the plan that suits your needs best and enjoy them
            </p>
          </div>
          <ListVipEmployer />
        </div>
      </section>
    </>
  );
};
export default VipsPageEmployer;
