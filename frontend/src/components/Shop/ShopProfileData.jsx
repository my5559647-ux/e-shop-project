import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import EventCard from "../Events/EventCard";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full bg-white rounded-[4px] shadow-sm p-4">
      <div className="flex w-full items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center gap-10">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setActive(1)}
          >
            <h5
              className={`text-[20px] font-[600] pb-2 ${
                active === 1
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-[#333]"
              }`}
            >
              Shop Products
            </h5>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setActive(2)}
          >
            <h5
              className={`text-[20px] font-[600] pb-2 ${
                active === 2
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-[#333]"
              }`}
            >
              Running Events
            </h5>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setActive(3)}
          >
            <h5
              className={`text-[20px] font-[600] pb-2 ${
                active === 3
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-[#333]"
              }`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        {isOwner && (
          <div>
            <Link to="/dashboard">
              <div
                className={`${styles.button} !w-[200px] !h-[42px] !rounded-[5px] bg-[#3bc173]`}
              >
                <span className="text-white font-[600]">Go Dashboard</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-8">
        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
            {products && products.length === 0 && (
              <p className="text-center w-full py-10 col-span-full">
                No products found.
              </p>
            )}
          </div>
        )}

        {active === 2 && (
          <div>
            {events &&
              events.map((i, index) => (
                <EventCard active={true} data={i} key={index} />
              ))}
            {events && events.length === 0 && (
              <p className="text-center w-full py-10">
                No Events have for this shop!
              </p>
            )}
          </div>
        )}

        {active === 3 && (
          <div>
            {allReviews &&
              allReviews.map((item, index) => (
                <div
                  className="w-full flex my-4 p-4 bg-gray-50 rounded-lg"
                  key={index}
                >
                  <img
                    src={
                      item?.user?.avatar?.url ||
                      "https://via.placeholder.com/50"
                    }
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="pl-4">
                    <div className="flex items-center">
                      <h1 className="font-[600]">{item?.user?.name}</h1>
                      <Ratings rating={item?.rating} />
                    </div>
                    <p className="text-gray-600 mt-1">{item?.comment}</p>
                    <p className="text-gray-400 text-sm mt-1">2 days ago</p>
                  </div>
                </div>
              ))}
            {allReviews && allReviews.length === 0 && (
              <p className="text-center w-full py-10">
                No Reviews have for this shop!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
