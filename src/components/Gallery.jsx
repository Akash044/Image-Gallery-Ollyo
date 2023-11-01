import React from "react";
import img01 from "../assets/images/image-1.webp";
import img02 from "../assets/images/image-2.webp";
import img03 from "../assets/images/image-3.webp";
import img04 from "../assets/images/image-4.webp";
import img05 from "../assets/images/image-5.webp";
import img06 from "../assets/images/image-6.webp";
import img07 from "../assets/images/image-7.webp";
import img08 from "../assets/images/image-8.webp";
import img09 from "../assets/images/image-9.webp";
import img10 from "../assets/images/image-10.jpeg";
import img11 from "../assets/images/image-11.jpeg";

const Gallery = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 h-[120px] gap-2">
      <div className="border-2 border-red-300 h-auto max-w-full row-span-2 col-span-2">
        <img src={img01} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img02} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img03} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img04} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img05} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img06} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img07} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img08} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img09} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img10} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img11} alt="" />
      </div>
      <div className="border-2 border-red-300 h-auto max-w-full">
        <img src={img01} alt="" />
      </div>
    </div>
  );
};

export default Gallery;
