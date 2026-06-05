import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../../redux/actions/wishlist";
import { addToWishlist } from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart.js";
import Ratings from "../../Products/Ratings.jsx";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const productId = data.id || data._id;
  const imageUrl =
    data?.image_Url?.[0]?.url ||
    data?.images?.[0] ||
    data?.images?.[0]?.url ||
    data?.image ||
    "";

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i.id === productId || i._id === productId)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, productId]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addCartToHandler = (id) => {
    const productId = id || data.id || data._id;
    const isItemExists = cart && cart.find((i) => i.id === productId || i._id === productId);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        {/* URL ko data.id de diya taake undefined khatam ho */}
        <Link to={`/product/${productId}`}>
          <img
            src={imageUrl}
            alt={data?.name || data?.title}
            className="w-full h-[170px] object-contain"
          />
        </Link>

        {/* Shop ID verification (optional fallback handle karne ke liye data.shop._id || data.id kiya) */}
        <Link to={`/shop/preview/${data?.shop?._id || productId}`}>
          <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
        </Link>

        <Link to={`/product/${productId}`}>
          <h4 className="pb-3 font-[500]">
            {(data.name || data.title || "").length > 40
              ? (data.name || data.title).slice(0, 40) + "..."
              : data.name || data.title}
          </h4>

          <div className="flex">
            <Ratings rating={data?.rating || data?.averageRating} />
          </div>

          <div className="py-2 items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h5 className={`${styles.productDiscountPrice} text-[14px]`}>
                {(data?.discount_price || data?.discountPrice || data?.discount)?.toString() ? `${data.discount_price || data.discountPrice || data.discount}$` : ""}
              </h5>
              {(data?.price || data?.originalPrice || data?.priceValue) > 0 && (
                <h4 className={`${styles.price}`}>{data?.price || data?.originalPrice || data?.priceValue}$</h4>
              )}
            </div>

            <span className="ml-2 whitespace-nowrap font-[400] text-[14px] text-[#68d284]">
              {data.total_sell || data.sold || 0} sold
            </span>
          </div>
        </Link>

        {/* Icons */}
        <div className="absolute right-2 top-5 flex flex-col gap-3">
          {/* Wishlist Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            {click ? (
              <AiFillHeart
                size={20}
                onClick={() => removeFromWishlistHandler(data)}
                color="red"
                title="Remove from wishlist"
                className="cursor-pointer"
              />
            ) : (
              <AiOutlineHeart
                size={20}
                onClick={() => addToWishlistHandler(data)}
                color="#fff"
                title="Add to wishlist"
                className="cursor-pointer"
              />
            )}
          </div>

          {/* Quick View Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            {/* data.id pass kiya takay modal me sahi data show ho */}
            <AiOutlineEye
              size={20}
              onClick={() => setOpen(true)}
              color="#fff"
              title="Quick view"
              className="cursor-pointer"
            />
          </div>

          {/* Add to Cart Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            <AiOutlineShoppingCart
              size={22}
              onClick={() => addCartToHandler(data.id)}
              color="#fff"
              title="Add to cart"
              className="cursor-pointer"
            />
          </div>
        </div>

        
        {/* Product Details Modal */}
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;