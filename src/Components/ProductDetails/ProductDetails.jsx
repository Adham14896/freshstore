import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Spinner from "../Spinner/Spinner";
import { CartContext } from "../../Context/CartContext";
import useProducts from "../../Hooks/useProducts";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const { addToCart } = useContext(CartContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const { data: relatedPrdoucts, isLoading } = useProducts(
    productDetails.category?._id
  );

  async function getProductDetails(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data);
      setProductDetails(data.data);
      console.log(productDetails);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProductDetails(id);
    window.scrollTo(0, 0);
    console.log(relatedPrdoucts);
  }, [id]);

  return (
    <>
      <h1 className="text-5xl pt-10">ProductDetails</h1>
      <div className="container w-9/12  flex lg:flex-row flex-col items-center py-10">
        <div className="w-full lg:w-1/4 p-4">
          {productDetails.images > 1 ? (
            <Slider {...settings}>
              {productDetails.images?.map((image, i) => (
                <img key={i} src={image} className="w-full" alt="" />
              ))}
            </Slider>
          ) : (
            <img
              src={productDetails.imageCover}
              className="w-full"
              alt={productDetails.title}
              loading="lazy"
            />
          )}
        </div>
        <div className="w-full lg:w-3/4 p-8">
          <div>
            <h2 className="font-bold">{productDetails.title}</h2>
            <p className="my-6 text-gray-500">{productDetails.description}</p>
            <h3>{productDetails.category?.name}</h3>
            <div className="flex justify-between mx-2 px-10 py-5">
              <h3>{productDetails.price} EGP</h3>
              <h3>
                <i className="fa-solid fa-star mx-2 text-[#FAC112]"></i>
                {productDetails.ratingsAverage}
              </h3>
            </div>
            <div className="py-2">
              <button
                onClick={() => addToCart(productDetails.id)}
                className="w-full rounded-md btn p-1 bg-green-500 text-white hover:text-green-500 font-medium hover:bg-white hover:border duration-500 hover:border-green-500 transition-colors "
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <>
        <h1 className="text-3xl">RelatedProducts</h1>
        <div className="flex flex-wrap justify-center items-center p-5 gap-5">
          {!isLoading ? (
            relatedPrdoucts.map((product) => (
              <RelatedProduct key={product.id} product={product} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </>
    </>
  );
}
