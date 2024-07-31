import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "./ChatBotPage.styles";
import chatBotIcon from "../../assets/icons/chat-bot-icon.png";
import chatAiGenBtn from "../../assets/icons/chat-ai-img-gen-btn-active.png";

const ChatBotPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstOptions, setFirstOptions] = useState([]);
  const [secondOptions, setSecondOptions] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState(null);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.choices && location.state.content) {
      setFirstOptions(location.state.choices);
      setContent(location.state.content);
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

  const handleSubmit = () => {
    if (selectedSecondOption) {
      navigate("/imageresult", {
        state: { selectedOption: selectedSecondOption },
      });
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
            <Message>다음 중 어떤 장면을 이미지로 생성하시겠습니까?</Message>
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
              <Message>
                선택하신 장면에 대한 세부 옵션을 생성 중입니다...
              </Message>
            </ChatBotMessage>
          </MessageContainer>
        )}
        {secondOptions.length > 0 && (
          <>
            <MessageContainer>
              <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
              <ChatBotMessage>
                <Message>
                  선택하신 장면에 대한 세부 옵션입니다. 어떤 것을
                  선택하시겠습니까?
                </Message>
              </ChatBotMessage>
            </MessageContainer>
            {secondOptions.map((option, index) => (
              <MessageContainer key={index}>
                <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
                <ChatBotMessage>
                  <Option
                    onClick={() => handleSecondOptionClick(option)}
                    isSelected={selectedSecondOption === option}
                  >
                    {option}
                  </Option>
                </ChatBotMessage>
              </MessageContainer>
            ))}
          </>
        )}
        {selectedSecondOption && (
          <MessageContainer>
            <UserMessage>{selectedSecondOption}</UserMessage>
          </MessageContainer>
        )}
      </ChatContainer>
      <InputContainer>
        <SubmitButton onClick={handleSubmit} disabled={!selectedSecondOption}>
          <img src={chatAiGenBtn} alt="이미지 생성하기" />
        </SubmitButton>
      </InputContainer>
    </PageContainer>
  );
};

export default ChatBotPage;
