import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #eeeae2;
  min-height: 100vh;
  padding-top: 80px;
`;

export const ReviewForm = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

export const FieldSet = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  position: relative;
`;

export const FieldLabel = styled.div`
  font-weight: bold;
  margin-right: 1rem;
  border-radius: 30px;
  background: #e5daca;
  width: 120px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const FieldValue = styled.div`
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 0.25rem;
  flex: 1;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  position: relative;
`;

export const CharCount = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  color: #555;
`;

export const PhotoUploadContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PhotoUploadButton = styled.img`
  width: 110px;
  height: auto;
  cursor: pointer;
  margin-left: 1rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  width: 48%;

  &:hover {
    background-color: #555;
  }
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
