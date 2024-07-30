import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { fetchClovaQuestions } from "../../utils/clovaApi";
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
import bookIcon from "../../assets/icons/book-report-logo.png";

const ReviewPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [content, setContent] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const navigate = useNavigate();

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetchClovaQuestions(content);
      navigate("/chatbot", { state: { choices: response.choices } });
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ReviewForm>
          <img
            src={bookIcon}
            alt="Book Icon"
            style={{ margin: "0 auto", display: "block", marginBottom: "2rem" }}
          />
          <FieldSet>
            <FieldLabel>책 제목</FieldLabel>
            <input
              type="text"
              placeholder="책 제목"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
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
              value={workTitle}
              onChange={(e) => setWorkTitle(e.target.value)}
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
