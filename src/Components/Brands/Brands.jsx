import React, { useState } from "react";
import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 30000,
    select: (data) => data?.data.data,
  });

  console.log(data);

  return (
    <>
      <div className="mt-10">
        <h1 className="font-bold text-2xl">Brands</h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {data ? (
            data.map((brand) => (
              <div key={brand._id} className="category w-full p-5 lg:w-1/5">
                <div className="overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full category-img h-[300px]"
                  />
                </div>
                <h2 className="text-lg font-medium">{brand.name}</h2>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}
