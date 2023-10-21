import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const paymentsAPI = {
  async payment(vipId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.payment(vipId), { headers });
  },
};
export default paymentsAPI;
