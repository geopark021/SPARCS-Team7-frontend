import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, LogoContainer, Logo, UserSection, Button } from "./Navbar.styles";
import logo from "../../assets/icons/book-report-logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <Nav>
      <LogoContainer onClick={handleLogoClick}>
        <Logo src={logo} alt="Book Report Logo" />
      </LogoContainer>
      <UserSection>
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={handleMyPageClick}>MyPage</Button>
      </UserSection>
    </Nav>
  );
};

export default Navbar;
