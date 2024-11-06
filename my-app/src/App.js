import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProfile from "./components/Profile/AddProfile";
import EditProfile from "./components/Profile/EditProfile";
import LoginForm from "./components/FormLogin/LoginForm";
import AddClass from "./components/Classes/AddClass";
import MenuPage from "./components/Menu/MenuPage";
import AddDepartments from "./components/departments/AddDepartments";
import SiderLayout from "./components/Menu/SiderLayout";
import ListUser from "./components/User/ListUser";
import ListDepartments from "./components/departments/ListDepartments";
import EditUser from "./components/User/EditUser";
import CreateUser from "./components/User/CreateUser";
import ListClass from "./components/Classes/ListClass";




function App() {
  return (
      
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="Menu" element={<MenuPage/>} />
        <Route path="CreateUser" element={<CreateUser/>} />
        <Route path="ListUser" element={<ListUser/>} />
         <Route path="EditProfile" element={<EditProfile />} />
        <Route path="EditUser" element={<EditUser />} />
        <Route path="AddProfile" element={<AddProfile />} />
        <Route path="AddClass" element={<AddClass />} />
        <Route path="ListClass" element={<ListClass/>} />
        <Route path="AddDepartments" element={<AddDepartments />} />
         <Route path="ListDepartments" element={<ListDepartments/>} />
       
       
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
