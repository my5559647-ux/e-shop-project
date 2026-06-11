import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc +
        product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full bg-white py-5 px-3 rounded-[5px]">
          <div className="w-full flex items-center justify-center flex-col">
            <img
              src={
                data?.avatar?.url ||
                "https://via.placeholder.com/150"
              }
              alt="shop avatar"
              className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3bc173]"
            />
            <h3 className="text-center py-3 text-[20px] font-[600] text-[#333]">
              {data.name}
            </h3>
            <p className="text-[15px] text-[#000000a6] p-[10px] text-center leading-[1.6]">
              {data.description}
            </p>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="p-3 space-y-4">
            <div>
              <h5 className="font-[600] text-[16px] text-[#333]">Address</h5>
              <h4 className="text-[#000000a4] text-[15px] mt-1">
                {data.address}
              </h4>
            </div>

            <div>
              <h5 className="font-[600] text-[16px] text-[#333]">
                Phone Number
              </h5>
              <h4 className="text-[#000000a4] text-[15px] mt-1">
                {data.phoneNumber}
              </h4>
            </div>

            <div>
              <h5 className="font-[600] text-[16px] text-[#333]">
                Total Products
              </h5>
              <h4 className="text-[#000000a4] text-[15px] mt-1">
                {products && products.length}
              </h4>
            </div>

            <div>
              <h5 className="font-[600] text-[16px] text-[#333]">
                Shop Ratings
              </h5>
              <h4 className="text-[#000000a4] text-[15px] mt-1">
                {averageRating.toFixed(1)}/5
              </h4>
            </div>

            <div>
              <h5 className="font-[600] text-[16px] text-[#333]">Joined On</h5>
              <h4 className="text-[#000000a4] text-[15px] mt-1">
                {data?.createdAt?.slice(0, 10)}
              </h4>
            </div>
          </div>

          {isOwner && (
            <div className="px-3 mt-6 space-y-3">
              <Link
                to="/settings"
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#3bc173] inline-flex items-center justify-center`}
              >
                <span className="text-white font-[600]">Edit Shop</span>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#f63b60] cursor-pointer inline-flex items-center justify-center`}
                onClick={logoutHandler}
              >
                <span className="text-white font-[600]">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
