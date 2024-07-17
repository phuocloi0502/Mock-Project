import { useEffect, useState } from "react";
import "./slideImages.scss";
import banner from "../../assets/banner1.webp";
import sl1 from "../../assets/sl1.jpg";
import sl2 from "../../assets/sl2.jpg";
import sl3 from "../../assets/sl3.jpg";
import sl4 from "../../assets/sl4.jpg";

export const SlideImages = () => {
  const slides = [
    {
      url: sl1,
      title: "1",
    },
    {
      url: sl2,
      title: "2",
    },
    {
      url: sl3,
      title: "3",
    },
    {
      url: sl4,
      title: "4",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="sliderStyles">
      <div>
        <div onClick={goToPrevious} className="leftArrowStyles">
          ❮
        </div>
        <div onClick={goToNext} className="rightArrowStyles">
          ❯
        </div>
      </div>
      <div className="silde-image">
        <img src={slides[currentIndex].url} />
      </div>
      <div className="dotsContainerStyles">
        {slides.map((slide, slideIndex) => (
          <div
            className="dotStyle"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            {slideIndex == currentIndex ? (
              <div className="dot" style={{ color: "green", fontSize: "25px" }}>
                ●
              </div>
            ) : (
              <div>○</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
