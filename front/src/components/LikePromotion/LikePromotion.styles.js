import styled from "styled-components";

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    height: 24rem;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4rem; /* 그라데이션 높이 설정 */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    pointer-events: none;
  }
`;

export const SliderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  padding: 0.5rem;
  z-index: 10;
`;

export const LeftButton = styled(SliderButton)`
  left: 0.5rem;
`;

export const RightButton = styled(SliderButton)`
  right: 0.5rem;
`;

export const DotContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

export const Dot = styled.span`
  height: 8px;
  width: 8px;
  border-radius: 9999px;
  background-color: ${(props) => (props.active ? "#3b82f6" : "#d1d5db")};
`;
