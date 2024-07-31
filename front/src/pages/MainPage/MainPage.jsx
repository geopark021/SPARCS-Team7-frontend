import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LikePromotion from "../../components/LikePromotion/LikePromotion";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import PlusButton from "../../components/PlusButton/PlusButton";
import { fetchImages } from "../../utils/api";

const MainPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const loadImages = useCallback(async (pageNum) => {
    try {
      const fetchedImages = await fetchImages(8); // 8개씩 이미지 가져오기
      setImages((prevImages) => [...prevImages, ...fetchedImages]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load images", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages(0); // 초기 이미지 로딩
  }, [loadImages]);

  const fetchMoreImages = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
    loadImages(page + 1);
  }, [loading, page, loadImages]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      fetchMoreImages();
    }
  }, [fetchMoreImages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
