import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProfile from "./components/Profile/AddProfile";
import EditProfile from "./components/Profile/EditProfile";
import LoginForm from "./components/FormLogin/LoginForm";
import AddClass from "./components/Classes/AddClass";
import CreateTeacher from "./components/User/CreateTeacher";
import MenuPage from "./components/Menu/MenuPage";
import AddDepartments from "./components/departments/AddDepartments";
import SiderLayout from "./components/Menu/SiderLayout";
import ListUser from "./components/User/ListUser";
import ListDepartment from "./components/departments/ListDepartment";




function App() {
  return (
      
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="Menu" element={<MenuPage/>} />
        <Route path="CreateTeacher" element={<CreateTeacher/>} />
        <Route path="ListUser" element={<ListUser/>} />
        <Route path="AddProfile" element={<AddProfile />} />
        <Route path="AddClass" element={<AddClass />} />
        <Route path="AddDepartments" element={<ListDepartment />} />
        <Route path="EditProfile" element={<EditProfile />} />
        
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
