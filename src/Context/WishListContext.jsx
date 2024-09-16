import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const WishListContext = createContext();

function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);
  const { userData } = useContext(UserContext);
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    getUserWishList();
  }, []);

  useEffect(() => {
    if (userData) {
      getUserWishList();
    } else {
      setWishList(null);
    }
  }, [userData]);

  async function addToWishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      );
      setWishList(data.data);
      getUserWishList();

      console.log(data);

      toast.success(data.message, {
        position: "top-center",
        duration: 3000,
      });

      console.log(wishList);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  async function deleteFromWishList(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers,
        }
      );

      setWishList(data.data);
      await getUserWishList();

      toast.success("Product has been removed from WishList", {
        icon: "🗑️",
        duration: 2000,
        position: "top-center",
        style: {
          background: "#ff4444",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserWishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers,
        }
      );
      setWishList(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  function isProductInWishList(productId) {
    return wishList.some((item) => item.id === productId);
  }

  return (
    <WishListContext.Provider
      value={{
        deleteFromWishList,
        isProductInWishList,
        addToWishList,
        wishList,
        setWishList,
        getUserWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export default WishListContextProvider;
