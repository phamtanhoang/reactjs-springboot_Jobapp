/* eslint-disable @typescript-eslint/no-explicit-any */
const calculateDaysRemaining = (toDate: string) => {
  const currentDate: any = new Date(); // Ngày hiện tại
  const targetDate: any = new Date(toDate); // Chuyển đổi chuỗi toDate thành đối tượng Date

  // Tính số mili giây còn lại giữa ngày đích và ngày hiện tại
  const timeRemaining = targetDate - currentDate;

  // Chuyển đổi số mili giây thành số ngày và làm tròn xuống
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return daysRemaining;
};

export default calculateDaysRemaining;
