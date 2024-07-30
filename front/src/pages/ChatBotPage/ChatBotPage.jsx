import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
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
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (location.state && location.state.choices) {
      setOptions(location.state.choices);
    }
  }, [location.state]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      navigate("/imageresult", { state: { selectedOption } });
    } else {
      alert("옵션을 선택해주세요.");
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
        {options.map((option, index) => (
          <MessageContainer key={index}>
            <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
            <ChatBotMessage>
              <Option
                onClick={() => handleOptionClick(option)}
                isSelected={selectedOption === option}
              >
                {option}
              </Option>
            </ChatBotMessage>
          </MessageContainer>
        ))}
        {selectedOption && (
          <MessageContainer>
            <UserMessage>{selectedOption}</UserMessage>
          </MessageContainer>
        )}
      </ChatContainer>
      <InputContainer>
        <SubmitButton onClick={handleSubmit} disabled={!selectedOption}>
          <img src={chatAiGenBtn} alt="이미지 생성하기" />
        </SubmitButton>
      </InputContainer>
    </PageContainer>
  );
};

export default ChatBotPage;
