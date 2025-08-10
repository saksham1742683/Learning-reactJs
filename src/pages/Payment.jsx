import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../features/cart/cartSlice";

const Payment = () => {
  const totalCartValue = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all details before proceeding.");
      return;
    }

    if (form.paymentMethod === "cod") {
      alert(`Order placed! Total: ₹${totalCartValue} (Cash on Delivery)`);
      // Further COD logic here
      return;
    }

    // For online payments
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Failed to load payment gateway. Please try again later.");
      return;
    }

    const options = {
      key: "rzp_live_HSedkPpLdin06f", // <-- quotes added
      amount: totalCartValue * 100, // Amount in paise (₹)
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        // You can send payment confirmation & order details to your backend here
      },
      modal: {
        ondismiss: function () {
          alert("Payment popup closed. You can try again.");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Billing Details */}
      <div className="mb-4">
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        ></textarea>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block font-medium">Payment Method</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Credit/Debit Card</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="mb-4">
        <p className="text-lg font-semibold">Total Amount: ₹{totalCartValue}</p>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
