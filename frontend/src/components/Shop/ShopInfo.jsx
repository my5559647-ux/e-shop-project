import React from "react";
import styles from "../../styles/styles";

const ShopInfo = ({ isOwner }) => {
  return (
    <div className="w-full bg-white py-5 px-3 rounded-[5px]">
      <div className="w-full flex items-center justify-center flex-col">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
          alt="shop avatar"
          className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3bc173]"
        />
        <h3 className="text-center py-3 text-[20px] font-[600] text-[#333]">
          Amazon Ltd
        </h3>
        <p className="text-[15px] text-[#000000a6] p-[10px] text-center leading-[1.6]">
          This is a premium online shop verified by e-shop tutorial.
        </p>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="p-3 space-y-4">
        <div>
          <h5 className="font-[600] text-[16px] text-[#333]">Address</h5>
          <h4 className="text-[#000000a4] text-[15px] mt-1">
            456, Fake Street, Seattle
          </h4>
        </div>

        <div>
          <h5 className="font-[600] text-[16px] text-[#333]">Phone Number</h5>
          <h4 className="text-[#000000a4] text-[15px] mt-1">+123 456 789</h4>
        </div>

        <div>
          <h5 className="font-[600] text-[16px] text-[#333]">Total Products</h5>
          <h4 className="text-[#000000a4] text-[15px] mt-1">10</h4>
        </div>

        <div>
          <h5 className="font-[600] text-[16px] text-[#333]">Shop Ratings</h5>
          <h4 className="text-[#000000a4] text-[15px] mt-1">4.5/5</h4>
        </div>

        <div>
          <h5 className="font-[600] text-[16px] text-[#333]">Joined On</h5>
          <h4 className="text-[#000000a4] text-[15px] mt-1">2023-03-17</h4>
        </div>
      </div>

      {isOwner && (
        <div className="px-3 mt-6">
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#3bc173]`}>
            <span className="text-white font-[600]">Edit Shop</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;