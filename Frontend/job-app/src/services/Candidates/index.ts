import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const candidatesAPI = {
  async getCandidateById(id: string) {
    return await instance.get(urlAPI.getCandidateById(id));
  },
};
export default candidatesAPI;
