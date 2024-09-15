import React, { useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import Category from "../Category/Category";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.data.data,
  });

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {data ? (
            data.map((category) => (
              <Category category={category} key={category._id} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}
