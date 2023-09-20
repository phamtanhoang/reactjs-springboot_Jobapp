import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const categoriesAPI = {
  async getAllCategory() {
    return await instance.get(urlAPI.getAllCategory);
  },
};
export default categoriesAPI;
