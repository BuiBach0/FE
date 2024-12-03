import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProfile from "./components/Admin/Profile/AddProfile";
import EditProfile from "./components/Admin/Profile/EditProfile";
import LoginForm from "./components/Admin/FormLogin/LoginForm";
import AddClass from "./components/Admin/Classes/AddClass";
import MenuPage from "./components/Admin/Menu/MenuPage";
import AddDepartments from "./components/Admin/departments/AddDepartments";
import ListUser from "./components/Admin/User/ListUser";
import ListDepartments from "./components/Admin/departments/ListDepartments";
import CreateUser from "./components/Admin/User/CreateUser";
import ListClass from "./components/Admin/Classes/ListClass";
import ClassOfDepartment from "./components/Admin/departments/ClassOfDepartment";
import AddTeacher from "./components/Teacher/AddTeacher";
import AppContext from "antd/es/app/context";
import { AppProvider } from "./components/test/AppContext";
// import AddTeacher from "./components/Teacher/AddTeacher";
// import AddStudent from "./components/student/AddStudent";
// import TestApi from "./components/test/TestApi";



function App() {
  return (
      
    <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="Menu" element={<MenuPage />} />
      <Route path="CreateUser" element={<CreateUser />} />
      <Route path="ListUser" element={<ListUser />} />
      <Route path="EditProfile" element={<EditProfile />} />
      <Route path="AddProfile" element={<AddProfile />} />
      <Route path="AddClass" element={<AddClass />} />
      <Route path="ListClass" element={<ListClass />} />
      <Route path="AddTeacher" element={<AddTeacher />} />
      <Route path="AddDepartments" element={<AddDepartments />} />
      <Route path="ListDepartments" element={<ListDepartments />} />
      <Route path="ClassOfDepartment" element={<ClassOfDepartment />} />
    </Routes>
  
</BrowserRouter>

    
   
  );
}

export default App;
