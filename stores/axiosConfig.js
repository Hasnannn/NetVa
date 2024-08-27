// // axiosConfig.js
// import axios from "axios";

// // Buat instance Axios
// const axiosInstance = axios.create({
//     baseURL: "http://127.0.0.1:8000/api",
// });

// // Tambahkan interceptor untuk menyisipkan token
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiNjQyYWEzYjAzZWFlYzAwYTgxMTQ1YzA2ZTc2MWIwYmYxY2E2MzQ4YjRkN2YyMWNmMTJmOTUxZDZjNmJlYmY5MGU2YjMwNzE4NGY4Zjg5ZTMiLCJpYXQiOjE3MjQ1OTI3NjAuOTk3NTQzLCJuYmYiOjE3MjQ1OTI3NjAuOTk3NTQ4LCJleHAiOjE3MjQ2NzkxNjAuOTc5MTIzLCJzdWIiOiIzOTgzIiwic2NvcGVzIjpbImFjY2Vzcy1wb3J0YWwiXX0.ne1BJgPd45wC-sE54UfOVWljufY7rnwFiOYCVzZ2i_nf2-gJEjQfy75Me5ZcZ9wppfTVOWuAVXIwhLuTE3-AsOgU3q0RHooOQeW0ExRLX3YIhgiieplLYP4Fj9SUwLOy2dotOCXmm1GGjSF84IFYmFYHfGaabTeYtJpz9d1e4wIsBiIARHPbelLmLVEUXw4jo2N2LUrHtgPG0RtpcSup83Hqaorv8B4dD5gFcbokfwILv027xZzsfQxp-W6UlBDd7wo3W6AmacTgUBfXGLphQCiEoN8MCMH2v-zmfny5Qh-AUUk2LsSWozbPALSbpPVvxrfJUL0zh9WHfOMd80MYJsuMrC8A8s1y-xphQ08zb_arnL48JkaevkTOmoG1V7P1oA8Ew-u1bMTm9D0sFRSTxsba67MT_Ywszp-YQ4APtsT2piZpO5hBPd9LrVoT3NLK7zmmTw9poNh099BUu93dNOpIQCvMDVzjFQiE6dmyz6I0McZq8SZMFsPIMJt7IH7_w7XIX5ysh0---tUOEPJYoZnEID9JZtGOAB8mEMrOzVZUeukk83pPIhlLaJLrHPpqeyE1Lxgqvk6b3spstMMpjM5koKbcr6-sqFSUso0JHYyUcmuix4HiYI1vFhK2XuSZj_V9NoQ5_BYBusGUNnvTy3gIWNbX5IemSgVXU8xkLus"; // Ganti dengan token Anda

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
