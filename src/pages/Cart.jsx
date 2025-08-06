import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart,  addToCart } = useContext(CartContext);

  const totalValue = cart.reduce((sum, product)=>sum + (product.price*product.quantity),0);
  

  // console.log(totalValue);

  return (
    <div className="px-3">
      <h3 className="font-bold text-3xl">CartItems</h3>
      <div className="">
        {cart.map((product,index) => (
          <div
            key={index}
            className="border shadow-md p-3 mb-2 flex justify-around"
          >
            <img src={product.image} className=" h-10 w-10" alt="" />
            <p> Price is : {product.price}</p>
            <p> Subtotal is : ₹{(product.quantity*product.price).toFixed(2)}</p>

            <button onClick={() => removeFromCart(product)}>Remove</button>
            <p> quantity is : {product.quantity}</p>

          </div>
        ))}
      </div>
      <div className="mt-6 font-bold">Total cart Value is : {totalValue.toFixed(2)}</div>
    </div>
  );
};

export default Cart;
