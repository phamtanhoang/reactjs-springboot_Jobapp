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

  async logout(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.post(urlAPI.logout, { headers });
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
};
export default authsAPI;
