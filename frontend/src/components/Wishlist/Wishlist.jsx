import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  
  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };

  // Wishlist ki total price calculate karne ka logic
  const totalWishlistPrice = wishlist ? wishlist.reduce((acc, item) => {
    const itemPrice = item?.discount_price ? item.discount_price : item?.price;
    return acc + itemPrice;
  }, 0) : 0;

  return (
    <div className='fixed top-16 right-4 h-[85%] w-80 bg-white flex flex-col justify-between shadow-xl rounded-lg overflow-hidden z-50 border border-[#00000014]'>
      
      {/* Upper Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Close Button */}
        <div className='flex w-full justify-end pt-3 pr-3 shrink-0'>
          <RxCross1 size={20} className='cursor-pointer text-[#000000a3] hover:text-black' onClick={() => setOpenWishlist(false)} />
        </div>

        {/* Heading */}
        <div className='flex items-center p-3 border-b shrink-0'>
          <AiOutlineHeart size={22} className="text-[#d02222]" />
          <h5 className='pl-2 text-[16px] font-[600] text-[#333]'>
            {wishlist ? wishlist.length : 0} Items Saved
          </h5>
        </div>

        {/* Wishlist Items List (Scrollable Area) */}
        <div className='flex-1 overflow-y-auto px-2 py-1 custom-scrollbar'>
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <CartSingle 
                key={index} 
                data={item}  
                removeFromWishlistHandler={removeFromWishlistHandler} 
                addToCartHandler={addToCartHandler}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col pt-10">
              <h5 className="text-[#00000073] font-[500]">Wishlist is empty!</h5>
            </div>
          )}
        </div>
      </div>

      {/* New Checkout and Total Price Section */}
      {wishlist && wishlist.length > 0 && (
        <div className="p-4 border-t bg-gray-50 shrink-0">
          {/* Subtotal Display */}
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-sm font-medium text-gray-600">Subtotal:</span>
            <span className="text-base font-bold text-[#d02222]">US${totalWishlistPrice}</span>
          </div>
          
          {/* Checkout Action Button */}
          <Link to="/checkout" onClick={() => setOpenWishlist(false)}>
            <div className="h-[45px] flex items-center justify-center w-full bg-[#e44343] hover:bg-[#cc3636] transition-colors rounded-[6px] shadow-sm cursor-pointer">
              <h1 className="text-white text-[15px] font-[600]">
                Checkout Wishlist (US${totalWishlistPrice})
              </h1>
            </div>
          </Link>
        </div>
      )}
      
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  
  const priceToShow = data?.discount_price ? data.discount_price : data?.price;
  const totalPrice = priceToShow * value;

  return (
    <div className='border-b last:border-none px-2 py-3 hover:bg-gray-50 transition-colors rounded-md my-1'>
      <div className='w-full flex items-center gap-3'>
        <RxCross1 
          className="cursor-pointer text-gray-400 hover:text-red-500 shrink-0" 
          size={16}
          onClick={() => removeFromWishlistHandler(data)} 
        />
        
        <img
          src={data?.image_Url && data?.image_Url[0]?.url}
          alt=''
          className='w-[60px] h-[60px] object-contain rounded-md bg-white border border-gray-100 shrink-0'
        />
        
        {/* Product Info */}
        <div className='flex-1 min-w-0'>
          <h1 className='text-[13px] font-semibold text-gray-800 leading-tight truncate-2-lines pr-1'>
            {data.name}
          </h1>
          <h4 className='text-xs text-gray-400 mt-0.5'>
            ${priceToShow} x {value}
          </h4>
          <h4 className='text-[13px] font-bold text-[#d02222] pt-0.5'>
            US${totalPrice}
          </h4>
        </div>

        {/* Add To Cart Icon Button */}
        <div className="shrink-0 pl-1">
          <div 
            className="p-2 bg-blue-50 hover:bg-blue-100 text-[#475ad2] rounded-full transition-colors cursor-pointer"
            title="Add to cart" 
            onClick={() => addToCartHandler(data)}
          >
            <BsCartPlus size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;