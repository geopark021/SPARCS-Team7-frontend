import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonContainer,
  MainButton,
  SubButton,
  TooltipContainer,
  Tooltip,
} from "./PlusButton.styles";
import plusBtnIcon from "../../assets/icons/plus-btn.png";
import myImgUploadBtnIcon from "../../assets/icons/my-img-upload-btn.png";
import aiImgGeneratorBtnIcon from "../../assets/icons/ai-img-generator-btn.png";

const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleMainButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (text) => {
    setTooltip(text);
  };

  const handleMouseLeave = () => {
    setTooltip("");
  };

  const handleMyImgClick = () => {
    navigate("/review-photo"); // My Img Upload 버튼 클릭 시 ReviewWithPhotoPage로 이동
  };

  const handleAiImgClick = () => {
    navigate("/review"); // AI Img Generator 버튼 클릭 시 ReviewPage로 이동
  };

  return (
    <ButtonContainer>
      {isOpen && (
        <>
          <TooltipContainer>
            <SubButton
              src={myImgUploadBtnIcon}
              alt="My Img Upload"
              onMouseEnter={() => handleMouseEnter("내 사진으로 작성하기")}
              onMouseLeave={handleMouseLeave}
              onClick={handleMyImgClick} // My Img Upload 버튼 클릭 이벤트 추가
            />
            {tooltip === "내 사진으로 작성하기" && <Tooltip>{tooltip}</Tooltip>}
          </TooltipContainer>
          <TooltipContainer>
            <SubButton
              src={aiImgGeneratorBtnIcon}
              alt="AI Img Generator"
              onMouseEnter={() => handleMouseEnter("AI 그림으로 작성하기")}
              onMouseLeave={handleMouseLeave}
              onClick={handleAiImgClick} // AI Img Generator 버튼 클릭 이벤트 추가
            />
            {tooltip === "AI 그림으로 작성하기" && <Tooltip>{tooltip}</Tooltip>}
          </TooltipContainer>
        </>
      )}
      <MainButton onClick={handleMainButtonClick}>
        <img src={plusBtnIcon} alt="Plus Button" />
      </MainButton>
    </ButtonContainer>
  );
};

export default PlusButton;
