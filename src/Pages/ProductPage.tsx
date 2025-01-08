import React, { useEffect, useState } from "react";
import { useCartStore } from "../context/cartStore";
import { Button, Card, Spin, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../styles/Product.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const { Meta } = Card;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
        message.error("Failed to load prodcts. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    message.success(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="product-page">
        <Spin size="large" tip="Loading producs..." />
      </div>
    );
  }

  return (
    <div className="product-page">
      <h1>Latest Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            cover={<img alt={product.title} src={product.thumbnail} />}
          >
            <Meta
              title={product.title}
              description={`Price: $${product.price}`}
            />
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
