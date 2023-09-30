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

  async updateAvatar(url?: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      url: url,
    };
    return await instance.put(urlAPI.updateCandidateAvatar, data, { headers });
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

    console.log(formData);
    return await instance.post(urlAPI.candidateApply, formData, {
      headers,
    });
  },
};
export default candidatesAPI;
