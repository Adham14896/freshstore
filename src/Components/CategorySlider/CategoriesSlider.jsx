import { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";
export default function CategoriesSlider({ onFilterByCategory }) {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: categories.length / 2,
    slidesToScroll: 2,
    arrows: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1 className="font-bold text-3xl py-3">Categories</h1>
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id} className="my-6">
            <img
              loading="lazy"
              src={category.image}
              className="w-full h-[200px]"
              alt={category.name}
            />
            <h2>{category.name}</h2>
          </div>
        ))}
      </Slider>
    </>
  );
}
