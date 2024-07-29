import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import chatAiGenBtn from "../../assets/icons/chat-ai-img-gen-btn.png";

const ChatBotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "글을 보니 다음과 같은 감정을 느끼신 것 같아요. 맞으신가요?",
      options: ["기쁨", "분노", "슬픔", "두려움"],
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleOptionClick = (option) => {
    const newMessage = {
      type: "user",
      content: option,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // 응답 봇 적는 곳
  };

  const handleSubmit = () => {
    // 제출 내용 적용
    navigate("/imageresult");
  };

  return (
    <PageContainer>
      <Navbar />
      <ChatContainer>
        <Header>이미지 생성하기</Header>
        {messages.map((message, index) => (
          <MessageContainer key={index}>
            {message.type === "bot" ? (
              <>
                <ChatBotIcon src={chatBotIcon} alt="Chat Bot" />
                <ChatBotMessage>
                  <Message>{message.content}</Message>
                  {message.options &&
                    message.options.map((option, idx) => (
                      <Option
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </Option>
                    ))}
                </ChatBotMessage>
              </>
            ) : (
              <UserMessage>{message.content}</UserMessage>
            )}
          </MessageContainer>
        ))}
      </ChatContainer>
      <InputContainer>
        <SubmitButton onClick={handleSubmit}>
          <img src={chatAiGenBtn} alt="이미지 생성하기" />
        </SubmitButton>
      </InputContainer>
    </PageContainer>
  );
};

export default ChatBotPage;
