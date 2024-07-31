import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import Navbar from "../../components/Navbar/Navbar";
import {
  PageContainer,
  Header,
  ChatContainer,
  MessageContainer,
  Message,
  ChatBotIcon,
  ChatBotMessage,
  ImageContainer,
  ImageWrapper,
  Image,
  Label,
  ButtonContainer,
  Button,
  RefreshButton,
  RefreshIcon,
} from "./ImageResultPage.styles";
import chatBotIcon from "../../assets/icons/chat-bot-icon.png";
import refreshIcon from "../../assets/icons/refresh-icon.png";

const ImageResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [image, setImage] = useState(null);
  const [imageLabel, setImageLabel] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const imageId = location.state?.imageId || "image_5562";
      try {
        const imageUrl = await getSignedUrl(imageId);
        setImage(imageUrl);
        setImageLabel(imageId);
      } catch (error) {
        console.error("Failed to fetch image:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            content: "이미지를 불러오는데 실패했습니다. 다시 시도해주세요.",
          },
        ]);
      }
    };

    fetchImage();
  }, [location.state]);

  const getSignedUrl = async (imageId) => {
    const accessKey = import.meta.env.VITE_NCP_ACCESS_KEY_ID;
    const secretKey = import.meta.env.VITE_NCP_SECRET_KEY;
    const bucketName = import.meta.env.VITE_NCP_BUCKET_NAME;
    const endpoint = "https://kr.object.ncloudstorage.com";

    const method = "GET";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const path = `/${bucketName}/${imageId}.png`;

    const message = `${method}\n${path}\n${timestamp}`;
    const signature = CryptoJS.HmacSHA256(message, secretKey).toString(
      CryptoJS.enc.Base64
    );

    const url = `${endpoint}${path}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": accessKey,
          "x-ncp-signature-v2": signature,
        },
      });

      return url;
    } catch (error) {
      console.error("Error fetching image:", error);
      throw new Error("Failed to fetch image");
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books/new/save`,
        {
          rpId: "rp_123", // 이 값은 실제 독후감 ID로 대체해야 합니다
          rpTitle: "어린왕자를 읽고", // 이 값은 실제 독후감 제목으로 대체해야 합니다
          email: "email@email.com", // 이 값은 실제 사용자 이메일로 대체해야 합니다
          rpText: "독후감실제내용blahblah", // 이 값은 실제 독후감 내용으로 대체해야 합니다
          bookTitle: "어린왕자", // 이 값은 실제 책 제목으로 대체해야 합니다
          imgUrl: "ai", // AI 이미지를 사용하므로 "ai"로 설정
        }
      );

      if (response.data.code === "SU") {
        // 성공적으로 저장되면 메인 페이지로 이동
        navigate("/main");
      } else {
        // 에러 처리
        console.error("Failed to save:", response.data.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            content: "저장에 실패했습니다. 다시 시도해주세요.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error saving:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content: "저장 중 오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    }
  };

  const handleCancelClick = () => {
    navigate("/main");
  };

  const handleRefreshClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/regenerate-image`,
        {
          originalImageId: imageLabel,
        }
      );

      if (response.data.code === "SU" && response.data.image_id) {
        const newImageUrl = await getSignedUrl(response.data.image_id);
        setImage(newImageUrl);
        setImageLabel(response.data.image_id);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", content: "이미지가 재생성되었습니다." },
        ]);
      }
    } catch (error) {
      console.error("Failed to regenerate image:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content: "이미지 재생성에 실패했습니다. 다시 시도해주세요.",
        },
      ]);
    }
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
    </PageContainer>
  );
};

export default ImageResultPage;
