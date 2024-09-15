import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useProducts(relatedCategoryId) {
  function getProducts() {
    const url = relatedCategoryId
      ? `https://ecommerce.routemisr.com/api/v1/products?limit=8&category=${relatedCategoryId}`
      : `https://ecommerce.routemisr.com/api/v1/products?limit=50`;

    return axios.get(url);
  }

  const response = useQuery({
    queryKey: ["products", relatedCategoryId],
    queryFn: getProducts,
    // gcTime: 1000
    // refetchOnMount: true,
    staleTime: 1000 * 60 * 5, // 5 minutesTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
    select: (data) => data?.data.data,
  });

  return response;
}

export default useProducts;
