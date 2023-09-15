export const Intruction = () => {
  return (
    <section className="w-full bg-orangebackground">
      <div className="w-4/5 mx-auto mb-10 flex items-center lg:flex-row lg:mt-0 lg:mb-5 flex-col-reverse">
        <div className="lg:w-[45%] w-full">
          <h3 className="text-lg font-semibold text-orangetext mb-2">
            Hoạt động như thế nào
          </h3>
          <h2 className="text-3xl font-bold mb-4">
            Những bước tìm và ứng tuyển công việc
          </h2>
          <p className="font-normal text-neutral-500 mb-6">
            Chúng tôi sẽ giúp bạn tìm được công việc mơ ước của bạn một cách dễ
            dàng.
          </p>
          <div className="bg-white p-4 rounded-2xl ">
            <div className="mb-5 ">
              <h3 className="text-orangetext font-semibold mb-2 ">
                Dễ dàng tải lên CV tốt nhất của bạn
              </h3>
              <p>
                Bạn có thể tải trực tiếp sơ yếu lý lịch và CV của mình lên Jobs
              </p>
            </div>
            <div className="mb-5 ">
              <h3 className="text-orangetext font-semibold mb-2">
                Bạn sẽ được thông báo với tất cả các cập nhật
              </h3>
              <p>
                Nhận thông báo về vị trí tuyển dụng việc làm mới. Hẹn lịch phỏng
                vấn và nộp hồ sơ xin việc
              </p>
            </div>
            <div className="">
              <h3 className="text-orangetext font-semibold mb-2">
                Nộp đơn xin việc đến công ty tốt nhất
              </h3>
              <p>
                Chúng tôi sẽ cung cấp các đề xuất cho các công ty bạn lựa chọn
                từ khắp nơi trên thế giới
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[55%] w-full">
          <img
            src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603985/DoAnNganh/work_ani9jw.png"
            alt="logo"
            className="lg:ml-10"
          />
        </div>
      </div>
    </section>
  );
};
