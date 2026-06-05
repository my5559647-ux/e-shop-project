import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom"; // Link wrapper component import
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart"; 

const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  
  // Real dynamic data hook listener from redux state layer
  const { cart } = useSelector((state) => state.cart || { cart: [] });

  const removeFromCartHandler = (data) => {
    const itemId = data._id || data.id;
    dispatch(removeFromCart(itemId));
  };

  const subTotal = cart ? cart.reduce((acc, item) => acc + (item.qty || 1) * (item.discountPrice || item.price), 0) : 0;

  return (
    <div 
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-[9999]"
      onClick={() => setOpenCart(false)} // Closes cart sidebar smoothly when user clicks outside
    >
      <div 
        className="fixed top-0 right-0 h-full w-[320px] sm:w-[400px] bg-white flex flex-col justify-between shadow-2xl z-[10000] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevents closing sidebar instantly on inner element clicks
      >
        
        {!cart || cart.length === 0 ? (
          /* ================= EMPTY STATE VIEW ================= */
          <div className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center">
            <div 
              className="absolute top-4 right-4 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200" 
              onClick={() => setOpenCart(false)}
            >
              <RxCross1 size={22} className="text-gray-500 hover:text-red-500" />
            </div>
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <IoBagHandleOutline size={42} className="text-gray-300" />
            </div>
            <h5 className="font-[600] text-[18px] text-gray-700">Your Cart is Empty!</h5>
            <p className="text-gray-400 text-[13px] mt-1 max-w-[240px]">Add items to your cart to start shopping your favorite products.</p>
          </div>
        ) : (
          /* ================= ACTIVE STATE VIEW ================= */
          <>
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header Section with Integrated Corner Cross Button */}
              <div className="flex items-center justify-between p-4 border-b shrink-0 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <IoBagHandleOutline size={24} className="text-emerald-500" />
                  <h5 className="text-[17px] font-[600] text-gray-800">
                    Shopping Cart ({cart.length})
                  </h5>
                </div>
                
                {/* WISH LIST STYLE CLOSE CORNER BUTTON */}
                <div 
                  className="p-2 cursor-pointer hover:bg-gray-200/70 rounded-full transition-all duration-200"
                  onClick={() => setOpenCart(false)}
                >
                  <RxCross1
                    size={20}
                    className="text-gray-600 hover:text-red-500 font-bold"
                  />
                </div>
              </div>

              {/* Scrollable Dynamic Items Container Area */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 custom-scrollbar">
                {cart.map((item, index) => (
                  <CartSingle
                    key={index}
                    data={item}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            {/* Upgraded Bottom Sticky Checkout Area (With Link integration) */}
            <div className="p-4 border-t bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] shrink-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-gray-500 text-[14px] font-[500]">Subtotal Amount:</span>
                <span className="text-gray-900 text-[18px] font-[700]">${subTotal}</span>
              </div>

              {/* Yeh Link user ko /checkout waale naye page par le jayega */}
              <Link to="/checkout" onClick={() => setOpenCart(false)} className="w-full block">
                <button
                  type="button"
                  className="group h-[52px] w-full flex items-center justify-between px-5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-[600] text-[15px] transition-all duration-300 shadow-md shadow-red-500/20 active:scale-[0.98]"
                >
                  <span className="tracking-wide">Proceed To Checkout</span>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg text-[14px] backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <span>USD ${subTotal}</span>
                  </div>
                </button>
              </Link>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty || 1);
  const price = data.discountPrice || data.price;
  const totalPrice = price * value;

  const itemImage = data?.image_Url && data.image_Url[0]?.url 
    ? data.image_Url[0].url 
    : data?.images && data.images[0] 
      ? data.images[0] 
      : "https://via.placeholder.com/150";

  return (
    <div className="p-4 bg-white hover:bg-slate-50/60 transition-colors duration-150">
      <div className="w-full flex items-center justify-between gap-3">
        
        {/* Left Side: Counter Controls */}
        <div className="flex flex-col items-center justify-center bg-gray-100 border border-gray-200/40 rounded-full py-1 px-1.5 shrink-0 shadow-sm">
          <div
            className="bg-red-500 hover:bg-red-600 rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer transition-colors shadow-sm active:scale-90"
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={13} color="#fff" />
          </div>
          <span className="py-[3px] text-[13px] font-bold text-gray-700 w-[18px] text-center">{value}</span>
          <div
            className="bg-white rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer border border-gray-300 shadow-sm active:scale-90"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={13} color="#6b7280" />
          </div>
        </div>

        {/* Dynamic Image Element */}
        <img
          src={itemImage}
          alt={data?.name}
          className="w-[68px] h-[68px] object-contain rounded-xl bg-white border border-gray-100 p-1 shrink-0 shadow-inner"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />

        {/* Info Details Block */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[13px] font-[600] text-gray-800 leading-tight line-clamp-2 pr-1">
            {data?.name}
          </h1>
          <h4 className="font-[400] text-[11px] text-gray-400 mt-1">
            ${price} × {value}
          </h4>
          <h4 className="font-[700] text-[14px] text-red-500 mt-0.5">
            ${totalPrice}
          </h4>
        </div>

        {/* Extreme Right: Row Delete Cross Button */}
        <div className="shrink-0 pl-1">
          <button 
            type="button"
            className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
            onClick={() => removeFromCartHandler(data)}
          >
            <RxCross1 size={16} className="font-bold" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;