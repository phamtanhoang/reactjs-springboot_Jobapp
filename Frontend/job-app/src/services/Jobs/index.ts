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

  async getJobsByTitleContainingAndEmployerToken(
    title: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getJobsByTitleContainingAndEmployerToken(
        title,
        currentPage,
        itemsPerPage
      ),
      { headers }
    );
  },

  async addJobByEmployerToken(
    title: string,
    toDate: string,
    categoryId: string,
    salary: string,
    address: string,
    description: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      title: title,
      description: description,
      salary: salary,
      address: address,
      toDate: toDate,
      categoryId: categoryId,
    };
    console.log(urlAPI.addJobByEmployerToken, data, headers);
    return await instance.post(urlAPI.addJobByEmployerToken, data, { headers });
  },

  async updateJobByEmployerToken(
    jobId: string,
    title: string,
    toDate: string,
    categoryId: string,
    salary: string,
    address: string,
    description: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      title: title,
      description: description,
      salary: salary,
      address: address,
      toDate: toDate,
      categoryId: categoryId,
    };

    console.log(`${urlAPI.updateJobByEmployerToken(jobId)}`);
    console.log(headers);
    console.log(data);

    return await instance.put(urlAPI.updateJobByEmployerToken(jobId), data, {
      headers: headers,
    });
  },

  async deleteJobByEmployerToken(jobId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.delete(urlAPI.deleteJobByEmployerToken(jobId), {
      headers: headers,
    });
  },

  async getJobByEmployerToken(jobId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getJobByEmployerToken(jobId), {
      headers: headers,
    });
  },
};
export default jobsAPI;
