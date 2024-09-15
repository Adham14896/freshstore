import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCart, cart, updateProductCount, deleteProduct } =
    useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <h1 className="text-2xl mt-10 py-4">Cart</h1>
      {!cart ? (
        <Spinner />
      ) : (
        <div>
          <div className="relative w-3/4 mx-auto py-10 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left mb-10 rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase">
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.data.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b  dark:border-gray-700 text-black"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-black">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition-colors dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() =>
                            updateProductCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span
                            id="first_product"
                            className="w-14 border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 text-black dark:placeholder-gray-400 text-center  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {product.count}
                          </span>
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full transition-colors focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() =>
                            updateProductCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-black">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteProduct(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="text-xl font-bold my-2 text-black">
                  <td colSpan={10} className="my-2">
                    Total Price
                  </td>
                  <td className="my-2">{cart.data.totalCartPrice} EGP</td>
                </tr>
              </tfoot>
            </table>

            {cart.data.length === 0 ? (
              ""
            ) : (
              <Link
                to="/checkout"
                className="text-white bg-green-500 hover:bg-white hover:text-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:border border-green-500 transition-colors"
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
