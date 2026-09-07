import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EmployeeDashPage from "./pages/EmployeeDashPage";
import AdminDashPage from "./pages/AdminDashPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTaskPage from "./pages/CreateTaskPage";
import Navbar from "./components/Navbar";

export default function App () {
  return (
    <>
    <Toaster position="top-center" />
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/employee-dashboard" element={
        <ProtectedRoute allowedRole={"employee"} >
          <EmployeeDashPage/>
        </ProtectedRoute>
        }/>
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRole={"admin"}>
            <AdminDashPage/>
        </ProtectedRoute>
        }/>
        <Route path="/create-task" element={<CreateTaskPage/>}/>
    </Routes>
    </>
  )
}