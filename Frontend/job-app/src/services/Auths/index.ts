import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const authsAPI = {
  async loginCandidate(email: string, password: string) {
    const userData = {
      username: email,
      password: password,
    };
    return await instance.post(urlAPI.loginCandidate, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async registerCandidate(
    firstName: string,
    lastName: string,
    avatar: string,
    dateOfBirth: string,
    sex: string,
    email: string,
    password: string
  ) {
    const userData = {
      username: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      dateOfBirth: dateOfBirth,
      sex: sex,
    };
    return await instance.post(urlAPI.registerCandidate, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async currentCandidate(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.currentCandidate, { headers });
  },

  async currentEmployer(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.currentEmployer, { headers });
  },

  async loginEmployer(email: string, password: string) {
    const userData = {
      username: email,
      password: password,
    };
    return await instance.post(urlAPI.loginEmployer, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async registerEmployer(
    email: string,
    password: string,
    name: string,
    address: string,
    banner: string,
    image: string,
    description: string
  ) {
    const userData = {
      username: email,
      password: password,
      name: name,
      address: address,
      banner: banner,
      image: image,
      description: description,
    };
    return await instance.post(urlAPI.registerEmployer, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async loginAdmin(username: string, password: string) {
    const userData = {
      username: username,
      password: password,
    };
    return await instance.post(urlAPI.loginAdmin, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
  
  async changePassword(
    currentPassword?: string,
    newPassword?: string,
    confirmPassword?: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    return await instance.put(urlAPI.changePassword, data, { headers });
  },

  async logout(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.post(urlAPI.logout, { headers });
  },
};
export default authsAPI;
