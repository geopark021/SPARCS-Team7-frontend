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

  // 이미지를 4개씩 그룹화
  const groupedImages = images.reduce((acc, curr, index) => {
    if (index % 4 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <>
      {groupedImages.map((group, groupIndex) => (
        <GridContainer key={groupIndex} style={{ marginBottom: "2rem" }}>
          {group.map((image, index) => (
            <GridImage
              key={index}
              src={image}
              alt={`Grid ${groupIndex * 4 + index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </GridContainer>
      ))}

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
