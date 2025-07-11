import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal per item
  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity: quantity + 1 }));
  };

  const handleDecrement = (name, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ name, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(name));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} width="100" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Price: {item.cost}</p>
                  <p>Subtotal: ${calculateItemSubtotal(item)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.name, item.quantity)}>+</button>
                  </div>
                  <button onClick={() => handleRemove(item.name)} className="remove-btn">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotalAmount()}</h3>
          <div className="cart-actions">
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;