import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const employersAPI = {
  async getEmployers(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getEmployers(currentPage, itemsPerPage));
  },

  async getVipEmployers(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(
      urlAPI.getVipEmployers(currentPage, itemsPerPage)
    );
  },

  async getEmployerById(id?: string) {
    return await instance.get(urlAPI.getEmployerById(id));
  },

  async getEmployersByNameContaining(
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) {
    return await instance.get(
      urlAPI.getEmployersByNameContaining(name, currentPage, itemsPerPage)
    );
  },

  async updateLogo(img?: File, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    if (img) {
      formData.append("image", img);
    }
    return await instance.put(urlAPI.updateEmployerLogo, formData, {
      headers,
    });
  },

  async updateBanner(img?: File, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    if (img) {
      formData.append("image", img);
    }
    return await instance.put(urlAPI.updateEmployerBanner, formData, {
      headers,
    });
  },

  async updateProfile(
    name: string,
    address: string,
    desription: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      address: address,
      name: name,
      description: desription,
    };
    return await instance.put(urlAPI.updateEmployerProfile, data, {
      headers,
    });
  },
};
export default employersAPI;
