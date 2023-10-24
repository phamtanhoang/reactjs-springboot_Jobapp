import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const vipsAPI = {
  async getVipsByTitleAndAdminToken(
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
      urlAPI.getVipsByNameAndAdminToken(title, currentPage, itemsPerPage),
      { headers }
    );
  },

  async addVipByAdminToken(
    name: string,
    amount: number,
    price: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      name: name,
      amount: amount,
      price: price,
    };

    return await instance.post(urlAPI.addVipByAdminToken, data, {
      headers,
    });
  },

  async updateVipByAdminToken(
    id: string,
    name: string,
    amount: number,
    price: number,
    state: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      name: name,
      amount: amount,
      price: price,
      state: state,
    };

    return await instance.put(urlAPI.updateVipByAdminToken(id), data, {
      headers,
    });
  },

  async deleteVipByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.delete(urlAPI.deleteVipByAdminToken(id), {
      headers,
    });
  },

  async getVipRevenueByAdminToken(token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getVipRevenueByAdminToken(), { headers });
  },
};
export default vipsAPI;
