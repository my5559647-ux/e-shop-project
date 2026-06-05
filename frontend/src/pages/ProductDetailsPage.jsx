import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { getAllProducts } from "../redux/actions/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    const selected = allProducts.find(
      (item) => item._id === id || item.id === id || String(item._id) === String(id)
    );

    setProduct(selected || null);
  }, [allProducts, id]);

  return (
    <div>
      <Header />
      {isLoading && !product ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      ) : product ? (
        <ProductDetails data={product} />
      ) : (
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-lg text-gray-600">Product not found.</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
