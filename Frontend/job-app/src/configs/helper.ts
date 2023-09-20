export const urlAPI = {
  getAllCategory: "/categories",
  getJobByCategoryId: (categoryId: string)=> `/jobs/search/findByCategoryId?categoryId=${categoryId}`, 
//   employers: "/api/employers",
//   jobs: "/api/jobs",
//   searchJobs: "/api/jobs/search",
};
