import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      {/* Newsletter Subscription - Blue banner */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      
      {/* Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <br />
          <p>The home and elements needeed to create beatiful products.</p>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          <li>
            <a href="/about" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              About us
            </a>
          </li>
          <li>
            <a href="/careers" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Careers
            </a>
          </li>
          <li>
            <a href="/mobile" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Mobile
            </a>
          </li>
          <li>
            <a href="/blog" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Blog
            </a>
          </li>
          <li>
            <a href="/how-we-work" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              How we work
            </a>
          </li>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Contact</h1>
          <li>
            <a href="/help" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Help/FAQ
            </a>
          </li>
          <li>
            <a href="/press" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Press
            </a>
          </li>
          <li>
            <a href="/affiliates" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Affilates
            </a>
          </li>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">More</h1>
          <li>
            <a href="/airline-fees" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Airlinefees
            </a>
          </li>
          <li>
            <a href="/airline" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Airline
            </a>
          </li>
          <li>
            <a href="/low-fare-tips" className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              Low fare tips
            </a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2020 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          // Line 109 se 112 tak ka code delete kar dein
<img
  src="https://hamart-shop.vercel.app/..." 
  alt=""
/>
        </div>
      </div>
    </div>
  );
};

export default Footer;