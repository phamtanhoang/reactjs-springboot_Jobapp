import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const jobsAPI = {
  async getJobs(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getJobs(currentPage, itemsPerPage));
  },

  async getJobsByCategoryId(
    categoryId: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    return await instance.get(
      urlAPI.getJobsByCategoryId(categoryId, currentPage, itemsPerPage)
    );
  },

  async getJobsByEmployerId(employerId: string, itemsPerPage?: number) {
    return await instance.get(
      urlAPI.getJobsByCategoryId(employerId, itemsPerPage)
    );
  },

  async getJobsByTitleContainingAndAddress(
    title: string,
    address: string,
    currentPage: number,
    itemsPerPage: number
  ) {
    return await instance.get(
      urlAPI.getJobsByTitleContainingAndAddress(
        title,
        address,
        currentPage,
        itemsPerPage
      )
    );
  },
};
export default jobsAPI;
