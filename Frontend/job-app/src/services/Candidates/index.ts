/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const candidatesAPI = {
  async getCandidateById(id: string) {
    return await instance.get(urlAPI.getCandidateById(id));
  },

  async updateCandidate(
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string,
    sex?: string,
    token?: string
  ) {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      sex: sex,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.put(urlAPI.updateCandidate, userData, { headers });
  },

  async updateCandidateSkill(skill?: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      skill: skill,
    };
    return await instance.put(urlAPI.updateCandidateSkill, data, { headers });
  },

  async updateCandidateExp(exp?: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      experience: exp,
    };
    return await instance.put(urlAPI.updateCandidateExp, data, { headers });
  },

  async updateAvatar(img?: File, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    if (img) {
      formData.append("image", img);
    }
    return await instance.put(urlAPI.updateCandidateAvatar, formData, {
      headers,
    });
  },

  async candidateApply(
    jobId?: string,
    letter?: string,
    phoneNumber?: string,
    email?: string,
    name?: string,
    cVFile?: File,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    // Đính kèm tệp tin CV vào formData nếu có
    if (cVFile) {
      formData.append("cVFile", cVFile);
    }

    const jsonData = {
      jobId: jobId,
      letter: letter,
      phoneNumber: phoneNumber,
      email: email,
      name: name,
    };

    // Đính kèm đối tượng JSON vào formData
    formData.append(
      "application",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    return await instance.post(urlAPI.candidateApply, formData, {
      headers,
    });
  },

  async getCandidateProfileById(id: string) {
    return await instance.get(urlAPI.getCandidateProfileById(id));
  },

  async getCandidatesByNameAndAdminToken(
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
      urlAPI.getCandidatesByNameAndAdminToken(name, currentPage, itemsPerPage),
      { headers }
    );
  },

  async addCandidateByAdminToken(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    sex: string,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      sex: sex,
    };
    console.log(urlAPI.addCandidateByAdminToken);
    console.log(data);

    return await instance.post(urlAPI.addCandidateByAdminToken, data, {
      headers,
    });
  },

  async updateCandidateByAdminToken(
    id: string,
    firstName: string,
    lastName: string,
    state: string,
    dateOfBirth: string,
    sex: string,
    skill: string,
    experience: string,
    avatar?: File,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      firstName: firstName,
      lastName: lastName,
      state: state,
      dateOfBirth: dateOfBirth,
      sex: sex,
      skill: skill,
      experience: experience,
    };
    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }

    formData.append(
      "candidate",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    return await instance.put(
      urlAPI.updateCandidateByAdminToken(id),
      formData,
      {
        headers,
      }
    );
  },

  async deleteCandidateByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.delete(urlAPI.deleteCandidateByAdminToken(id), {
      headers,
    });
  },

  async detailCandidateByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.detailsCandidateByAdminToken(id), {
      headers,
    });
  },
};
export default candidatesAPI;
