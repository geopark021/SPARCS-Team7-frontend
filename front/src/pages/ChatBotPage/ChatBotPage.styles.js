import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #eeeae2;
  height: 100vh;
  padding-top: 80px;
`;

export const Header = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: "NanumSquare";
  text-align: center;
  color: #333;
`;

export const ChatContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 600px;
  overflow-y: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const ChatBotIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
  align-self: flex-start;
`;

export const ChatBotMessage = styled.div`
  background-color: #e1e1e1;
  border-radius: 1rem;
  padding: 1rem;
  position: relative;
  max-width: 75%;
`;

export const UserMessage = styled.div`
  background-color: #ffd700;
  border-radius: 1rem;
  padding: 1rem;
  margin-left: auto;
  max-width: 75%;
  color: #333;
`;

export const Message = styled.p`
  margin: 0;
  font-family: "NanumSquare";
  color: #333;
`;

export const Option = styled.button`
  background-color: #ffebcd;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  display: block;
  color: #333;

  &:hover {
    background-color: #ffc107;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 150px;
    height: auto;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
