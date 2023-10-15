import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const accountsAPI = {
  async getAccountByID(id: string) {
    return await instance.get(urlAPI.getAccountById(id));
  },

  async getAccountByUserName(userName: string) {
    return await instance.get(urlAPI.getAccountByUserName(userName));
  },

  async changePasswordAccountByAdminToken(
    id: string,
    password: string,
    token: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      newPassword: password,
    };
    return await instance.put(
      urlAPI.changePasswordAccountByAdminToken(id),
      data,
      {
        headers,
      }
    );
  },
};
export default accountsAPI;
