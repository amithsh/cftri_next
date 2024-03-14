import { Roboto } from "next/font/google";
import Image from "next/image";
import React from "react";


 const roboto = Roboto({ subsets: ["latin"], weight: "300" });


const Head = () => {
 
  return (
    <div className="w-full min-w-full px-48 h-auto p-2 bg-gradient-to-r from-white to-sky-400">
      <div className="flex flex-row items-center justify-center gap-5">
        <Image src={"/logo.png"} alt="logo" height={180} width={180} />
        <div className="flex flex-col ">
          <span className={roboto.className}>
           
            <h1 className="font-extrabold text-sm text-green-600">CSIR - CENTRAL FOOD TECHNOLOGICAL RESEARCH INSTITUTE</h1>
            <h1 className="font-extrabold text-sm text-green-600">COUNCIL OF SCIENTIFIC & INDUSTRIAL RESEARCH</h1>
            <p className="font-light text-xs text-green-600">
              MINISTRY OF SCIENCE & TECHNOLOGY, GOVT. OF INDIA, MYSURU - 570020
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Head;
