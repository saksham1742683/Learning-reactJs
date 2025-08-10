import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartTotal,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalVal = useSelector(selectCartTotal);

  // const totalValue = cartItems.reduce(
  //   (sum, product) => sum + product.price * product.quantity,
  //   0
  // );

  return (
    <div className="px-3 bg-gray-100">
      <h3 className="font-bold text-3xl   ">CartItems</h3>
      <button
        onClick={() => dispatch(clearCart())}
        className=" px-2 py-1 rounded-lg my-5 bg-red-500 hover:bg-red-600 text-white font-bold"
      >
        {" "}
        Clear Cart
      </button>
      <div className="">
        {cartItems.map((product, index) => (
          <div
            key={index}
            className="border-gray-200 rounded-lg shadow-md p-3 mb-2 flex justify-around"
          >
            <img src={product.image} className=" h-10 w-10" alt="" />
            <p className="text-emerald-600 font-medium">
              {" "}
              Price is : {product.price}
            </p>
            <p className="text-gray-700">
              {" "}
              Subtotal is : ₹{(product.quantity * product.price).toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 rounded-2xl font-extrabold "
                onClick={() => dispatch(removeFromCart(product))}
              >
                -
              </button>
              <p className="bg-emerald-500 text-white p-1 rounded-lg">
                {" "}
                {product.quantity}
              </p>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 rounded-2xl font-extrabold"
                onClick={() => dispatch(addToCart(product))}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-gray-900 mt-6 font-bold">
        Total cart Value is : {totalVal.toFixed(2)}
      </div>
      <div>
        GO to checkOut Page:{" "}
        <button className="bg-amber-500 hover:bg-amber-600 px-3 py-1 m-2 text-white font-semibold rounded">
          <Link to={"/payment"}>Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
