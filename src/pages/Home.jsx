import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {cart , addToCart }  = useContext(CartContext);

  const fakeProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    if (data) {
      setProducts(data);
      setLoading(false);
    }
    console.log(data);
  };

  useEffect(() => {
    // console.log("hello");
    fakeProducts();
  }, []);

  return (
    <div className="px-5">
      <h2 className="font-bold text-2xl mb-4">Products</h2>
      {loading ? (
        <div className="flex justify-center font-bold text-2xl w-full"> Loading ....</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-sky-300 rounded-xl p-4 shadow-md h-80 flex flex-col justify- between"
            >
              <p>{product.title}</p>
              <p>{product.id}</p>
              <img
                src={product.image}
                alt="Image"
                className="w-32 h-32  object-contain"
              />
              <p>{product.price}</p>
              <div className=" flex  gap-4 ">
                <button className=" cursor-pointer px-6 py-2 bg-green-300 text-white font-semibold rounded-l-lg">
                  {" "}
                  Buy now
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className=" cursor-pointer px-6 py-2 bg-orange-300 text-white font-semibold rounded-r-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
