import React, { useEffect, useState } from "react";
import style from "./Category.module.css";
import axios from "axios";

export default function Category({ category }) {
  return (
    <>
      <div key={category._id} className="category w-full p-5 lg:w-1/5">
        <div className="overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full category-img h-[300px]"
          />
        </div>
        <h2 className="text-lg font-medium">{category.name}</h2>
      </div>
    </>
  );
}
