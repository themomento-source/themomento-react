// import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;

// // api.js
// export const postData = async (url, formData) => {
//   try {
//     const response = await fetch(apiUrl + url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const responseData = await response.json();

//     if (!response.ok) {
//       return {
//         error: true,
//         message:
//           responseData.message || `HTTP error! status: ${response.status}`,
//         status: response.status,
//       };
//     }

//     return responseData;
//   } catch (error) {
//     console.error("postData error:", error);
//     return {
//       error: true,
//       message: "Network error or server unreachable",
//     };
//   }
// };

// export const uploadPhoto = async (url, formData) => {
//   try {
//     const response = await axios.post(apiUrl + url, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         // Axios automatically sets 'Content-Type' to 'multipart/form-data'
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("uploadPhoto error:", error);
//     if (error.response) {
//       // Server responded with an error status (4xx, 5xx)
//       return {
//         error: true,
//         message:
//           error.response.data?.message ||
//           `HTTP error! status: ${error.response.status}`,
//         status: error.response.status,
//       };
//     } else {
//       // Network error or server unreachable
//       return {
//         error: true,
//         message: "Network error or server unreachable",
//       };
//     }
//   }
// };

// export const fetchDataFromApi = async (url) => {
//   try {
//     const params = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.get(apiUrl + url, params);

//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const editData = async (url, updateData, config) => {
//   try {
//     const response = await axios.put(apiUrl + url, updateData, {
//       ...config,
//       headers: {
//         ...config?.headers,
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Request failed" };
//   }
// };

// export const blogAPI = {
//   getAll: (params = "") => fetchDataFromApi(`/api/blog/all${params}`),
//   getById: (id) => fetchDataFromApi(`/api/blog/${id}`),
//   create: (data) => postData("/api/blog/create", data),
//   update: (id, data) => editData(`/api/blog/${id}`, data),
//   delete: (id) => editData(`/api/blog/${id}`, {}, { method: "DELETE" }),
// };





// export const deleteData = async (url) => {
//   try {
//     const response = await axios.delete(apiUrl + url, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("deleteData error:", error);
//     return {
//       error: true,
//       message: error.response?.data?.message || "Failed to delete data",
//       status: error.response?.status || 500,
//     };
//   }
// };
















import axios from "axios";
import { useNavigate } from "react-router-dom"; 
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
      message:
        error.response?.data?.message || `HTTP error! status: ${error.response?.status}`,
      status: error.response?.status,
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

    return response.data;
  } catch (error) {
    console.error("uploadPhoto error:", error);
    if (error.response) {
      
      return {
        error: true,
        message:
          error.response.data?.message ||
          `HTTP error! status: ${error.response.status}`,
        status: error.response.status,
      };
    } else {
    
      return {
        error: true,
        message: "Network error or server unreachable",
      };
    }
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
  getAll: (params = "") => fetchDataFromApi(`/api/blog/all${params}`),
  getById: (id) => fetchDataFromApi(`/api/blog/${id}`),
  create: (data) => postData("/api/blog/create", data),
  update: (id, data) => editData(`/api/blog/${id}`, data),
  delete: (id) => editData(`/api/blog/${id}`, {}, { method: "DELETE" }),
};
