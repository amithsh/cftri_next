import { Inter, Roboto } from "next/font/google";
import Image from "next/image";
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
        <h2 className="text-2xl font-bold mb-4 mt-12">About Broccoli</h2>
        <p className="text-lg mb-4">
          Broccoli is a green vegetable that belongs to the cabbage family. It is high
          in vitamins C, K, and A, as well as dietary fiber and potassium. It's
          known for its nutritional benefits and has been linked to improved
          health outcomes including reduced inflammation and enhanced immune
          function.
        </p>
        <div className="flex justify-center my-8">
          <Image
            src="/brocollie.jpg" // Replace with your image path or URL
            alt="Broccoli"
            width={400} // Adjust size as needed
            height={300}
            className="rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Nutritional Benefits</h2>
        <p className="text-lg mb-4">
          Broccoli is rich in antioxidants and bioactive compounds that have
          been shown to reduce the risk of certain cancers. Its high fiber content
          supports gut health and contributes to cardiovascular health.
        </p>
        <h2 className="text-2xl font-bold mb-4">Storing Methods</h2>
        <p className="text-lg mb-4">
          To best preserve broccoli's freshness and nutritional value, store it
          unwashed in a loose or perforated bag in the crisper drawer of your
          refrigerator. It can last up to a week if stored properly. For long-term
          storage, broccoli can be blanched and frozen.
        </p>
      </span>
    </div>
  );
};

export default Page;
