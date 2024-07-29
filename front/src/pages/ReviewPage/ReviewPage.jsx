import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  PageContainer,
  ReviewForm,
  FieldSet,
  FieldLabel,
  FieldValue,
  TextArea,
  SubmitButton,
  ColorButtonContainer,
  ColorButton,
  CharCount,
  ColorFieldSet,
} from "./ReviewPage.styles";
import bookIcon from "../../assets/icons/book-report-logo.png"; // 아이콘 이미지 경로 수정 필요

const ReviewPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    // 서버에 데이터를 전송하는 로직을 여기에 작성합니다.
    console.log("Selected color:", selectedColor);
    console.log("Review content:", content);

    // 챗봇 대화 페이지로 이동
    navigate("/chatbot");
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ReviewForm>
          <img
            src={bookIcon}
            alt="Book Icon"
            style={{ margin: "0 auto", display: "block", marginBottom: "2rem" }} // marginBottom 속성 추가
          />
          <FieldSet>
            <FieldLabel>책 제목</FieldLabel>
            <input
              type="text"
              placeholder="책 제목"
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ccc",
              }}
            />
          </FieldSet>
          <FieldSet>
            <FieldLabel>작품 제목</FieldLabel>
            <input
              type="text"
              placeholder="작품 제목"
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ccc",
              }}
            />
          </FieldSet>
          <FieldSet>
            <FieldLabel>작성 일자</FieldLabel>
            <FieldValue>{new Date().toLocaleString()}</FieldValue>
          </FieldSet>
          <FieldSet>
            <TextArea
              placeholder="독후감 내용"
              maxLength="1000"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></TextArea>
            <CharCount>{content.length}/1000자</CharCount>
          </FieldSet>
          <ColorFieldSet>
            <FieldLabel>이미지 색</FieldLabel>
            <ColorButtonContainer>
              <ColorButton
                style={{ backgroundColor: "#FF6B6B" }}
                onClick={() => handleColorButtonClick("#FF6B6B")}
                isSelected={selectedColor === "#FF6B6B"}
              ></ColorButton>
              <ColorButton
                style={{ backgroundColor: "#6BCB77" }}
                onClick={() => handleColorButtonClick("#6BCB77")}
                isSelected={selectedColor === "#6BCB77"}
              ></ColorButton>
              <ColorButton
                style={{ backgroundColor: "#4D96FF" }}
                onClick={() => handleColorButtonClick("#4D96FF")}
                isSelected={selectedColor === "#4D96FF"}
              ></ColorButton>
            </ColorButtonContainer>
          </ColorFieldSet>
          <SubmitButton onClick={handleSubmit}>&#10140;</SubmitButton>
        </ReviewForm>
      </PageContainer>
    </>
  );
};

export default ReviewPage;
