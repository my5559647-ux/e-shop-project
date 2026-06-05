import React from "react";
import styles from "../../../styles/styles";

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>
      <div className="flex justify-between w-full items-center gap-5">
        
        {/* Sony - Fixed directly with official CDN link */}
        <div className="flex items-center justify-center w-[150px] h-[50px]">
          <img 
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sony.svg" 
            alt="sony" 
            className="max-w-[80%] max-h-full object-contain filter invert-[20%] sepia-[10%] saturate-[10%] hue-rotate-[180deg]" 
          />
        </div>

        {/* Dell */}
        <div className="flex items-center justify-center w-[150px] h-[50px]">
          <img 
            src="https://www.vectorlogo.zone/logos/dell/dell-ar21.svg" 
            className="max-w-full max-h-full object-contain" 
            alt="dell" 
          />
        </div>

       {/* LG */}
        <div className="flex items-center justify-center w-[150px] h-[50px]">
          <img 
            src="https://www.vectorlogo.zone/logos/lg/lg-ar21.svg" 
            className="max-w-full max-h-full object-contain" 
            alt="lg" 
          />
        </div>

        {/* Apple */}
        <div className="flex items-center justify-center w-[150px] h-[50px]">
          <img 
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.svg" 
            className="max-w-full max-h-full object-contain" 
            alt="apple" 
          />
        </div>

        {/* Microsoft */}
        <div className="flex items-center justify-center w-[150px] h-[50px]">
          <img 
            src="https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" 
            className="max-w-full max-h-full object-contain" 
            alt="microsoft" 
          />
        </div>

      </div>
    </div>
  );
};

export default Sponsored;