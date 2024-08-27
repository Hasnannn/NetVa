// // stores/useSchoolStore.js
// import { defineStore } from "pinia";
// import axios from "axios";

// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiNjQyYWEzYjAzZWFlYzAwYTgxMTQ1YzA2ZTc2MWIwYmYxY2E2MzQ4YjRkN2YyMWNmMTJmOTUxZDZjNmJlYmY5MGU2YjMwNzE4NGY4Zjg5ZTMiLCJpYXQiOjE3MjQ1OTI3NjAuOTk3NTQzLCJuYmYiOjE3MjQ1OTI3NjAuOTk3NTQ4LCJleHAiOjE3MjQ2NzkxNjAuOTc5MTIzLCJzdWIiOiIzOTgzIiwic2NvcGVzIjpbImFjY2Vzcy1wb3J0YWwiXX0.ne1BJgPd45wC-sE54UfOVWljufY7rnwFiOYCVzZ2i_nf2-gJEjQfy75Me5ZcZ9wppfTVOWuAVXIwhLuTE3-AsOgU3q0RHooOQeW0ExRLX3YIhgiieplLYP4Fj9SUwLOy2dotOCXmm1GGjSF84IFYmFYHfGaabTeYtJpz9d1e4wIsBiIARHPbelLmLVEUXw4jo2N2LUrHtgPG0RtpcSup83Hqaorv8B4dD5gFcbokfwILv027xZzsfQxp-W6UlBDd7wo3W6AmacTgUBfXGLphQCiEoN8MCMH2v-zmfny5Qh-AUUk2LsSWozbPALSbpPVvxrfJUL0zh9WHfOMd80MYJsuMrC8A8s1y-xphQ08zb_arnL48JkaevkTOmoG1V7P1oA8Ew-u1bMTm9D0sFRSTxsba67MT_Ywszp-YQ4APtsT2piZpO5hBPd9LrVoT3NLK7zmmTw9poNh099BUu93dNOpIQCvMDVzjFQiE6dmyz6I0McZq8SZMFsPIMJt7IH7_w7XIX5ysh0---tUOEPJYoZnEID9JZtGOAB8mEMrOzVZUeukk83pPIhlLaJLrHPpqeyE1Lxgqvk6b3spstMMpjM5koKbcr6-sqFSUso0JHYyUcmuix4HiYI1vFhK2XuSZj_V9NoQ5_BYBusGUNnvTy3gIWNbX5IemSgVXU8xkLus";

// export const useSchoolStore = defineStore("schoolStore", {
//     state: () => ({
//         schools: [],
//         schoolsList: [],
//         searchQuery: "",
//         filterStatus: "",
//     }),
//     getters: {
//         filteredSchools(state) {
//             return state.schools.filter((school) => {
//                 const matchesSearch = school.name
//                     .toLowerCase()
//                     .includes(state.searchQuery.toLowerCase());
//                 const matchesFilter = state.filterStatus
//                     ? school.internetNumbers.some(
//                         (internet) => internet.status === state.filterStatus
//                     )
//                     : true;
//                 return matchesSearch && matchesFilter;
//             });
//         },
//     },
//     actions: {
//         async fetchSchools() {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/api/sekolah", {
//                     headers:{
//                         "Authorization":`Bearer ${token}`
//                     }
//                 });
//                 this.schools = response.data;
//             } catch (error) {
//                 console.error("Fetching schools failed:", error);
//             }
//         },
//         async fetchSchoolsList() {
//             try {
//                 const response = await axios.get(
//                     "http://127.0.0.1:8000/api/internet-sekolah"
//                 );
//                 this.schoolsList = response.data;
//             } catch (error) {
//                 console.error("Fetching schools list failed:", error);
//             }
//         },
//         async addSchool(schoolData) {
//             try {
//                 const response = await axios.post(
//                     "http://127.0.0.1:8000/api/sekolah",
//                     schoolData
//                 );
//                 this.schools.push(response.data);
//             } catch (error) {
//                 console.error("Adding school failed:", error);
//             }
//         },
//         async updateSchool(id, schoolData) {
//             try {
//                 await axios.put(`http://127.0.0.1:8000/api/sekolah/${id}`, schoolData);
//                 const index = this.schools.findIndex((school) => school.id === id);
//                 if (index !== -1) {
//                     this.schools[index] = { ...this.schools[index], ...schoolData };
//                 }
//             } catch (error) {
//                 console.error("Updating school failed:", error);
//             }
//         },
//         async deleteSchool(id) {
//             try {
//                 await axios.delete(`http://127.0.0.1:8000/api/sekolah/${id}`);
//                 this.schools = this.schools.filter((school) => school.id !== id);
//             } catch (error) {
//                 console.error("Deleting school failed:", error);
//             }
//         },
//         setSearchQuery(query) {
//             this.searchQuery = query;
//         },
//         setFilterStatus(status) {
//             this.filterStatus = status;
//         },
//     },
// });
