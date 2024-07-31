import React, { useState } from "react";
import {
  GridContainer,
  GridImage,
  Popup,
  PopupBackground,
  PopupContent,
  PopupTitle,
  PopupText,
} from "./ImageGrid.styles";

const ImageGrid = ({ images, fetchReportInfo }) => {
  const [popupImage, setPopupImage] = useState(null);
  const [reportInfo, setReportInfo] = useState(null);

  const handleImageClick = (image) => {
    setPopupImage(image);
    setReportInfo(null);
  };

  const handlePopupClick = async () => {
    if (!reportInfo && popupImage) {
      try {
        const info = await fetchReportInfo(popupImage);
        setReportInfo(info);
      } catch (error) {
        console.error("Failed to fetch report info", error);
        alert(error.message);
      }
    }
  };

  const handleClosePopup = () => {
    setPopupImage(null);
    setReportInfo(null);
  };

  return (
    <>
      <GridContainer>
        {images.map((image, index) => (
          <GridImage
            key={index}
            src={image}
            alt={`Grid ${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </GridContainer>

      {popupImage && (
        <>
          <PopupBackground onClick={handleClosePopup} />
          <Popup onClick={handlePopupClick}>
            {reportInfo ? (
              <PopupContent>
                <PopupTitle>{reportInfo.RP_title}</PopupTitle>
                <PopupText>{reportInfo.RP_text}</PopupText>
              </PopupContent>
            ) : (
              <img
                src={popupImage}
                alt="Popup"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </Popup>
        </>
      )}
    </>
  );
};

export default ImageGrid;
