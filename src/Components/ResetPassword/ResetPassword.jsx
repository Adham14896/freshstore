import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handlePasswordChange(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(data);
      toast.success(data.message);
      setIsLoading(false);
      navigate("/login");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err.data.response.message);
      setError(err.data.response.message);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .matches(/^[A-Z]\w/, "Password must contains at least one capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be 25 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handlePasswordChange,
  });

  return (
    <>
      <div className="w-1/2 mx-auto pt-10">
        <form onSubmit={formik.handleSubmit} className="pt-10">
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
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New password
            </label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              className="p-4 mb-4 text-sm text-red-800  rounded-lg bg-red-50  dark:text-red-400"
              role="alert"
            >
              {formik.errors.newPassword}
            </div>
          )}
          {isLoading ? (
            <button
              disabled={isLoading}
              className="text-white bg-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-white hover:text-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:border border-green-500 transition-colors"
            >
              Verify
            </button>
          )}
        </form>
      </div>
    </>
  );
}
