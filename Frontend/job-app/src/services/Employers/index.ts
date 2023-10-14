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

  async getEmployersByNameAndAdminToken(
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
        urlAPI.getEmployersByNameAndAdminToken(
            name,
            currentPage,
            itemsPerPage
        ),
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
    console.log(urlAPI.addEmployersByAdminToken);
    console.log(data);
    console.log(headers);

    return await instance.post(urlAPI.addEmployersByAdminToken, data, {
      headers,
    });
  },

  async updateEmployerByAdminToken(
      id: string,
      state:string,
      address: string,
      description: string,
      name:string,
      token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      description: description,
      address: address,
      state: state,
      name:name,
    };

    return await instance.put(urlAPI.updateEmployerByAdminToken(id), data, {
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
