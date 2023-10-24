import { instance } from "../../configs/Apis";
import { urlAPI } from "../../configs/helper";

const blogsAPI = {
  async getBlogs(title: string, currentPage: number, itemsPerPage: number) {
    return await instance.get(
      urlAPI.getAllBlogs(title, currentPage, itemsPerPage)
    );
  },

  async getAllBlogsByEmployerToken(
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
      urlAPI.getAllBlogsByEmployerToken(title, currentPage, itemsPerPage),
      { headers }
    );
  },

  async getAllComments(
    blogId: string,
    currentPage?: number,
    itemsPerPage?: number
  ) {
    return await instance.get(
      urlAPI.getAllComments(blogId, currentPage, itemsPerPage)
    );
  },

  async addBlog(
    title?: string,
    content?: string,
    image?: File,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    // Đính kèm tệp tin CV vào formData nếu có
    if (image) {
      formData.append("image", image);
    }
    const jsonData = {
      title: title,
      content: content,
    };

    // Đính kèm đối tượng JSON vào formData
    formData.append(
      "blog",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    console.log(formData);
    return await instance.post(urlAPI.addBlogByEmployerToken, formData, {
      headers,
    });
  },

  async updateBlog(
    blogId: string,
    title: string,
    content: string,
    image?: File,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    // Đính kèm tệp tin CV vào formData nếu có
    if (image) {
      formData.append("image", image);
    }
    const jsonData = {
      content: content,
      title: title,
    };

    // Đính kèm đối tượng JSON vào formData
    formData.append(
      "updatedBlog",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    return await instance.put(
      urlAPI.updateBlogByEmployerToken(blogId),
      formData,
      {
        headers,
      }
    );
  },

  async deleteBlogByEmployerToken(blogId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.delete(urlAPI.deleteBlogByEmployerToken(blogId), {
      headers: headers,
    });
  },

  async addComment(comment: string, blogId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      comment: comment,
    };
    return await instance.post(urlAPI.addCommentByToken(blogId), data, {
      headers,
    });
  },

  async addReply(comment: string, commentId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      comment: comment,
    };
    return await instance.post(urlAPI.addReplyByToken(commentId), data, {
      headers,
    });
  },

  async deleteSelfComment(commentId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.delete(urlAPI.deleteSelfComment(commentId), {
      headers: headers,
    });
  },

  async deleteBlogComment(commentId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.delete(urlAPI.deleteBlogComment(commentId), {
      headers: headers,
    });
  },

  async getBlogByIdAndEmployerToken(blogId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.getBlogByIdAndEmployerToken(blogId), {
      headers: headers,
    });
  },

  async getAllBlogsByAdminToken(
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
      urlAPI.getBlogsByAdminToken(title, currentPage, itemsPerPage),
      { headers }
    );
  },

  async getBlogByIdAndAdminToken(blogId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.getBlogByIdAndAdminToken(blogId), {
      headers: headers,
    });
  },

  async updateBlogByAdminToken(
    blogId: string,
    title: string,
    content: string,
    state: string,
    image?: File,
    token?: string
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    // Đính kèm tệp tin CV vào formData nếu có
    if (image) {
      formData.append("image", image);
    }
    const jsonData = {
      content: content,
      title: title,
      state: state,
    };

    // Đính kèm đối tượng JSON vào formData
    formData.append(
      "updatedBlog",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    return await instance.put(urlAPI.updateBlogByAdminToken(blogId), formData, {
      headers,
    });
  },

  async deleteBlogByAdminToken(blogId: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.delete(urlAPI.deleteBlogByAdminToken(blogId), {
      headers: headers,
    });
  },

  async deleteBlogCommentByAdminToken(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.delete(urlAPI.deleteBlogCommentByAdminToken(id), {
      headers: headers,
    });
  },

  async getTopBlogs() {
    return await instance.get(urlAPI.getTopBlogs());
  },

  async getBlogsByEmployerId(
    employerId: string,
    currentPage: number,
    itemsPerPage: number
  ) {
    return await instance.get(
      urlAPI.getBlogsByEmployerId(employerId, currentPage, itemsPerPage)
    );
  },

  async getBlogById(blogId: string) {
    return await instance.get(urlAPI.getBlogById(blogId));
  },

  async checkComment(id: string, token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return await instance.get(urlAPI.checkComment(id), {
      headers: headers,
    });
  },
  async getBlogCountByAdminToken(token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getBlogCount(), { headers });
  },

  async getEmployerCountByAdminToken(token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getEmployerCount(), { headers });
  },

  async getJobCountByAdminToken(token?: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return await instance.get(urlAPI.getJobCount(), { headers });
  },
};
export default blogsAPI;
