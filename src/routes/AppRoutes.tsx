import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomePage from "../Pages/HomePage";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      login();
    } else {
      logout();
    }
  }, [login, logout]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/products"
        element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/cart"
        element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
