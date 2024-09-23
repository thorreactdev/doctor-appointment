import React from "react";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="flex flex-col gap-5 lg:flex-row justify-between">
        <div className="flex flex-col gap-2 cursor-pointer">
          <figure>
            <img src="/logo.svg" alt="Logo" />
          </figure>
          <span className="text-sm w-full lg:w-[420px] text-gray-500">
            Providing trusted doctors and healthcare services at your
            fingertips. Easy online booking, rescheduling, and virtual
            consultations. Your health, our priority.
          </span>
        </div>

        <div className="flex flex-col gap-3 cursor-pointer">
          <h3 className="uppercase font-medium text-xl">Company</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-500 ">
            <span className="hover:underline">Home</span>
            <span className="hover:underline">About</span>
            <span className="hover:underline">Contact</span>
            <span className="hover:underline">Privacy Policy</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 cursor-pointer">
          <h3 className="uppercase font-medium text-xl"> get in touch</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <span className="hover:underline">+91 9324751785</span>
            <span className="hover:underline">prajapativinay140404@gmail.com</span>
          </div>
        </div>
      </div>
      <hr className="my-5"/>
        <div className="text-center font-medium">
        Copyright {new Date().getFullYear()} @Vinay.dev - All Right Reserved.
        </div>
    </div>
  );
};

export default Footer;
