import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i.id === data.id)) setClick(true);
  }, [wishlist, data.id]);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i.id === id);
    if (isItemExists) toast.error("Item already in cart!");
    else {
      dispatch(addToCart({ ...data, qty: count }));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center p-4">
      <div className="w-full 800px:w-[60%] h-[90vh] overflow-y-scroll bg-white rounded-lg shadow-2xl relative p-8">
        <AiOutlineClose size={30} className="absolute right-3 top-3 cursor-pointer z-50" onClick={() => setOpen(false)} />

        {/* --- MAIN SECTION --- */}
        <div className="block w-full 800px:flex gap-10 pt-5 border-b pb-8">
          <div className="w-full 800px:w-[50%]">
            <img src={data.image_Url?.[0]?.url} alt={data.name} className="w-full object-contain h-[350px] rounded-lg shadow-sm" />
            <Link to={`/shop/preview/${data.shop?._id}`} className="flex mt-6 p-4 border rounded-lg bg-gray-50 items-center hover:bg-gray-100 transition shadow-sm">
              <img src={data.shop?.shop_avatar?.url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} alt="Shop Logo" className="w-[60px] h-[60px] rounded-full mr-4 object-cover" />
              <div>
                <h3 className="font-bold text-[18px] text-blue-600 hover:underline">{data.shop?.name || "Amazon Ltd"}</h3>
                <h5 className="text-gray-500">{data.shop?.ratings || "4.2"} Ratings</h5>
              </div>
            </Link>
          </div>

          <div className="w-full 800px:w-[50%]">
            <h1 className="text-[25px] font-[600] text-[#333]">{data.name}</h1>
            <p className="mt-4 text-[#555] leading-[1.8] text-[16px]">
              {data.description ? data.description : "High-precision digital scale that tracks BMI, body fat, and muscle mass via smartphone app."}
            </p>
            <div className="flex pt-4">
              <h4 className={`${styles.productDiscountPrice}`}>{data.discount_price}$</h4>
              <h3 className={`${styles.price}`}>{data.price ? data.price + "$" : null}</h3>
            </div>
            <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`} onClick={() => addToCartHandler(data.id)}>
              <span className="text-[#fff]">Add to cart <AiOutlineShoppingCart className="ml-1" /></span>
            </div>
          </div>
        </div>

        {/* --- TABS SECTION --- */}
        <div className="w-full mt-12 border-t pt-8">
          <div className="flex gap-10 border-b pb-2">
            {[ "Product Details", "Product Reviews", "Seller Information" ].map((tab, idx) => (
              <h5 key={idx} onClick={() => setActiveTab(idx + 1)} className={`cursor-pointer font-[600] text-[18px] ${activeTab === idx + 1 ? "text-red-500 border-b-2 border-red-500" : ""}`}>{tab}</h5>
            ))}
          </div>
          <div className="py-6 text-[16px] text-[#444] leading-[1.8]">
            {activeTab === 1 && (
              <div className="space-y-4">
                <p>{data.description || "Specifications and details based on standard model."}</p>
                <div className="space-y-2">
                  <p><strong>RAM:</strong> 6GB / 8GB / 12GB options</p>
                  <p><strong>Storage:</strong> 256GB / 512GB / 1TB options</p>
                  <p><strong>Main Camera:</strong> Dual Camera (48MP + 12MP)</p>
                  <p><strong>Selfie Camera:</strong> 12MP</p>
                  <p><strong>Body Material:</strong> Aluminium/Titanium Alloy</p>
                  <p><strong>Screen Type:</strong> Super Retina XDR OLED</p>
                  <p><strong>Active Noise Cancellation:</strong> Yes, with transparency mode.</p>
                  <p><strong>Colors:</strong> Black Titanium, Natural Titanium, Gold, Silver.</p>
                </div>
              </div>
            )}
            {activeTab === 2 && <p>Customer reviews will be shown here after purchase.</p>}
            {activeTab === 3 && (
              <div className="space-y-2">
                <h3 className="font-[600]">{data.shop?.name || "Amazon Ltd"}</h3>
                <p>Joined on: {data.shop?.createdAt?.slice(0, 10) || "2023-01-15"}</p>
                <p>Verified Seller in Electronics.</p>
                <Link to={`/shop/preview/${data.shop?._id}`}>
                  <button className="bg-black text-white px-4 py-2 mt-2">Visit Shop</button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {console.log("All Products Available:", allProducts)}
        {/* Test Logic */}
{console.log("Is Redux Store Working?", allProducts)}

        {/* --- RELATED PRODUCTS --- */}
        <div className="w-full mt-10">
          <h3 className="text-[20px] font-[600] border-b pb-2">Related Products</h3>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 mt-6">
            {allProducts?.filter(i => i.category === data.category && i.id !== data.id).slice(0, 4).map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>

       {/* --- PROFESSIONAL FOOTER (Video Style) --- */}
<div className="w-full bg-[#4338ca] p-10 text-center mt-12 rounded-b-lg">
  <div className="max-w-[600px] mx-auto">
    <h2 className="text-[22px] font-bold text-white leading-tight">
      Subscribe us for get news events and offers
    </h2>
    <p className="text-[#e0e7ff] mt-2 text-[14px]">
      Join our newsletter to stay updated with our latest collections and exclusive deals.
    </p>
    
    <div className="mt-6 flex justify-center shadow-lg">
      <input 
        type="email" 
        placeholder="Enter your email..." 
        className="w-[300px] p-3 text-black rounded-l-md outline-none border-none" 
      />
      <button className="bg-[#4ade80] hover:bg-[#22c55e] text-black px-8 py-3 font-bold rounded-r-md transition-all duration-300">
        Submit
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;