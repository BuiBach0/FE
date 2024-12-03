// import { message } from "antd";
// import React, { Children, createContext, useEffect, useState } from "react";
// import axiosInstance from "../../Helper/AxiosInstance";

// export const AppContext = createContext({});

// export const AppProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   console.log(data, "aaaaaaaa");

//   const token = localStorage.getItem("access");

//   const fetchData = async (record) => {
//     if (!token) {
//       message.error("Bạn cần đăng nhập!");
//       return;
//     }
//     try {
//         const getNameDepartments = await axiosInstance.get("/departments", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         // Kiểm tra dữ liệu trả về từ API
//         const departments = getNameDepartments.data.data;
//         console.log(departments, "Kiểm tra dữ liệu trả về từ API");
//         console.log(record.id,'--------------------');
        
        
//         // Đặt dữ liệu vào state (chọn phần tử đầu tiên làm ví dụ)
//         const selectedDepartment = departments.find(
//           (dep) => dep.id === record.id
//         );
//         console.log(selectedDepartment.id,'aaaaaaaaaaaaaaaaaaaaa');
//         const selectedDep = departments.find((dep) => dep.id === record.id);
//         if (selectedDep) {
//           setSelectedDepartment(selectedDep); // Cập nhật state cho department được chọn
//         } else {
//           setSelectedDepartment(record); // Fallback nếu không tìm thấy
//         }
//       } catch (error) {
//         console.error("Lỗi không lấy được khoa", error);
//         message.error("Lỗi không lấy được khoa");
//       }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [token]);
//   return <AppContext.Provider value={{data}}>{children}</AppContext.Provider>;
// };
