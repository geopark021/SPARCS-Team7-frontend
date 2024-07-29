import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(238, 234, 226, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: fixed;
  width: 100%;
  top: 0;
  backdrop-filter: blur(10px);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: NanumSquare;
  font-weight: 1000;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: color 0.3s;
  font-family: "IM FELL Double Pica", serif;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;
