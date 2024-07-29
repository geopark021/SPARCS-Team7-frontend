import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  PageContainer,
  ReviewForm,
  FieldSet,
  FieldLabel,
  FieldValue,
  TextArea,
  CharCount,
  SubmitButton,
  PhotoUploadContainer,
  PhotoUploadButton,
} from "./ReviewWithPhotoPage.styles";
import photoUploadIcon from "../../assets/icons/photo-upload-icon.png";

const ReviewWithPhotoPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [workTitle, setWorkTitle] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 서버에 데이터를 전송하는 로직 추가 해야함
    console.log("Book Title:", bookTitle);
    console.log("Work Title:", workTitle);
    console.log("Review content:", content);
    console.log("Uploaded Image:", image);
    // 서버 응답 도착 후 처리할 로직 추가 해야함
  };

  return (
    <PageContainer>
      <Navbar />
      <ReviewForm>
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
            onChange={handleContentChange}
          ></TextArea>
          <CharCount>{content.length}/1000자</CharCount>
        </FieldSet>
        <FieldSet>
          <FieldLabel>사진 첨부</FieldLabel>
          <PhotoUploadContainer>
            <label htmlFor="photo-upload">
              <PhotoUploadButton src={photoUploadIcon} alt="사진 첨부" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </PhotoUploadContainer>
        </FieldSet>
        {image && (
          <img src={image} alt="Uploaded" style={{ maxWidth: "100%" }} />
        )}
        <SubmitButton onClick={handleSubmit}>&#10140;</SubmitButton>
      </ReviewForm>
    </PageContainer>
  );
};

export default ReviewWithPhotoPage;
