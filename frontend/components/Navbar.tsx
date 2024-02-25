"use client";

import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

const Navbar = () => {
  const pathname = usePathname();
  const list = [
    { title: "Home", url: "/" },
    {
      title: "About",
      url: "/about",
    },

    // {
    //   title: "Branches",
    //   url: "/branches",
    // },
    // {
    //   title: "Blog",
    //   url: "/blog",
    // },
  ];
  return (
    <div className="w-full bg-green-600 px-48">
      <div className="flex flex-row items-center justify-start gap-5 ">
        {list.map((item) => (
          <Link href={item.url} key={item.title} className="p-2">
            <span>
              <h1
                className={cn(
                  "text-white h-full p-2 rounded-lg transition-all",
                  pathname === item.url ? " bg-green-700" : "bg-transparent"
                )}
              >
                {item.title}
              </h1>
            </span>
          </Link>
        ))}
        <div className="cursor-pointer">
          {/* <h1 className={cn('text-white h-full p-2 rounded-lg transition-all',pathname==="models"?  ' bg-green-700': 'bg-transparent')}>Models</h1> */}
          <Popover>
            <PopoverTrigger>
              {" "}
              <h1
                className={cn(
                  "text-white h-full p-2 rounded-lg transition-all",
                  pathname === "models" ? " bg-green-700" : "bg-transparent"
                )}
              >
                Models
              </h1>
            </PopoverTrigger>
            <PopoverContent>
              <div className="items-center flex ">
                  <Link href={"/ML-Model"}><h1>Brocollie Shelflife model</h1></Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
