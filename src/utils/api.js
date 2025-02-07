import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, FormData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(apiUrl + url, params);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editData = async (url, updateData, config) => {
  try {
    const response = await axios.put(apiUrl + url, updateData, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Request failed" };
  }
};

export const blogAPI = {
  getAll: (params = "") => fetchDataFromApi(`/api/blog/all${params}`),
  getById: (id) => fetchDataFromApi(`/api/blog/${id}`),
  create: (data) => postData("/api/blog/create", data),
  update: (id, data) => editData(`/api/blog/${id}`, data),
  delete: (id) => editData(`/api/blog/${id}`, {}, { method: "DELETE" }),
};
