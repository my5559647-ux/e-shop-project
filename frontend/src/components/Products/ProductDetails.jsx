import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url, server } from "../../server";
import { useSelector, useDispatch } from "react-redux";
import Ratings from "./Ratings";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import ProductCard from "../Route/ProductCard/ProductCard";
import RelatedProducts from "./RelatedProducts";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [shop, setShop] = useState(null);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const allProducts = useSelector((state) => state.products.allProducts);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.shopId) {
      axios.get(`${server}/seller/get-shop-info/${data.shopId}`).then((res) => {
        setShop(res.data.shop);
      });
    }
  }, [data?.shopId]);

  useEffect(() => {
    const productId = data?._id || data?.id;
    if (wishlist && wishlist.find((item) => item._id === productId || item.id === productId)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 1 ? count - 1 : 1);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shopId;
      await axios.post(`${server}/conversation/create-new-conversation`, {
        groupTitle, userId, sellerId,
      }).then((res) => {
        navigate(`/inbox?${res.data.conversation._id}`);
      });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addCartToHandler = (productId) => {
    const idToUse = productId || data?._id || data?.id;
    const isItemExists = cart && cart.find((i) => i._id === idToUse || i.id === idToUse);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  const totalReviewsLength = allProducts?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;
  const totalRatings = allProducts?.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0), 0) || 0;
  const averageRating = totalReviewsLength > 0 ? (totalRatings / totalReviewsLength).toFixed(1) : 0;

  const productImages =
    data?.images ||
    data?.image_Url?.map((item) => item.url) ||
    data?.image ||
    [];

  const productTitle = data?.name || data?.title || "Product";
  const productDescription = data?.description || data?.shortDescription || "";
  const discountPrice = data?.discountPrice || data?.discount_price || data?.price || 0;
  const originalPrice = data?.originalPrice || data?.price || data?.original_price || null;

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] min-h-screen py-5`}>
          <div className="w-full flex flex-col 800px:flex-row justify-between gap-10">
            {/* Left: Images */}
            <div className="w-full 800px:w-[47%]">
              <img src={`${productImages[select]}`} alt="" className="w-full h-[500px] object-contain" />
              <div className="flex gap-3 mt-4">
                {productImages?.map((img, index) => (
                  <div key={index} className={`${select === index ? "border-2 border-red-500" : ""} cursor-pointer`} onClick={() => setSelect(index)}>
                    <img src={`${img}`} alt="" className="h-[100px] object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="w-full 800px:w-[47%] pt-5">
              <h1 className={`${styles.productTitle}`}>{productTitle}</h1>
              <p className="mt-3">{productDescription}</p>
              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>${discountPrice}</h4>
                <h3 className={`${styles.price}`}>{originalPrice ? originalPrice + "$" : null}</h3>
              </div>

              <div className="flex items-center mt-12 justify-between">
                <div>
                  <button className="bg-teal-500 text-white font-bold rounded-l px-4 py-2" onClick={decrementCount}>-</button>
                  <span className="bg-gray-200 px-4 py-[11px]">{count}</span>
                  <button className="bg-teal-500 text-white font-bold rounded-r px-4 py-2" onClick={incrementCount}>+</button>
                </div>
                {click ? <AiFillHeart size={22} color="red" onClick={() => removeFromWishlistHandler(data)} /> : <AiOutlineHeart size={22} onClick={() => addToWishlistHandler(data)} />}
              </div>

              <div className={`${styles.button} mt-6 rounded h-11`} onClick={() => addCartToHandler(data._id || data.id)}>
                <span className="text-white">Add to cart <AiOutlineShoppingCart className="ml-1" /></span>
              </div>
            </div>
          </div>

          <ProductDetailsInfo data={data} allProducts={allProducts} totalReviewsLength={totalReviewsLength} averageRating={averageRating} shop={shop} />

          <RelatedProducts category={data?.category} excludeId={data?._id || data?.id} />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({ data, allProducts, totalReviewsLength, averageRating, shop }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-5 rounded mt-10">
      <div className="w-full flex justify-between border-b pb-2">
        {["Product Details", "Product Reviews", "Seller Information"].map((tab, idx) => (
          <h5 key={idx} className={`cursor-pointer font-[600] ${active === idx + 1 ? "text-red-500 border-b-2 border-red-500" : ""}`} onClick={() => setActive(idx + 1)}>
            {tab}
          </h5>
        ))}
      </div>
      {active === 1 && <p className="py-2 text-[18px] leading-8">{data.description}</p>}
      {active === 2 && <div className="py-3">{data.reviews.map((item, index) => <div key={index} className="flex my-2"> {/* Reviews Content */ } </div>)}</div>}
      {active === 3 && shop && <div className="p-5"> {/* Seller Info Content */ } </div>}
    </div>
  );
};

export default ProductDetails;