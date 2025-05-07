import './styles/global.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './pages/Register';
import AddPet from './pages/AddPet';
import CreateAdmin from './pages/CreateAdmin';
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import PetDetails from './components/PetDetails';
import AdoptPage from './pages/AdoptPage';

function App() {
  const location = useLocation();
  const { loading } = useContext(AuthContext);
  const hideNavbar = ['/login', '/register'].includes(location.pathname);
  if (loading) return null;


  return (
<>
      {!hideNavbar && <Navbar />}
      <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={
            <ProtectedRoute allowedRoles={["user"]}>
            <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
            <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/admin/add-pet" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddPet/>
            </ProtectedRoute>
          } />
          <Route path="/admin/add-admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateAdmin />
            </ProtectedRoute>
          } />
        <Route path="/pets/:id" element={
          <ProtectedRoute allowedRoles={["admin","user"]}>
            <PetDetails />
          </ProtectedRoute>
        } />
        <Route path="/adopt/:id" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <AdoptPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App;
