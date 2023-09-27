import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const accountsAPI = {
  async getAccountByID(id: string) {
    return await instance.get(urlAPI.getAccountById(id));
  },

  async getAccountByUserName(userName: string) {
    // console.log(instance.get(urlAPI.getAccountByUserName(userName)));
    return await instance.get(urlAPI.getAccountByUserName(userName));
  },
};
export default accountsAPI;
