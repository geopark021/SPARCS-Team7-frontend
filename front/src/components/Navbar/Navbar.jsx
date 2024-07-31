import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, LogoContainer, Logo, UserSection, Button } from "./Navbar.styles";
//import logo from "../../assets/icons/book-report-logo.png"; // 검은색 원본
import logo from "../../assets/icons/book-report-logo2.png"; // 빨간색
import { fetchUserBooks } from "../../utils/api"; // API 호출 함수 임포트

const Navbar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleMyPageClick = async () => {
    console.log("MyPage 버튼 클릭됨");
    if (email) {
      try {
        const userBooks = await fetchUserBooks(email);
        console.log("User Books:", userBooks); // 가져온 독후감 목록 확인
        navigate("/mypage", { state: { userBooks } });
      } catch (error) {
        console.error("Error fetching user books:", error);
        navigate("/mypage", { state: { userBooks: [] } }); // 오류 발생 시에도 MyPage로 이동
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Nav>
      <LogoContainer onClick={handleLogoClick}>
        <Logo src={logo} alt="Book Report Logo" />
      </LogoContainer>
      <UserSection>
        <Button onClick={handleLoginClick}>Login</Button>
        {email ? (
          <>
            <Button onClick={handleMyPageClick}>MyPage</Button>
          </>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
      </UserSection>
    </Nav>
  );
};

export default Navbar;
