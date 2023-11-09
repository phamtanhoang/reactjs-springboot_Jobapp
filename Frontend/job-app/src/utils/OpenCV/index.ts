/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { applicationsAPI } from "../../services";

const openCV = async (filename: string) => {
  const waitingPopup: any = Swal.fire({
    title: "Waiting...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const res = await applicationsAPI.getCV(filename);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(blob);

    // Mở liên kết trong một tab mới khi file PDF đã sẵn sàng
    window.open(pdfUrl, "_blank");
  } catch (error) {
    Swal.fire("Error!", "Open CV fail!", "error");
  } finally{
    waitingPopup.close();
  }
};

export default openCV;
