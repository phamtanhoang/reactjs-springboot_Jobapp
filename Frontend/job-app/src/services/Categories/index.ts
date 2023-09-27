import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const categoriesAPI = {
  async getCategories(currentPage?: number, itemsPerPage?: number) {
    return await instance.get(urlAPI.getCategories(currentPage, itemsPerPage));
  },

  async getCategoryByID(id: string){
    return await instance.get(urlAPI.getCategoryById(id));
  },


};
export default categoriesAPI;
