import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import mastercard from "../../assets/images/mastercard.svg";
import visa from "../../assets/images/visa.svg";
import paypal from "../../assets/images/paypal.svg";
import skrill from "../../assets/images/skrill.svg";
export default function Footer() {
  const { userData } = useContext(UserContext);

  return (
    <>
      {userData && (
        <footer className="bg-gray-200">
          <div className="p-4 h-[45vh] flex flex-col gap-10">
            <div className="w-full">
              <h1 className="font-semibold text-2xl py-5">
                Subscribe to our newsletter
              </h1>
              <div className="flex gap-3">
                <input
                  className="w-3/4  p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none ring-green-500 transition-shadow duration-500"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="w-1/6 p-3 bg-green-500 text-white rounded-lg hover:bg-white hover:text-green-500 transition-colors hover:border border-green-500">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 flex gap-4 items-center">
                <h2 className="font-semibold text-2xl">Payment Partners</h2>
                <img className="w-14" src={mastercard} alt="mastercard" />
                <img className="w-14" src={paypal} alt="paypal" />
                <img className="w-14" src={visa} alt="visa" />
                <img className="w-14" src={skrill} alt="skrill" />
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
