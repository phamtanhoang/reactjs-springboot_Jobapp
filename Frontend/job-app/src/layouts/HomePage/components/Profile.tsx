export const Profile = () => {
  return (
    <section className="w-4/5 mx-auto my-10 flex items-center lg:flex-row flex-col">
      <div className="lg:w-3/5 w-full">
        <img
          src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603985/DoAnNganh/profile_ihp2s1.png"
          alt="logo"
        />
      </div>
      <div className="lg:w-2/5 w-full">
        <h3 className="text-lg font-semibold text-orangetext mb-2">Tạo hồ sơ</h3>
        <h2 className="text-3xl font-bold mb-4">
          Xây dựng hồ sơ cá nhân của bạn
        </h2>
        <p className="font-normal text-neutral-500 mb-8">
          Tạo tài khoản để nhận thông tin công việc bạn muốn, nhận hàng ngày
          thông báo và bạn có thể dễ dàng nộp đơn trực tiếp cho công ty bạn muốn
          và tạo một tài khoản miễn phí ngay bây giờ
        </p>
        <button className="text-white px-8 py-2 rounded-full font-semibold bg-orangetext">
          Đăng kí
        </button>
      </div>
    </section>
  );
};
