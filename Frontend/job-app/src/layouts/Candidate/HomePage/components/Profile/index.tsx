import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [candidateToken, setCandidateToken] = useState("");
  useEffect(() => {
    setCandidateToken(localStorage.getItem("candidateToken") || "");
  }, [candidateToken]);

  return (
    <section className="w-full bg-orangebackground">
      <div className="w-4/5 mx-auto mt-10 flex items-center lg:mt-0 lg:mb-5 lg:flex-row flex-col">
        <div className="lg:w-[55%] w-full">
          <img
            src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603985/DoAnNganh/profile_ihp2s1.png"
            alt="logo"
          />
        </div>
        <div className="lg:w-[45%] w-full">
          {candidateToken ? (
            <>
              <h3 className="text-lg font-semibold text-orangetext mb-2">
                Chỉnh sửa hồ sơ
              </h3>
              <h2 className="text-3xl font-bold mb-4">
                Chỉnh sửa hồ sơ cá nhân của bạn
              </h2>
              <p className="font-normal text-neutral-500 mb-8">
                Chỉnh sửa hồ sơ để nhận thông tin công việc bạn muốn, nhận hàng
                ngày thông báo và bạn có thể dễ dàng nộp đơn trực tiếp cho công
                ty bạn muốn và tạo một tài khoản miễn phí ngay bây giờ
              </p>
              <Link
                to="/home/profile"
                className="text-white px-8 py-2 rounded-full font-semibold bg-orangetext"
              >
                Chỉnh sửa ngay
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-orangetext mb-2">
                Tạo hồ sơ
              </h3>
              <h2 className="text-3xl font-bold mb-4">
                Xây dựng hồ sơ cá nhân của bạn
              </h2>
              <p className="font-normal text-neutral-500 mb-8">
                Tạo tài khoản để nhận thông tin công việc bạn muốn, nhận hàng
                ngày thông báo và bạn có thể dễ dàng nộp đơn trực tiếp cho công
                ty bạn muốn và tạo một tài khoản miễn phí ngay bây giờ
              </p>
              <Link
                to="/home/register"
                className="text-white px-8 py-2 rounded-full font-semibold bg-orangetext"
              >
                Đăng kí
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Profile;
