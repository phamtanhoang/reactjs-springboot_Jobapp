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
      return "employers/search/findVipEmployers";
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
    categoryId: string,
    currentPage?: number,
    itemsPerPage?: number
  ) => {
    const sizeParameter =
      itemsPerPage !== undefined || currentPage !== undefined
        ? `&page=${currentPage}&size=${itemsPerPage}`
        : "";
    return `/jobs/search/findByCategoryId?categoryId=${categoryId}${sizeParameter}`;
  },

  getJobsByEmployerId: (employerId: string, itemsPerPage?: number) => {
    const sizeParameter =
      itemsPerPage !== undefined ? `&size=${itemsPerPage}` : "";
    return `/jobs/search/findByEmployerId?employerId=${employerId}${sizeParameter}`;
  },

  getJobsByTitleContainingAndAddress: (
    title: string,
    address: string,
    currentPage: number,
    itemsPerPage: number
  ) =>
    `/jobs/search/findByTitleContainingAndAddress?title=${title}&address=${address}&page=${currentPage}&size=${itemsPerPage}`,

  getCategoryById: (categoryId: string) => `/categories/${categoryId}`,

  getEmployerById: (employerId?: string) => `/employers/${employerId}`,

  getJobById: (jobId: string) => `/jobs/${jobId}`,
};
