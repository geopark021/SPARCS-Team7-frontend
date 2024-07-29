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
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LoginContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;

  form {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: "IM FELL Double Pica", serif;
  font-weight: 1000;
  color: #000;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
  caret-color: #000;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;

export const PasswordInput = styled(Input)`
  &::placeholder {
    color: rgba(0, 0, 0, 0.3) !important;
    opacity: 1 !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: #000 !important;
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.5) inset !important;
    box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.5) inset !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &::selection {
    background-color: rgba(0, 0, 0, 0.1) !important;
    color: #000 !important;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Link = styled.a`
  font-size: 0.875rem;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
