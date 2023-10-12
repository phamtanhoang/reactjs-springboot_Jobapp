import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const categoriesAPI = {
  async getCategories(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getCategories(currentPage, itemsPerPage));
  },

  async getCategoryByID(id: string) {
    return await instance.get(urlAPI.getCategoryById(id));
  },

  async getCategoryByNameAndAdminToken(
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
      urlAPI.getCategoriesByNameAndAdminToken(name, currentPage, itemsPerPage),
      { headers }
    );
  },

  async addCategoryByAdminToken(name: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = { name: name };
    return await instance.post(urlAPI.addCategoryByAdminToken, data, {
      headers,
    });
  },

  async updateCategoryByAdminToken(id: string, name: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = { name: name };
    return await instance.put(urlAPI.updateCategoryByAdminToken(id), data, {
      headers,
    });
  },

  async deleteCategoryByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.delete(urlAPI.deleteCategoryByAdminToken(id), {
      headers,
    });
  },
};
export default categoriesAPI;
