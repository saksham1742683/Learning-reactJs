import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotal } from "../features/cart/cartSlice";

const Payment = () => {
 const  totalCartValue = useSelector(selectCartTotal);
  return (
    <div>
      <p>Total amount is : {totalCartValue}</p>
    </div>
  );
};

export default Payment;
