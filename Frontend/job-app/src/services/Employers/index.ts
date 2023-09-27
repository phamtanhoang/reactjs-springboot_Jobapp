import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const employersAPI = {
  async getEmployers(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getEmployers(currentPage, itemsPerPage));
  },

  async getVipEmployers(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(
      urlAPI.getVipEmployers(currentPage, itemsPerPage)
    );
  },

  async getEmployerById(id?: string) {
    return await instance.get(urlAPI.getEmployerById(id));
  },

  async getEmployersByNameContaining(
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) {
    return await instance.get(
      urlAPI.getEmployersByNameContaining(name, currentPage, itemsPerPage)
    );
  },
};
export default employersAPI;
