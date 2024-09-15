import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData, getUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  async function getUserOrders(id) {
    const headers = {
      token: localStorage.getItem("userToken"),
    };
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        {
          headers,
        }
      );
      console.log(data);
      setOrders(data?.flatMap((cart) => cart.cartItems));
      console.log(orders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      getUserOrders(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      getUserDetails();
    }
  }, [userData, getUserDetails]);

  const totalPrice = orders?.reduce((acc, order) => acc + order.price, 0);

  function handlePlaceOrder() {
    setOrders(null);
    toast.success("Order has been placed!");
    navigate("/");
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div className="container flex justify-center items-center mx-auto p-10">
            <div className="w-3/4 h-[60vh] overflow-auto">
              <table className="w-full text-sm relative text-left mb-10 rtl:text-right text-black font-medium">
                <thead className="text-xs text-black  uppercase">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Added
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.product.id}>
                      <td className="p-4">
                        <img
                          src={order.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={order.product.title}
                        />
                      </td>
                      <td className="p-4">{order.product.title}</td>
                      <td className="p-4">{order.count}</td>
                      <td className="p-4">{order.price} EGP</td>
                      <td className="p-4">{new Date().toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 w-3/4 mx-auto">
            <p className="text-xl py-4 font-medium w-1/4 text-end">
              Total Price: {totalPrice} EGP
            </p>
            <button
              onClick={handlePlaceOrder}
              className="rounded-md btn p-2 bg-green-500 text-white hover:text-green-500 font-medium hover:bg-white hover:border duration-500 hover:border-green-500 transition-colors"
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
