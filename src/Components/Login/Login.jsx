import { useContext, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData, verifyUser, userId } = useContext(UserContext);
  const { getCart } = useContext(CartContext);
  const { getUserWishList } = useContext(WishListContext);
  async function handleLogin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      localStorage.setItem("userToken", data.token);

      verifyUser();

      navigate("/");
      setUserData(data.token);

      localStorage.setItem("userId", userId);
      getCart();
      getUserWishList();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email required")
      .lowercase()
      .trim(),
    password: Yup.string()
      .matches(/^[A-Z]\w/, "Password must contains at least one capital letter")
      .min(8, "Password must be at least 8 characters long")
      .max(25, "Password must be 25 characters max")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="w-1/2 pt-8 mx-auto">
        <h1 className="text-3xl font-bold text-center">Login Now</h1>
        <form onSubmit={formik.handleSubmit} className="py-10">
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800  rounded-lg bg-red-50  dark:text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800  rounded-lg bg-red-50  dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-4 mb-4 text-sm text-red-800  rounded-lg bg-red-50  dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          )}
          {isLoading ? (
            <button
              disabled={isLoading}
              type="button"
              className="text-white bg-green-500  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-white hover:text-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:border border-green-500 transition-colors"
            >
              Login
            </button>
          )}
        </form>
        <div className="text-center flex flex-col">
          <p className="text-gray-500 text-lg"> {`Don't have account?`}</p>
          <Link className="text-green-500 text-base" to="/register">
            Create an account
          </Link>
          <Link className="text-green-500 text-center" to="/forgotpassword">
            Forgot password?
          </Link>
        </div>
      </div>
    </>
  );
}
