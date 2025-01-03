import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "../context/store";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomePage from "../Pages/HomePage";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/products"
        element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/cart"
        element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
