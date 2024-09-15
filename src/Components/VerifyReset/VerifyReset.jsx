import { useState } from "react";
import style from "./VerifyReset.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Reset code is required")
      .min(3, "Reset code must be max of 10 numbers")
      .max(10, "Reset code must be max of 10 numbers"),
  });

  async function handleResetCode(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(data);
      toast.success("Verifying Success");
      navigate("/resetpassword");
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleResetCode,
  });

  return (
    <>
      <div className="w-1/2 mx-auto">
        <h1>Verify reset code</h1>
        <form onSubmit={formik.handleSubmit} className="pt-10">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reset code
            </label>
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div
              className="p-4 mb-4 text-sm text-red-800  rounded-lg bg-red-50  dark:text-red-400"
              role="alert"
            >
              {formik.errors.resetCode}
            </div>
          )}
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800  rounded-lg bg-red-50  dark:text-red-400"
              role="alert"
            >
              {error}
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
