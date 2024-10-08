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
    { type: "bot", content: "이미지 생성이 완료되었습니다." },
    { type: "bot", content: "이미지 재생성은 1번 더 가능합니다." },
  ]);
  const [image, setImage] = useState(null);
  const [imageLabel, setImageLabel] = useState("");
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageId = location.state?.imageId;
      if (!imageId) {
        console.error("No image ID provided");
        return;
      }
      try {
        const imageUrl = await getSignedUrl(imageId);
        setImage(imageUrl);
        setImageLabel(imageId);
        setBookInfo(location.state);
      } catch (error) {
        console.error("Failed to fetch image:", error);
        setMessages((prev) => [
          ...prev,
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
      await axios.get(url, {
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
    if (!bookInfo || !imageLabel) {
      console.error("Missing required information for saving");
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "저장에 필요한 정보가 부족합니다. 다시 시도해주세요.",
        },
      ]);
      return;
    }

    const imageNumber = imageLabel.split("_")[1];
    const saveData = {
      rpId: `rp_${imageNumber}`,
      rpTitle: bookInfo.rpTitle || "",
      email: bookInfo.email || "",
      rpText: bookInfo.rpText || "",
      bookTitle: bookInfo.bookTitle || "",
      imgUrl: "ai",
      color: bookInfo.color || "",
    };

    console.log("Sending data to server:", saveData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books/new/save`,
        saveData
      );

      console.log("Full server response:", response);

      if (response.data.code === "SU") {
        navigate("/main");
      } else {
        console.error("Failed to save:", response.data);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: `저장에 실패했습니다: ${
              response.data.message || "알 수 없는 오류"
            }`,
          },
        ]);
      }
    } catch (error) {
      console.error("Error saving:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `저장 중 오류가 발생했습니다: ${error.message}`,
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
        { originalImageId: imageLabel }
      );

      if (response.data.code === "SU" && response.data.image_id) {
        const newImageUrl = await getSignedUrl(response.data.image_id);
        setImage(newImageUrl);
        setImageLabel(response.data.image_id);
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: "이미지가 재생성되었습니다." },
        ]);
      }
    } catch (error) {
      console.error("Failed to regenerate image:", error);
      setMessages((prev) => [
        ...prev,
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
