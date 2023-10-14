import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const applicationsAPI = {
  async getCandidateApplyJob(jobId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.getCandidateApplyJob(jobId), {
      headers,
    });
  },

  async getApplicationByIDAndEmployerToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.getApplicationByIDAndEmployerToken(id), {
      headers,
    });
  },

  async getApplicationsByEmployerToken(
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
      urlAPI.getApplicationsByEmployerToken(title, currentPage, itemsPerPage),
      {
        headers,
      }
    );
  },

  async updateState(state: string, applicationId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      newState: state,
      applicationId: applicationId,
    };
    return await instance.put(urlAPI.updateApplicationState, data, {
      headers,
    });
  },

  async getApplicationsByJobIDAndEmplerToken(
    jobId: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(
      urlAPI.getApplicationsByJobIDAndEmplerToken(
        jobId,
        currentPage,
        itemsPerPage
      ),
      {
        headers,
      }
    );
  },
};
export default applicationsAPI;
