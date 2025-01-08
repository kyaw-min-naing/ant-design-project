import React from "react";
import "../styles/Home.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-title">
        <h1>
          <i>Start Shopping on MyShop today!</i>
        </h1>
      </div>
      <div className="home-para">
        <p>Consider the Product Page to see the produt lists.</p>
      </div>
      <div className="home-product-btn">
        <Button>
          <Link to="/products">ProductPage</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
