import { useContext } from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function RecentProducts({ product }) {
  const { addToCart } = useContext(CartContext);
  const { deleteFromWishList, addToWishList, wishList } =
    useContext(WishListContext);
  const isWishListed = wishList?.some((item) => item.id === product.id);

  function handleWishClick() {
    if (!isWishListed) {
      addToWishList(product.id);
    } else if (isWishListed) {
      deleteFromWishList(product.id);
    }
  }

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/6 product border rounded-md px-2 py-2 mx-3">
        <div>
          <Link to={`/productdetails/${product.id}`}>
            <div>
              <img
                loading="lazy"
                src={product.imageCover}
                className="w-full"
                alt={product.title}
              />
            </div>
            <h2 className="mt-2 text-sm font-medium text-green-500">
              {product.category.name}
            </h2>
            <h3>{product.title.split(" ").splice(0, 2).join(" ")}</h3>
            <div className="flex justify-between mx-2">
              <h3>{product.price} EGP</h3>
              <h3>
                <i className="fa-solid fa-star mx-2 text-[#FAC112]"></i>
                {product.ratingsAverage}
              </h3>
            </div>
          </Link>
        </div>
        <div className="py-2 flex justify-between items-center btns px-2">
          <button
            onClick={() => addToCart(product.id)}
            className="w-3/4 rounded-md btn p-1 bg-green-500 text-white hover:text-green-500 font-medium hover:bg-white hover:border duration-500 hover:border-green-500 transition-colors"
          >
            Add To Cart
          </button>
          <i
            onClick={handleWishClick}
            className={`fa-solid text-xl transition-colors duration-700 fa-heart ${
              isWishListed ? "text-red-600" : "hover:text-red-600"
            } `}
          ></i>
        </div>
      </div>
    </>
  );
}
