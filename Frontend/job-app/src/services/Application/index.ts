import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const applicationsAPI = {
  async getCandidateApplyJob(jobId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.getCandidateApplyJob(jobId), {
      headers,
    });
  },

  async getApplicationByIDAndEmployerToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.getApplicationByIDAndEmployerToken(id), {
      headers,
    });
  },

  async getApplicationsByEmployerToken(
    title: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(
      urlAPI.getApplicationsByEmployerToken(title, currentPage, itemsPerPage),
      {
        headers,
      }
    );
  },

  async updateState(state: string, applicationId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      newState: state,
      applicationId: applicationId,
    };
    return await instance.put(urlAPI.updateApplicationState, data, {
      headers,
    });
  },

  async getApplicationsByJobIDAndEmplerToken(
    jobId: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(
      urlAPI.getApplicationsByJobIDAndEmplerToken(
        jobId,
        currentPage,
        itemsPerPage
      ),
      {
        headers,
      }
    );
  },

  async getApplycationsByEmplyerAndAdminToken(
    title: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(
      urlAPI.getApplycationsByEmplyerAndAdminToken(
        title,
        currentPage,
        itemsPerPage
      ),
      {
        headers,
      }
    );
  },

  async deleteApplicationByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.delete(urlAPI.deleteApplicationByAdminToken(id), {
      headers,
    });
  },

  async getApplicationByIDAndAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getApplicationByIDAndAdminToken(id), {
      headers,
    });
  },

  async getCV(fileName: string) {
    return await instance.get(urlAPI.getCV(fileName), {
      responseType: "arraybuffer",
    });
  },

  async getApplicationByCandidateToken(
    state: string,
    currentPage: number,
    itemsPerPage: number,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getApplicationByCandidateToken(state, currentPage, itemsPerPage),
      {
        headers,
      }
    );
  },

  async getApplicationByApplicatonIDAndCandidateToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getApplicationByApplicatonIDAndCandidateToken(id), {
      headers,
    });
  },

  async getAllApplicationByEmployerToken(
    token?: string,
    title?: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getAllApplicationByEmployerToken(title, currentPage, itemsPerPage),
      { headers }
    );
  },

  async getPendingApplicationsByEmployerToken(
    token?: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(
      urlAPI.getPendingApplicationsByEmployerToken(currentPage, itemsPerPage),
      { headers }
    );
  },
};
export default applicationsAPI;
