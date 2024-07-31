import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { fetchClovaSecondQuestions } from "../../utils/clovaSecondApi";
import {
  PageContainer,
  Header,
  ChatContainer,
  MessageContainer,
  Message,
  UserMessage,
  ChatBotIcon,
  ChatBotMessage,
  Option,
  SubmitButton,
  InputContainer,
  ImageOptionContainer,
  ImageOption,
} from "./ChatBotPage.styles";
import chatBotIcon from "../../assets/icons/chat-bot-icon.png";
import chatAiGenBtn from "../../assets/icons/chat-ai-img-gen-btn-active.png";
import dalleImgBtn from "../../assets/icons/chatbot-dalle-img.png";
import lockedImgBtn from "../../assets/icons/chatbot-locked-img.png";

const ChatBotPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstOptions, setFirstOptions] = useState([]);
  const [secondOptions, setSecondOptions] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState(null);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (location.state) {
      const { choices, content, bookTitle, color } = location.state;
      if (choices && content) {
        setFirstOptions(choices);
        setContent(content);
      }
      if (bookTitle) setBookTitle(bookTitle);
      if (color) setSelectedColor(color);
    }
  }, [location.state]);

  const handleFirstOptionClick = async (option) => {
    setSelectedFirstOption(option);
    setLoading(true);
    try {
      const response = await fetchClovaSecondQuestions(content, option);
      setSecondOptions(response.choices);
    } catch (error) {
      console.error("Failed to fetch second questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSecondOptionClick = (option) => {
    setSelectedSecondOption(option);
  };

  const sendBookInfoToServer = async () => {
    try {
      const data = {
        bookTitle: bookTitle,
        color: selectedColor,
      };
      console.log("Sending data to server:", data);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books/new/send`,
        data
      );

      if (response.data.code === "SU") {
        console.log("Server response:", response.data);
        return response.data.image_id;
      } else {
        throw new Error("Failed to send book info");
      }
    } catch (error) {
      console.error("Error sending book info:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (selectedSecondOption) {
      try {
        setLoading(true);
        const imageId = await sendBookInfoToServer();
        navigate("/imageresult", {
          state: {
            selectedOption: selectedSecondOption,
            imageId: imageId,
            bookTitle: bookTitle,
            color: selectedColor,
          },
        });
      } catch (error) {
        alert("이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("두 번째 옵션을 선택해주세요.");
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <ChatContainer>
        <Header>이미지 생성하기</Header>
        <MessageContainer>
          <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
          <ChatBotMessage>
            <Message>
              안녕하세요! <br />
              당신의 독후감 덕분에 영감을 받고 펜을 들게된 AI 화가 BaB 입니다.
              그림 완성을 위해 도움이 필요합니다!
            </Message>
          </ChatBotMessage>
        </MessageContainer>
        {firstOptions.map((option, index) => (
          <MessageContainer key={index}>
            <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
            <ChatBotMessage>
              <Option
                onClick={() => handleFirstOptionClick(option)}
                isSelected={selectedFirstOption === option}
              >
                {option}
              </Option>
            </ChatBotMessage>
          </MessageContainer>
        ))}
        {selectedFirstOption && (
          <MessageContainer>
            <UserMessage>{selectedFirstOption}</UserMessage>
          </MessageContainer>
        )}
        {loading && (
          <MessageContainer>
            <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
            <ChatBotMessage>
              <Message>다음 질문을 생성 중 입니다.</Message>
            </ChatBotMessage>
          </MessageContainer>
        )}
        {secondOptions.length > 0 && (
          <>
            <MessageContainer>
              <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
              <ChatBotMessage>
                <Message>
                  답변 감사합니다. <br /> 자, 그럼 어떤 도구으로 그림을
                  완성해볼까요?
                </Message>
                <ImageOptionContainer>
                  <ImageOption
                    src={dalleImgBtn}
                    alt="DALL-E"
                    onClick={() => handleSecondOptionClick("DALL-E")}
                    isSelected={selectedSecondOption === "DALL-E"}
                  />
                  <ImageOption
                    src={lockedImgBtn}
                    alt="Locked Option 1"
                    style={{ cursor: "not-allowed" }}
                  />
                  <ImageOption
                    src={lockedImgBtn}
                    alt="Locked Option 2"
                    style={{ cursor: "not-allowed" }}
                  />
                </ImageOptionContainer>
              </ChatBotMessage>
            </MessageContainer>
          </>
        )}
        {selectedSecondOption && (
          <>
            <MessageContainer>
              <UserMessage>{selectedSecondOption}</UserMessage>
            </MessageContainer>
            <MessageContainer>
              <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
              <ChatBotMessage>
                <Message>
                  잘 알겠습니다~
                  <br />
                  좋은 그림으로 보답드리지요!!
                </Message>
              </ChatBotMessage>
            </MessageContainer>
          </>
        )}
      </ChatContainer>
      <InputContainer>
        <SubmitButton
          onClick={handleSubmit}
          disabled={!selectedSecondOption || loading}
        >
          <img src={chatAiGenBtn} alt="이미지 생성하기" />
        </SubmitButton>
      </InputContainer>
    </PageContainer>
  );
};

export default ChatBotPage;
