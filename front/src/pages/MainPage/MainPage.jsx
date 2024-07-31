// src/pages/MainPage/MainPage.jsx

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LikePromotion from "../../components/LikePromotion/LikePromotion";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import PlusButton from "../../components/PlusButton/PlusButton";
import { fetchImages } from "../../utils/api";

// 랜덤으로 이미지를 선택하는 함수
const getRandomImages = (images, num) => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const MainPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchImages();
        setImages(getRandomImages(fetchedImages, 4)); // 초기 4개 랜덤 이미지
        setLoading(false);
      } catch (error) {
        console.error("Failed to load images", error);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const fetchMoreImages = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const fetchedImages = await fetchImages();
      setImages((prevImages) => [
        ...prevImages,
        ...getRandomImages(fetchedImages, 4),
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load more images", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      fetchMoreImages();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "#EEEAE2" }}
    >
      <Navbar />
      <main className="flex-1 mt-16 px-4 max-w-6xl mx-auto w-full">
        <LikePromotion images={images.slice(0, 3)} />
        <ImageGrid images={images} />
        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <PlusButton />
      </main>
    </div>
  );
};

export default MainPage;
