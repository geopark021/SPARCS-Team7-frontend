import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #eeeae2;
  height: 100vh;
  padding-top: 80px; /* Navbar 높이만큼 패딩 추가 */
`;

export const Header = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: "NanumSquare";
  text-align: center;
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
  /* 스크롤바 스타일링 추가 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
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
`;

export const Message = styled.p`
  margin: 0;
  font-family: "NanumSquare";
`;

export const Option = styled.button`
  background-color: #ffebcd;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: #ffc107;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #e1e1e1;
  border-radius: 1rem;
  padding: 0.5rem;
  max-width: 75%;
`;

export const ImageWrapper = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 1rem;
`;

export const Label = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  border-radius: 30px;
  background: #bfab8d;
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;
`;

export const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }

  &:first-child {
    margin-right: 1rem;
  }
`;

export const RefreshButton = styled(Button)`
  background-color: transparent;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const RefreshIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

export const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: "NanumSquare";
  font-weight: bold;
`;

export const ModalContent = styled.p`
  margin-bottom: 1.5rem;
  font-family: "NanumSquare";
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const ModalButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
