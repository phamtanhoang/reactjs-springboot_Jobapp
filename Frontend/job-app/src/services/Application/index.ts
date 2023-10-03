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
};
export default applicationsAPI;
