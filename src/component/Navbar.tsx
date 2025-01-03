import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useCartStore } from "../context/store";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyShop</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li className="navbar-cart">
          <Link to="/cart">
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined className="cart-icon" />
            </Badge>{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
