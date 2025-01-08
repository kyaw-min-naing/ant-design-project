import React from "react";
import { useCartStore } from "../context/cartStore";
import { Card, Button, List, Typography, message } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "../styles/CartPage.css";

const { Title } = Typography;

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const handleClearCart = () => {
    clearCart();
    message.success("Cart has been cleared!");
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    message.success("Item has been removed from cart");
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Title level={2} className="cart-title">
        Your Shopping Cart
      </Title>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty. Add some products!</p>
        </div>
      ) : (
        <>
          <List
            dataSource={cartItems}
            renderItem={(item) => (
              <Card key={item.id} className="cart-item-card">
                <div className="cart-item-details">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-thumbnail"
                  />

                  <div>
                    <Title level={4} className="cart-item-title">
                      {item.title}
                    </Title>
                    <p className="cart-item-price">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <p className="cart-item-quantity">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => increaseQuantity(item.id)}
                  />
                  <Button
                    type="primary"
                    icon={<MinusOutlined />}
                    onClick={() => decreaseQuantity(item.id)}
                  />
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(item.id)}
                  />
                </div>
              </Card>
            )}
          />
          <div className="cart-summary">
            <Title level={3} className="cart-total">
              Total Amount: ${totalAmount.toFixed(2)}
            </Title>
            <Button
              type="primary"
              danger
              onClick={handleClearCart}
              className="clear-cart-button"
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
