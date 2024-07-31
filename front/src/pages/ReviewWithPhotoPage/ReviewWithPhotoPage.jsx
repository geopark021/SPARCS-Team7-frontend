import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import {
  PageContainer,
  ReviewForm,
  FieldSet,
  FieldLabel,
  FieldValue,
  TextArea,
  CharCount,
  PhotoUploadContainer,
  PhotoUploadButton,
  ButtonContainer,
  Button,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalContent,
  ModalButtonContainer,
  ModalButton,
} from "./ReviewWithPhotoPage.styles";
import photoUploadIcon from "../../assets/icons/photo-upload-icon.png";

const ReviewWithPhotoPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      console.error("User email not found in localStorage");
    }
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePhotoButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setImageBase64(reader.result.split(",")[1]); // Base64 문자열 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancel = () => {
    navigate("/main");
  };

  const handleSave = async () => {
    if (!userEmail) {
      console.error("User email is not available");
      return;
    }

    const reviewData = {
      //rpId: `rp_${Date.now()}`,
      rpId: "rp_3133",
      rpTitle: workTitle,
      email: userEmail,
      rpText: content,
      bookTitle: bookTitle,
      imgUrl: imageBase64 ? `${imageBase64}` : "ai", // 인코딩 결과
    };

    console.log("Sending data to server:", reviewData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books/new/save`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === "SU") {
        console.log("저장 성공:", response.data.message);
        navigate("/main");
      } else {
        console.error("저장 실패:", response.data.message);
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error.message);
    }
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
            <PhotoUploadButton
              as="button"
              type="button"
              onClick={handlePhotoButtonClick}
            >
              <img src={photoUploadIcon} alt="사진 첨부" />
            </PhotoUploadButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </PhotoUploadContainer>
        </FieldSet>
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="업로드된 이미지"
            style={{ maxWidth: "100%" }}
          />
        )}
        <ButtonContainer>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </ButtonContainer>
      </ReviewForm>

      {showCancelModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>❗ 주의</ModalHeader>
            <ModalContent>
              취소 버튼 클릭 시 작성한 독후감 내용이 없어집니다.
              <br />
              그래도 취소 하시겠습니까?
            </ModalContent>
            <ModalButtonContainer>
              <ModalButton onClick={handleCloseModal}>아니오</ModalButton>
              <ModalButton onClick={handleConfirmCancel}>네</ModalButton>
            </ModalButtonContainer>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default ReviewWithPhotoPage;
