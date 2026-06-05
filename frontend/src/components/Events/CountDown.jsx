import React, { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    // 2026-03-15 purani date thi. Isko humne badal kar '2026-12-31' (Future date) kar diya hai.
    const difference = +new Date("2026-12-31") - +new Date(); 
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    // Agar value 0 bhi ho (jaise 0 days), tab bhi screen par show karne ke liye line change ki hai
    return (
      <span key={interval} className="text-[25px] text-[#475ad2] mr-2 font-[600]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-2">
      {Object.keys(timeLeft).length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px] font-[600]">Time's Up!</span>
      )}
    </div>
  );
};

export default CountDown;