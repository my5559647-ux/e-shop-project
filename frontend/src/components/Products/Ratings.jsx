import React from "react";
// Icons ka naam sahi se check karein (A capital hona chahiye)
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Ratings = ({ rating }) => {
  const stars = [];
  // String rating ko number mein badalne ke liye
  const numericRating = Math.round(rating); 

  for (let i = 1; i <= 5; i++) {
    if (i <= numericRating) {
      stars.push(
        <AiFillStar key={i} size={20} color="#f6b100" className="mr-2 cursor-pointer" />
      );
    } else {
      stars.push(
        <AiOutlineStar key={i} size={20} color="#f6b100" className="mr-2 cursor-pointer" />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default Ratings;