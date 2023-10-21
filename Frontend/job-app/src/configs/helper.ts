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

  getCV: (fileName: string) => `/applies/download?fileName=${fileName}`,

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
    `/admin/category/delete?categoryId=${id}`,

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

  detailsJobByAdminToken: (id: string) => `/admin/job/details?jobId=${id}`,

  getEmployersByNameAndAdminToken: (
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) => `/admin/employers?name=${name}&page=${currentPage}&size=${itemsPerPage}`,

  addEmployerByAdminToken: `/admin/employer/create`,

  updateEmployerByAdminToken: (id: string) =>
    `/admin/employer/update?employerId=${id}`,

  deleteEmployerByAdminToken: (id: string) =>
    `/admin/employer/delete?employerId=${id}`,

  detailsEmployerByAdminToken: (id: string) =>
    `/admin/employer/details?employerId=${id}`,

  getCandidatesByNameAndAdminToken: (
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/admin/candidates?keyword=${name}&page=${currentPage}&size=${itemsPerPage}`,

  addCandidateByAdminToken: `/admin/candidate/create`,

  updateCandidateByAdminToken: (id: string) =>
    `/admin/candidate/update?candidateId=${id}`,

  deleteCandidateByAdminToken: (id: string) =>
    `/admin/candidate/delete?candidateId=${id}`,

  detailsCandidateByAdminToken: (id: string) =>
    `/admin/candidate/details?candidateId=${id}`,

  changePasswordAccountByAdminToken: (id: string) =>
    `/admin/changePassword?accountId=${id}`,

  getVipsByNameAndAdminToken: (
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) => `/admin/vips?name=${name}&page=${currentPage}&size=${itemsPerPage}`,

  addVipByAdminToken: `/admin/vip/create`,

  updateVipByAdminToken: (id: string) => `/admin/vip/update?vipId=${id}`,

  deleteVipByAdminToken: (id: string) => `/admin/vip/delete?vipId=${id}`,

  getApplycationsByEmplyerAndAdminToken: (
    name: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/admin/applications?username=${name}&page=${currentPage}&size=${itemsPerPage}`,

  deleteApplicationByAdminToken: (id: string) =>
    `/admin/application/delete?applicationId=${id}`,

  getApplicationByIDAndAdminToken: (id: string) => {
    return `/admin/application/details?applicationId=${id}`;
  },

  getAllVipOfEmployer: "/employers/vips",

  getVipHistoriesByEmployerToken: (currentPage: number, itemsPerPage: number) =>
    `/employers/vipHistories?page=${currentPage}&size=${itemsPerPage}`,

  payment: (vipId: string) => `/VNPay/pay?vipId=${vipId}`,

  getApplicationByCandidateToken: (
    state: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/applies/candidateApplications?state=${state}&page=${currentPage}&size=${itemsPerPage}`,
};
