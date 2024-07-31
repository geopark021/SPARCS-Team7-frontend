import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  max-width: auto;
  margin: 0 auto;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/images/initial-page-all-without-arrow-img.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, 0);
  margin-left: 50%;
  animation: ${fadeIn} 1s ease-in-out;
`;

export const ArrowButton = styled.button`
  width: 50px;
  height: 50px;
  background-image: url("/src/assets/icons/initial-page-meet-reading-exp-background-arrow-btn.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  animation: ${fadeIn} 2s ease-in-out 1s forwards;
  opacity: 0;
`;
