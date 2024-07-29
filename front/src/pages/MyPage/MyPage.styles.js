import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  flex: 1;
  padding-top: 60px;
  width: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.7); /* 배경색을 더 어둡게 설정 */
`;

export const CustomContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 400px;
  background-color: #f5f5f0;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -70px;
  border: 5px solid #f5f5f0;
`;

export const ProfileName = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0.5rem 0;
  background-color: #786b54;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-right: 5px;
`;

export const StatCount = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

export const IconSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 1rem 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin-bottom: 5px;
`;

export const IconUnderline = styled.div`
  width: 30px;
  height: 2px;
  background-color: ${(props) => (props.isActive ? "#3B2607" : "transparent")};
  transition: background-color 0.3s ease;
`;

export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  padding: 0 10px 10px 10px;
`;

export const PostImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.5rem;
`;
