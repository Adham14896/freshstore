import { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userData, setUserData, setUserId, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-gray-200 md:fixed top-0 inset-x-0 py-5 px-5 z-50">
        <div className="container flex justify-between items-center text-gray-500">
          <img src={logo} width={120} alt="Logo" />

          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden text-3xl focus:outline-none ml-auto"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } md:flex flex-col md:flex-row items-center md:max-h-none md:opacity-100 space-x-5`}
            >
              {userData && isLoggedIn && (
                <ul className="flex flex-col md:flex-row space-x-2">
                  <li>
                    <NavLink
                      className="transition-colors hover:text-green-500"
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="transition-colors hover:text-green-500"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="transition-colors hover:text-green-500"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="transition-colors hover:text-green-500"
                      to="allorders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Additional Menu Items (Cart, Wishlist, etc.) */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } md:max-h-none md:opacity-100 items-center md:flex flex-col md:flex-row space-x-5`}
          >
            <ul className="flex gap-5 flex-col md:flex-row space-x-2">
              {userData && isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="wishlist">
                      <i className="fa-solid fa-xl transition-colors hover:text-red-500 text-gray-500 fa-heart"></i>
                    </NavLink>
                  </li>
                  <li className="relative">
                    <NavLink
                      className="transition-colors hover:text-green-500"
                      to="cart"
                    >
                      <i className="fa-solid fa-2xl fa-cart-shopping transition-opacity hover:opacity-65 text-green-500"></i>
                    </NavLink>
                    <span className="text-white absolute top-[-4.7px] left-1/2">
                      {cart && userData ? (
                        cart.numOfCartItems
                      ) : (
                        <i className="fas fa-spinner text-sm fa-spin-pulse"></i>
                      )}
                    </span>
                  </li>
                  <li
                    onClick={logOut}
                    className="mx-2 cursor-pointer transition-colors hover:text-green-500 text-gray-400"
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li className="flex flex-col md:flex-row gap-3">
                    <NavLink
                      className="text-gray-400 transition-colors hover:text-green-500"
                      to="login"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      className="text-gray-400 hover:text-green-500"
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              <li className="space-x-2 flex gap-2 items-center text-black">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-linkedin-in"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
