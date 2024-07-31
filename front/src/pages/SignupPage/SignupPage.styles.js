import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  font-family: NanumSquare;
  overflow: hidden;
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  top: 60px;
  z-index: -1;
  overflow: hidden; /* 배경이 스크롤 시 비치지 않도록 설정 */
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SignupContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: "IM FELL Double Pica", serif;
  font-weight: bold;
  color: #000;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #000;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Nanumsquare";
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #000;
`;

export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const Link = styled.a`
  font-size: 0.875rem;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
