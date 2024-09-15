import { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { WishListContext } from "../../Context/WishListContext";

import Spinner from "../Spinner/Spinner";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function WishList() {
  const { wishList, getUserWishList, deleteFromWishList } =
    useContext(WishListContext);
  const { userData } = useContext(UserContext);
  const { getCart, addToCart } = useContext(CartContext);

  // console.log(wishList);

  useEffect(() => {
    getUserWishList();
    getCart();
  }, [userData]);

  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl py-4">WishList</h1>
        <div className="w-5/6 mx-auto flex flex-wrap justify-center py-4 gap-5 items-center">
          {wishList ? (
            wishList?.map((item) =>
              item && item.category ? (
                <div
                  className="w-full p-4 md:w-1/2 lg:w-1/6 product"
                  key={item._id}
                >
                  <Link to={`/productdetails/${item._id}`}>
                    <div className="w-full">
                      <img
                        src={item.imageCover}
                        className="w-full"
                        alt={item.title}
                      />
                    </div>

                    <h2 className="mt-2 text-sm font-medium text-green-500">
                      {item.category.name}
                    </h2>
                    <h3>{item.title.split(" ").splice(0, 2).join(" ")}</h3>
                    <div className="flex justify-between py-2 mx-2">
                      <h3>{item.price} EGP</h3>
                      <h3>
                        <i className="fa-solid fa-star mx-2 text-[#FAC112]"></i>
                        {item.ratingsAverage}
                      </h3>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => addToCart(item._id)}
                      className="w-full rounded-md btn p-1 bg-green-500 text-white hover:text-green-500 font-medium hover:bg-white hover:border duration-500 hover:border-green-500 transition-colors"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => deleteFromWishList(item._id)}
                      className="w-full rounded-md btn p-1 bg-red-600 text-white hover:text-red-600 font-medium hover:bg-white hover:border duration-500 hover:border-red-500 transition-colors"
                    >
                      Delete From Wishlist
                    </button>
                  </div>
                </div>
              ) : null
            )
          ) : (
            <>
              <Spinner />
            </>
          )}
        </div>
      </div>
    </>
  );
}
