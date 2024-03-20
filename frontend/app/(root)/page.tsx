"use client"

import Carousal from "@/components/Carousal";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Images } from "@/constants/BannerImages";
import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import Card from "@/components/Card";
import "@/components/styles.css";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

export default function Home() {
  const images = Images;
  return (
    <div className=" h-auto w-full px-48 mt-4">
      <div className="flex flex-row items-center gap-x-7 justify-center p-9">
        <div className="w-auto h-auto rounded-lg max-w-[1700px]">
          <section className="flex items-center justify-center">
            <Swiper
              spaceBetween={1}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className="max-w-[800px] h-auto"
            >
              {images.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex items-center justify-center">
                    <Image
                      className="rounded-lg shadow-xl"
                      src={item.url}
                      alt="swiper"
                      width={1000}
                      height={400}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>
        <div className="flex flex-col items-center  justify-between min-w-72 gap-12 ml-8">
          <div className="flex flex-col items-center justify-center w-auto h-auto ">
            <h1
              className={cn(
                "text-xl font-extrabold text-green-500",
                roboto.className
              )}
            >
              Recent Blog
            </h1>
            <div className="flex items-center justify-center h-auto">
              <Image
                src={"/images-1.jpg"}
                alt="image2"
                width={400}
                height={400}
                layout="fixed"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-auto ">
            <h1
              className={cn(
                "text-xl font-extrabold text-green-500",
                roboto.className
              )}
            >
              Announcements
            </h1>
            {/* Add your announcement content here */}
            <Image
                src={"/images.jpg"}
                alt="image2"
                width={400}
                height={400}
              />
          </div>
        </div>
      </div>
    </div>
  );
}



// <Image  className="rounded-lg shadow-xl" src={item.url} alt="swiper"  width={600} height={0}/>