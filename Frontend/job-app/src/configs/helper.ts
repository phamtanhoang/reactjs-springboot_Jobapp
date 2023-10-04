export const urlAPI = {
  getCategories: (currentPage?: number, itemsPerPage?: number) => {
    if (currentPage !== undefined || itemsPerPage !== undefined) {
      return `/categories?page=${currentPage}&size=${itemsPerPage}`;
    } else {
      return "/categories";
    }
  },

  getEmployers: (currentPage?: number, itemsPerPage?: number) => {
    if (currentPage !== undefined || itemsPerPage !== undefined) {
      return `/employers?page=${currentPage}&size=${itemsPerPage}`;
    } else {
      return "/employers";
    }
  },

  getJobs: (currentPage?: number, itemsPerPage?: number) => {
    if (currentPage !== undefined || itemsPerPage !== undefined) {
      return `/jobs?page=${currentPage}&size=${itemsPerPage}`;
    } else {
      return "/jobs";
    }
  },

  getVipEmployers: (currentPage?: number, itemsPerPage?: number) => {
    if (currentPage !== undefined || itemsPerPage !== undefined) {
      return `/employers/search/findVipEmployers?page=${currentPage}&size=${itemsPerPage}`;
    } else {
      return "/employers/search/findVipEmployers";
    }
  },

  getEmployersByNameContaining: (
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) => {
    if (name === "")
      return `/employers?page=${currentPage}&size=${itemsPerPage}`;
    else
      return `/employers/search/findByNameContaining?name=${name}&page=${currentPage}&size=${itemsPerPage}`;
  },

  getJobsByCategoryId: (
    id: string,
    currentPage?: number,
    itemsPerPage?: number
  ) => {
    const sizeParameter =
      itemsPerPage !== undefined || currentPage !== undefined
        ? `&page=${currentPage}&size=${itemsPerPage}`
        : "";
    return `/jobs/search/findByCategoryId?categoryId=${id}${sizeParameter}`;
  },

  getJobsByEmployerId: (
    id: string,
    currentPage?: number,
    itemsPerPage?: number
  ) => {
    return `/jobs/search/findByEmployerId?employerId=${id}&page=${currentPage}&size=${itemsPerPage}`;
  },

  getVipJobs: (currentPage: number, itemsPerPage: number) => {
    return `/jobs/search/findJobsWithVipEmployer?page=${currentPage}&size=${itemsPerPage}`;
  },

  getJobsByTitleContainingAndAddress: (
    title: string,
    address: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/jobs/search/findByTitleContainingAndAddress?title=${title}&address=${address}&page=${currentPage}&size=${itemsPerPage}`,

  getCategoryById: (id: string) => `/categories/${id}`,

  getEmployerById: (id?: string) => `/employers/${id}`,

  getJobById: (id: string) => `/jobs/${id}`,

  getAccountById: (id: string) => `/accounts/${id}`,

  getAccountByUserName: (userName: string) =>
    `/accounts/search/findByUsername?username=${userName}`,

  getCandidateById: (id: string) => `/candidates/${id}`,

  loginCandidate: "/auth/candidate/login",

  currentCandidate: "/candidates/profile",

  registerCandidate: "/auth/candidate/addNewCandidate",

  updateCandidate: "/candidates/update",

  updateCandidateAvatar: "/candidates/updateImage",

  updateCandidateSkill: "/candidates/updateSkill",

  updateCandidateExp: "/candidates/updateExperience",

  getCandidateApplyJob: (id: string) => `/applies/isApplied?jobId=${id}`,

  candidateApply: "/candidates/apply",

  loginEmployer: "/auth/employer/login",

  registerEmployer: "/auth/employer/register",

  logout: "/auth/logout",

  changePassword: "/auth/changePassword",
};
