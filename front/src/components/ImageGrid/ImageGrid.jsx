import React, { useState } from "react";
import {
  GridContainer,
  GridImage,
  Popup,
  PopupBackground,
} from "./ImageGrid.styles";

const ImageGrid = ({ images }) => {
  const [popupImage, setPopupImage] = useState(null);

  const handleImageClick = (image) => {
    setPopupImage(image);
  };

  const handleClosePopup = () => {
    setPopupImage(null);
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
          <Popup>
            <img src={popupImage} alt="Popup" />
          </Popup>
        </>
      )}
    </>
  );
};

export default ImageGrid;
