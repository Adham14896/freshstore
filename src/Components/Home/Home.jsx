import { useContext, useEffect, useState } from "react";

import RecentProducts from "../RecentProducts/RecentProducts";
import Spinner from "../Spinner/Spinner";
import CategoriesSlider from "../CategorySlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { CartContext } from "../../Context/CartContext";
import useProducts from "../../Hooks/useProducts";

import { UserContext } from "../../Context/UserContext";

export default function Home() {
  const { getCart } = useContext(CartContext);

  const { verifyUser, getUserDetails, username } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data, isLoading, isError } = useProducts();

  useEffect(() => {
    getCart();
    getUserDetails();
    verifyUser();
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, data]);

  return (
    <>
      <div className="mt-10 ps-5">
        <h1 className="font-semibold text-3xl ms-3">Welcome {username}</h1>
      </div>
      <MainSlider />
      <CategoriesSlider />
      <div className="flex justify-center py-4">
        <input
          type="text"
          className="py-4 border-slate-400 px-2 w-3/4 border rounded-md outline-none focus:ring-2 ring-green-500 transition-shadow duration-500"
          placeholder="Search products..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <h1 className="text-5xl font-bold py-8 ">Recent Products</h1>
      {!isLoading ? (
        <div className="flex flex-wrap justify-center py-5 gap-y-8 gap-x-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <RecentProducts key={product.id} product={product} />
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
      {isError && (
        <div className="flex justify-center items-center h-1/3 mx-auto pt-6">
          <div className="bg-red-600 p-5 w-full">Error fetching products</div>
        </div>
      )}
    </>
  );
}
