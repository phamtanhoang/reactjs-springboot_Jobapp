import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const jobsAPI = {
  async getJobByCategoryId(employerId: string) {
    return await instance.get(urlAPI.getJobByCategoryId(employerId));
  },
};
export default jobsAPI;
