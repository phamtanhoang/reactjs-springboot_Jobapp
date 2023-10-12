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

  getCandidateProfileById: (id: string) =>
    `/candidates/candidateProfile?id=${id}`,

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

  currentEmployer: "/employers/profile",

  getJobsByTitleContainingAndEmployerToken: (
    title: string,
    currentPage: number,
    itemsPerPage: number
  ) => {
    return `/jobs/search/findByEmployerIdAndTitleContaining?title=${title}&page=${currentPage}&size=${itemsPerPage}`;
  },

  addJobByEmployerToken: "/jobs/create",

  getApplicationByIDAndEmployerToken: (id: string) => {
    return `/applies/applicationDetails?applicationId=${id}`;
  },

  getApplicationsByEmployerToken: (
    title: string,
    currentPage: number,
    itemsPerPage: number
  ) => {
    return `/applies/employerApplications?title=${title}&page=${currentPage}&size=${itemsPerPage}`;
  },

  updateEmployerBanner: "/employers/updateBanner",

  updateEmployerLogo: "/employers/updateImage",

  updateEmployerProfile: "/employers/update",

  updateJobByEmployerToken: (jobId: string) => `/jobs/update?jobId=${jobId}`,

  deleteJobByEmployerToken: (jobId: string) => `/jobs/delete?jobId=${jobId}`,

  updateApplicationState: "/applies/updateState",

  getJobByEmployerToken: (jobId: string) =>
    `/employers/jobDetails?jobId=${jobId}`,

  getApplicationsByJobIDAndEmplerToken: (
    jobId: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/applies/applicatonsJob?jobId=${jobId}&page=${currentPage}&size=${itemsPerPage}`,

  loginAdmin: "/admin/login",

  getCategoriesByNameAndAdminToken: (
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/admin/categories?name=${name}&page=${currentPage}&size=${itemsPerPage}`,

  addCategoryByAdminToken: `/admin/category/create`,

  updateCategoryByAdminToken: (id: string) =>
    `/admin/category/update?categoryId=${id}`,

  deleteCategoryByAdminToken: (id: string) =>
    `/admin/job/delete?categoryId=${id}`,

  getJobsByTitleAndAdminToken: (
    title: string,
    categoryId: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/admin/jobs?title=${title}&categoryId=${categoryId}&page=${currentPage}&size=${itemsPerPage}`,

  addJobByAdminToken: `/admin/job/create`,

  updateJobByAdminToken: (id: string) => `/admin/job/update?jobId=${id}`,

  deleteJobByAdminToken: (id: string) => `/admin/job/delete?jobId=${id}`,
};
