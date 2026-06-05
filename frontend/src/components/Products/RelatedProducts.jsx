import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";

const RelatedProducts = ({ category, excludeId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const allProducts = useSelector((state) => state.products.allProducts || []);

  useEffect(() => {
    if (!category) return;

    const localRelated = allProducts.filter((product) => {
      const productCategory = product.category || product.categoryName || product.category_type;
      const productId = product._id || product.id;
      return (
        productCategory === category &&
        productId !== excludeId &&
        productCategory !== undefined
      );
    });

    if (localRelated.length > 0) {
      setRelatedProducts(localRelated.slice(0, 8));
      return;
    }

    const fetchRelatedProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${server}/product/related`, {
          params: { category, exclude: excludeId },
        });

        setRelatedProducts(data.products || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load related products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, excludeId, allProducts]);

  if (!category) {
    return null;
  }

  return (
    <div className="w-full mt-10">
      <h3 className="text-[25px] font-[600] border-b pb-2">Related Product</h3>

      {loading && <p className="mt-4">Loading related products...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:gap-[30px] mb-12 mt-5">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <ProductCard data={product} key={product._id} />
          ))
        ) : (
          !loading && (
            <p className="text-gray-500">No related products available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
