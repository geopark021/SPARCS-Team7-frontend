import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  PageContainer,
  Header,
  ChatContainer,
  MessageContainer,
  Message,
  ChatBotIcon,
  ChatBotMessage,
  UserMessage,
  ImageContainer,
  ImageWrapper,
  Image,
  Label,
  ButtonContainer,
  Button,
  RefreshButton,
  RefreshIcon,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalContent,
  ModalButtonContainer,
  ModalButton,
} from "./ImageResultPage.styles";
import chatBotIcon from "../../assets/icons/chat-bot-icon.png";
import generatedAiResultImg from "../../assets/images/generated-ai-result-img.png";
import refreshIcon from "../../assets/icons/refresh-icon.png";

const ImageResultPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "이미지 생성이 완료되었습니다.",
    },
    {
      type: "bot",
      content: "이미지 재생성은 1번 더 가능합니다.",
    },
  ]);
  const [image, setImage] = useState(generatedAiResultImg);
  const [imageLabel, setImageLabel] = useState("러다이트 운동");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleRefreshClick = () => {
    console.log("이미지 새로고침");
  };

  const handleCloseModal = () => {
    setShowSaveModal(false);
    setShowCancelModal(false);
  };

  const handlePostClick = () => {
    navigate("/main"); // 메인 페이지로 이동
  };

  const handleConfirmCancelClick = () => {
    navigate("/main"); // 메인 페이지로 이동
  };

  return (
    <PageContainer>
      <Navbar />
      <ChatContainer>
        <Header>이미지 생성하기</Header>
        {messages.map((message, index) => (
          <MessageContainer key={index}>
            <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
            <ChatBotMessage>
              <Message>{message.content}</Message>
            </ChatBotMessage>
          </MessageContainer>
        ))}
        {image && (
          <MessageContainer>
            <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
            <ImageContainer>
              <ImageWrapper>
                <Image src={image} alt="Generated" />
              </ImageWrapper>
              <Label>{imageLabel}</Label>
            </ImageContainer>
          </MessageContainer>
        )}
      </ChatContainer>
      <ButtonContainer>
        <RefreshButton onClick={handleRefreshClick}>
          <RefreshIcon src={refreshIcon} alt="Refresh" />
        </RefreshButton>
        <Button onClick={handleCancelClick}>취소</Button>
        <Button onClick={handleSaveClick}>저장</Button>
      </ButtonContainer>

      {showSaveModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>✅ 저장 완료</ModalHeader>
            <ModalContent>
              저장이 완료되었습니다.
              <br /> <br /> 메인페이지에 공개적으로 게시하고 싶으시면
              <b> 게시</b> 버튼을 눌러주세요.
              <br />
              <br />
              <b>아니오</b>를 클릭하면 게시되지 않고 마이페이지에서만 확인
              가능합니다.
            </ModalContent>
            <ModalButtonContainer>
              <ModalButton onClick={handleCloseModal}>아니오</ModalButton>
              <ModalButton onClick={handlePostClick}>게시</ModalButton>
            </ModalButtonContainer>
          </Modal>
        </ModalOverlay>
      )}

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
              <ModalButton onClick={handleConfirmCancelClick}>네</ModalButton>
            </ModalButtonContainer>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default ImageResultPage;
