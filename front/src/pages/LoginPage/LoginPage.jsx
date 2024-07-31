import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  PageContainer,
  BackgroundContainer,
  BackgroundImage,
  LoginContainer,
  Title,
  Input,
  PasswordInput,
  Button,
  LinkContainer,
  Link,
} from "./LoginPage.styles";
import backgroundImg from "../../assets/images/login-page-background.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 추가해야함
    console.log("Login submitted");
  };

  return (
    <PageContainer>
      <Navbar />
      <BackgroundContainer>
        <BackgroundImage src={backgroundImg} alt="Background" />
      </BackgroundContainer>
      <LoginContainer>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Title>Log In</Title>
          <Input type="text" placeholder="Email" />
          <PasswordInput
            type="password"
            name="password_custom"
            placeholder="Password"
            autoComplete="new-password"
            data-form-type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LinkContainer>
            <Link href="#" onClick={handleCreateAccountClick}>
              새 계정 생성하기
            </Link>
            <Link href="#">비밀번호 찾기</Link>
          </LinkContainer>
          <Button type="submit">로그인</Button>
        </form>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;
