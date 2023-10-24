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

  async getJobsByTitleAndAdminToken(
    title: string,
    categoryId: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getJobsByTitleAndAdminToken(
        title,
        categoryId,
        currentPage,
        itemsPerPage
      ),
      { headers }
    );
  },

  async addJobByAdminToken(
    title: string,
    toDate: string,
    cate: string,
    salary: string,
    address: string,
    description: string,
    employerId: string,
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
      toDate: toDate,
      address: address,
      categoryId: cate,
      employerId: employerId,
    };
    console.log(urlAPI.addJobByAdminToken);
    console.log(data);
    console.log(headers);

    return await instance.post(urlAPI.addJobByAdminToken, data, {
      headers,
    });
  },

  async updateJobByAdminToken(
    id: string,
    title: string,
    fromDate: string,
    toDate: string,
    cate: string,
    salary: string,
    address: string,
    description: string,
    employerId: string,
    state: string,
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
      fromDate: fromDate,
      toDate: toDate,
      address: address,
      categoryId: cate,
      employerId: employerId,
      state: state,
    };

    return await instance.put(urlAPI.updateJobByAdminToken(id), data, {
      headers,
    });
  },

  async deleteJobByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.delete(urlAPI.deleteJobByAdminToken(id), {
      headers,
    });
  },

  async detailJobByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.detailsJobByAdminToken(id), {
      headers,
    });
  },

  async getAllJobByEmployerToken(
    token?: string,
    title: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getAllJobByEmployerToken(title, currentPage, itemsPerPage),
      { headers }
    );
  },

  async getPendingJobsByEmployerToken(
    token?: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getPendingJobsByEmployerToken(currentPage, itemsPerPage),
      { headers }
    );
  },

  async getPopularJobs(token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getPopularJobs, { headers });
  },
};
export default jobsAPI;
