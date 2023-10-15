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
      formData.append("banner", img);
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

  async getEmployerByNameAndAdminToken(
    name: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getEmployersByNameAndAdminToken(name, currentPage, itemsPerPage),
      { headers }
    );
  },

  async addEmployerByAdminToken(
    username: string,
    password: string,
    name: string,
    address: string,
    description: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      username: username,
      password: password,
      name: name,
      address: address,
      description: description,
    };
    return await instance.post(urlAPI.addEmployerByAdminToken, data, {
      headers,
    });
  },

  async updateEmployerByAdminToken(
    id: string,
    state: string,
    address: string,
    description: string,
    name: string,
    logo?: File,
    banner?: File,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      description: description,
      address: address,
      state: state,
      name: name,
    };
    const formData = new FormData();
    if (logo) {
      formData.append("image", logo);
    }
    if (banner) {
      formData.append("banner", banner);
    }
    formData.append(
      "employer",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    return await instance.put(urlAPI.updateEmployerByAdminToken(id), formData, {
      headers,
    });
  },

  async deleteEmployerByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.delete(urlAPI.deleteEmployerByAdminToken(id), {
      headers,
    });
  },

  async detailEmployerByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.detailsEmployerByAdminToken(id), {
      headers,
    });
  },
};
export default employersAPI;
