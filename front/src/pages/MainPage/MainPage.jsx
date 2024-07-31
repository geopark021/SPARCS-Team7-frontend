import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import LikePromotion from "../../components/LikePromotion/LikePromotion";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import PlusButton from "../../components/PlusButton/PlusButton";
import { fetchImages } from "../../utils/api";

const MainPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const loadImages = useCallback(async (count) => {
    try {
      const fetchedImages = await fetchImages();
      console.log("Fetched images:", fetchedImages);
      return fetchedImages.slice(0, count);
    } catch (error) {
      console.error("Failed to load images", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      const initialImages = await loadImages(4);
      setImages(initialImages);
      setLoading(false);
    };

    initialLoad();
  }, [loadImages]);

  const fetchMoreImages = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const moreImages = await loadImages(8);
      setImages((prevImages) => [...prevImages, ...moreImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to load more images", error);
    } finally {
      setLoading(false);
    }
  }, [loading, loadImages]);

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

  const fetchReportInfo = async (imageUrl) => {
    try {
      const imageId = imageUrl.split("_").pop().split(".")[0];
      const RP_id = `RP_${imageId}`;
      console.log(`Fetching report info for RP_id: ${RP_id}`);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/main/info`,
        {
          params: { RP_id: RP_id },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Report info response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch report info", error);
      throw new Error(
        "독후감 정보를 불러오는데 실패했습니다. 다시 시도해 주세요."
      );
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "#EEEAE2" }}
    >
      <Navbar />
      <main className="flex-1 mt-16 px-4 max-w-6xl mx-auto w-full">
        <LikePromotion images={images.slice(0, 3)} />
        <ImageGrid images={images} fetchReportInfo={fetchReportInfo} />
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
