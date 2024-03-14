import { Inter, Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({ subsets: ["latin"], weight: "300" });

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-14 text-center">
        The Central Food Technological Research Institute (CFTRI)
      </h1>
      <span className={roboto.className}>
        <p className="text-lg mb-4">
          The Central Food Technological Research Institute (CFTRI) is an Indian
          food research institute and laboratory headquartered in Mysore, India.
          It is a constituent laboratory of the Council of Scientific and
          Industrial Research.
        </p>
        <p className="text-lg mb-4">
          The institute has nearly two hundred scientists, technologists, and
          engineers, and over a hundred technicians, skilled workers, and
          support staff. There are sixteen research and development departments,
          including laboratories focussing on food engineering, food
          biotechnology, microbiology, grain sciences, sensory science,
          biochemistry, molecular nutrition, and food safety.
        </p>
        <p className="text-lg mb-4">
          The institute has developed over 300 products, processes, and
          equipment designs, and most of these technologies have been released
          to over 4000 licensees for commercial application. The institute
          develops technologies to increase efficiency and reduce post-harvest
          losses, add convenience, increase export, find new sources of food
          products, integrate human resources in food industries, reduce costs,
          and modernise. It holds several patents and has published findings in
          reputed journals.
        </p>
      </span>
    </div>
  );
};

export default Page;
