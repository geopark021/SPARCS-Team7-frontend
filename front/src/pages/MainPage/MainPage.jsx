import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LikePromotion from "../../components/LikePromotion/LikePromotion";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import PlusButton from "../../components/PlusButton/PlusButton";

// 이미지 파일 경로 배열 - 랜덤 8개 선택
const imagePaths = [
  "/src/assets/images/report-most-liked_1.png",
  "/src/assets/images/report-most-liked_2.png",
  "/src/assets/images/report-most-liked_3.png",
  "/src/assets/images/report-most-liked_4.png",
  "/src/assets/images/report-most-liked_5.png",
  "/src/assets/images/report-most-liked_6.png",
  "/src/assets/images/report-most-liked_7.png",
  "/src/assets/images/report-most-liked_8.png",
];

// 랜덤으로 이미지를 선택하는 함수
const getRandomImages = (num) => {
  const shuffled = [...imagePaths].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const MainPage = () => {
  const [images, setImages] = useState(getRandomImages(4)); // 초기 4개 랜덤 이미지
  const [loading, setLoading] = useState(false);

  const promotionImages = getRandomImages(3); // LikePromotion용 랜덤 3개 이미지

  const fetchMoreImages = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newImages = getRandomImages(8);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setLoading(false);
    }, 1000); // 이미지 로딩 딜레이 설정함
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
        <LikePromotion images={promotionImages} />
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
