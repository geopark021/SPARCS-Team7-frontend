import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  SliderContainer,
  SliderWrapper,
  Slide,
  SlideImage,
  LeftButton,
  RightButton,
  DotContainer,
  Dot,
} from "./LikePromotion.styles";

const LikePromotion = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SliderContainer>
      <SliderWrapper
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Slide key={index}>
            <SlideImage src={image} alt={`Promotion ${index + 1}`} />
          </Slide>
        ))}
      </SliderWrapper>
      <LeftButton onClick={prevSlide}>
        <ChevronLeft size={24} style={{ color: "#1f2937" }} />
      </LeftButton>
      <RightButton onClick={nextSlide}>
        <ChevronRight size={24} style={{ color: "#1f2937" }} />
      </RightButton>
      <DotContainer>
        {images.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </DotContainer>
    </SliderContainer>
  );
};

export default LikePromotion;
