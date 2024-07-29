import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh; /* 100vh에서 min-height로 변경 */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 중앙 정렬에서 상단 정렬로 변경 */
  background-color: #eeeae2;
  padding-top: 80px; /* Navbar 높이만큼 패딩 추가 */
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

export const SubmitButton = styled.button`
  background: #5a5a5a;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  align-self: center;
  margin-top: 1rem;
  font-size: 1.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;

export const ColorButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const ColorButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: ${(props) =>
    props.isSelected ? "0 0 0 3px rgba(0, 0, 0, 0.2)" : "none"};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const ColorFieldSet = styled(FieldSet)`
  align-items: center;
`;
