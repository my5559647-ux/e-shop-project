import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../Route/ProductCard/ProductCard";
import { productData } from "../../static/data";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.products || { allProducts: [] });

  const currentProducts = allProducts && allProducts.length > 0 ? allProducts : productData;
  const shopProducts = currentProducts?.filter((product) => product?.shop?.name === decodeURIComponent(id));

  return (
    <div className="w-full">
      {/* Tabs Header with Red Bottom Border for Active State */}
      <div className="flex w-full items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center gap-10">
          <div className="flex items-center cursor-pointer" onClick={() => setActive(1)}>
            <h5 className={`text-[20px] font-[600] ${active === 1 ? "text-red-500 border-b-2 border-red-500 pb-2" : "text-[#333] pb-2"}`}>
              Shop Products
            </h5>
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => setActive(2)}>
            <h5 className={`text-[20px] font-[600] ${active === 2 ? "text-red-500 border-b-2 border-red-500 pb-2" : "text-[#333] pb-2"}`}>
              Shop Reviews
            </h5>
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => setActive(3)}>
            <h5 className={`text-[20px] font-[600] ${active === 3 ? "text-red-500 border-b-2 border-red-500 pb-2" : "text-[#333] pb-2"}`}>
              Shop Info
            </h5>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-8">
        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shopProducts && shopProducts.map((i, index) => <ProductCard data={i} key={index} isShop={true} />)}
            {shopProducts.length === 0 && <p className="text-center w-full py-10">No products found.</p>}
          </div>
        )}

        {active === 2 && (
          <div className="text-center py-10 text-[18px]">
            No reviews yet for this shop.
          </div>
        )}

        {active === 3 && (
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="text-[18px] font-bold">About the Shop</h4>
            <p className="mt-2 text-gray-600">This is the seller information section where you can display details about the shop owner, joining date, and total sales.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;