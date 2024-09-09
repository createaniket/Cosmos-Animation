import React, { useEffect, useState } from "react";
import "./Cosmos.css";
import Cosmos_one from "../assests/book-library-with-open-textbook.jpg";

import Cosmos_two from "../assests/pexels-bylukemiller-27489837.jpg";
import Cosmos_three from "../assests/pexels-bylukemiller-27524813.jpg";
import Cosmos_four from "../assests/pexels-dom-j-7304-45717.jpg";
import Cosmos_five from "../assests/pexels-fabianwiktor-994605.jpg";
import Cosmos_six from "../assests/pexels-mccutcheon-1191710.jpg";
import Cosmos_seven from "../assests/pexels-pawelkalisinski-1076758.jpg";

import BckgrndVdo from "../assests/vdo.mp4";

const images = [
  Cosmos_one,
  Cosmos_two,
  Cosmos_three,
  Cosmos_four,
  Cosmos_five,
  Cosmos_six,
  Cosmos_seven,

  // Add more image paths
];

const Cosmos = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [removedImages, setRemovedImages] = useState([]);
  const numberOfImages = images.length;
  const radius = 500; // Radius of the circle

  useEffect(() => {
    const interval = setInterval(() => {
      setRemovedImages((prevRemovedImages) => {
        const nextIndex = (activeIndex + 1) % numberOfImages;
        if (prevRemovedImages.length === numberOfImages - 1) {
          // Reset state when all images are removed
          setActiveIndex(nextIndex);
          return [];
        }
        return [...prevRemovedImages, activeIndex];
      });
      setActiveIndex((prevIndex) => (prevIndex + 1) % numberOfImages);
    }, 10000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex, numberOfImages, removedImages]);

  return (
    <div className="cosmosmain">
      <h1 className="cosmosheading">COSMOS ANIMATION</h1>
      <div className="circle-container">
        <video autoPlay muted loop id="background-video">
          <source src={BckgrndVdo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="circle">
          {images.map((src, index) => {
            const angle = (360 / numberOfImages) * index;
            const translateX = radius; // Radius of the circle
            const isActive = index === activeIndex;
            const isRemoved = removedImages.includes(index);

            return (
              !isRemoved && (
                <img
                  key={index}
                  src={src}
                  alt={`some ${index + 1}`}
                  className={`image ${isActive ? "active" : ""}`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(${translateX}px) rotate(${-angle}deg)`,
                    transformOrigin: "center center", // Center of the image
                  }}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cosmos;
