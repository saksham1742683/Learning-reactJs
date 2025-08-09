import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const search = useSelector((state) => state.search.value);

  const fakeProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    if (data) {
      setProducts(data);
      setLoading(false);
    }
    console.log("log from home 20 ", data);
  };

  useEffect(() => {
    fakeProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="px-5">
      <h2 className="font-bold text-2xl mb-4">Products</h2>
      {loading ? (
        <div className="flex justify-center font-bold text-2xl w-full">
          {" "}
          Loading ....
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="border border-sky-300 rounded-xl p-4 shadow-md h-80 flex flex-col justify-between"
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
                  onClick={() => dispatch(addToCart(product))}
                  className=" cursor-pointer px-6 py-2 bg-orange-300 text-white font-semibold rounded-r-lg  hover:scale-110
             active:scale-95"
                >
                  {cartItems.some((item) => item.id === product.id)
                    ? "Add More"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center my-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1 ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
