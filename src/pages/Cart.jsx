import React, { useContext } from "react";
import { CartContext } from "../NOTIMP/context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, addToCart } =
    useContext(CartContext);

  const totalValue = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // console.log(totalValue);

  return (
    <div className="px-3">
      <h3 className="font-bold text-3xl">CartItems</h3>
      <div className="">
        {cart.map((product, index) => (
          <div
            key={index}
            className="border shadow-md p-3 mb-2 flex justify-around"
          >
            <img src={product.image} className=" h-10 w-10" alt="" />
            <p> Price is : {product.price}</p>
            <p>
              {" "}
              Subtotal is : ₹{(product.quantity * product.price).toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="bg-green-300 px-2 rounded-2xl font-extrabold "
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
              <p> {product.quantity}</p>
              <button
                className="bg-blue-300 px-2 rounded-2xl font-extrabold"
                onClick={() => addToCart(product)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 font-bold">
        Total cart Value is : {totalValue.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
