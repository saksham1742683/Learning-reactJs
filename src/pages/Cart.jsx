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

  // console.log(totalValue);

  return (
    <div className="px-3">
      <h3 className="font-bold text-3xl">CartItems</h3>
      <div className="">
        {cartItems.map((product, index) => (
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
                onClick={() => dispatch(removeFromCart(product))}
              >
                -
              </button>
              <p> {product.quantity}</p>
              <button
                className="bg-blue-300 px-2 rounded-2xl font-extrabold"
                onClick={() => dispatch(addToCart(product))}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 font-bold">
        Total cart Value is : {totalVal.toFixed(2)}
      </div>
      <div>
        GO to checkOut Page:{" "}
        <button className="bg-red-400 px-3 py-1 m-2" >
          <Link to={'/payment'} >Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
