import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const employersAPI = {
  async getEmployers(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getEmployers(currentPage, itemsPerPage));
  },

  async getVipEmployers(currentEmployerPage: number, employersPerPage: number) {
    return await instance.get(
      urlAPI.getVipEmployers(currentEmployerPage, employersPerPage)
    );
  },
};
export default employersAPI;
