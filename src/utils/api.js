import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response, 
  async (error) => {

    if (error.response && error.response.status === 401) {
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

   
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const postData = async (url, formData) => {
  try {
    const response = await apiClient.post(url, formData);
    return response.data;
  } catch (error) {
    console.error("postData error:", error);
    return {
      error: true,
      
       message: error.response?.data?.message || error.message,
      status: error.response?.status,
        data: error.response?.data
    };
  }
};

export const uploadPhoto = async (url, formData) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.data.success) {
      const error = new Error(response.data.message || "Photo submission failed");
      error.status = response.status;
      throw error;
    }
    return response.data;
  } catch (error) {
    let errorMessage = "Network error or server unreachable";
    let status = 500;

    if (error.response) {
      errorMessage = error.response.data?.message || error.message;
      status = error.response.status;
    }

    const newError = new Error(errorMessage);
    newError.status = status;
    throw newError;
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    console.error("fetchDataFromApi error:", error);
    return error;
  }
};

export const editData = async (url, updateData, config) => {
  try {
    const response = await apiClient.put(url, updateData, { ...config });
    return response.data;
  } catch (error) {
    console.error("editData error:", error);
    return error.response?.data || { message: "Request failed" };
  }
};

export const deleteData = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error("deleteData error:", error);
    return {
      error: true,
      message:
        error.response?.data?.message || "Failed to delete data",
      status: error.response?.status || 500,
    };
  }
};


export const blogAPI = {
  getAll: (params = "") => fetchDataFromApi(`/api/blog/public/all${params}`),
  getById: (id) => fetchDataFromApi(`/api/blog/public/${id}`),
};

