import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    const isItemExists = cart && cart.find((i) => i._id === item._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (item.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...item, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  if (!data) return null;

  const imageUrl =
    data?.images?.[0]?.url ||
    data?.images?.[0] ||
    "https://via.placeholder.com/300";

  return (
    <div className="w-full block bg-white rounded-lg lg:flex p-2 mb-12 shadow-sm">
      <div className="w-full lg:w-[50%] m-auto">
        <img src={imageUrl} alt={data.name} className="w-full object-cover" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center p-4">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p className="text-gray-600 my-2">{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out || 0} sold
          </span>
        </div>
        {active && data.Finish_Date && (
          <CountDown data={data} />
        )}
        <div className="flex items-center mt-4 gap-4">
          <Link to={`/product/${data._id}`}>
            <div
              className={`${styles.button} !w-[200px] !h-[42px] !rounded-[5px] bg-[#3bc173]`}
            >
              <span className="text-white font-[600]">See Details</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-[200px] !h-[42px] !rounded-[5px] bg-[#f63b60] cursor-pointer`}
            onClick={() => addToCartHandler(data)}
          >
            <span className="text-white font-[600]">Add to cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
