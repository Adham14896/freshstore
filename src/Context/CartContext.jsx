import axios from "axios";
import { useEffect, createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";
import { WishListContext } from "./WishListContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cart, setCart] = useState(null);
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserWishList } =
    useContext(WishListContext);
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      );

      console.log(data);
      setCart(data);

      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCheckout(shippingAddress) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=${window.location.origin}`,
        {
          shippingAddress,
        },

        {
          headers,
        }
      );
      console.log(data);
      window.location.href = data?.session.url;
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );

      setCart(data);
      toast.success("Product has been removed!", {
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

  async function updateProductCount(productId, count) {
    if (count > 0) {
      try {
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          {
            count,
          },
          {
            headers,
          }
        );

        setCart(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      deleteProduct(productId);
    }
  }

  async function getCart() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers,
      }
    );
    // console.log(data);
    setCart(data);
    console.log(cart);
  }

  useEffect(() => {
    if (userData) {
      getCart();
      getUserWishList();
    } else {
      setCart(null);
    }
  }, [userData]);

  return (
    <CartContext.Provider
      value={{
        handleCheckout,
        deleteProduct,
        updateProductCount,
        addToCart,
        getCart,
        cart,
        setCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
