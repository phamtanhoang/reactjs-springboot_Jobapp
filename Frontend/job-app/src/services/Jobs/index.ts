import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const jobsAPI = {
  async getJobs(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getJobs(currentPage, itemsPerPage));
  },

  async getJobsByCategoryId(
    id: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    return await instance.get(
      urlAPI.getJobsByCategoryId(id, currentPage, itemsPerPage)
    );
  },

  async getJobsByEmployerId(
    id: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    return await instance.get(
      urlAPI.getJobsByEmployerId(id, currentPage, itemsPerPage)
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

  async getJobById(jobId: string) {
    return await instance.get(urlAPI.getJobById(jobId));
  },

  async getVipJobs(currentPage: number, itemsPerPage: number) {
    return await instance.get(urlAPI.getVipJobs(currentPage, itemsPerPage));
  },
};
export default jobsAPI;
