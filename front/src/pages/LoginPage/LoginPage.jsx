// src/pages/LoginPage/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { loginUser } from "../../utils/api";
import {
  PageContainer,
  BackgroundContainer,
  BackgroundImage,
  LoginContainer,
  Title,
  Input,
  Button,
  LinkContainer,
  Link,
} from "./LoginPage.styles";
import backgroundImg from "../../assets/images/login-page-background.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      console.log("[JSON화된 내용]:", JSON.stringify(loginData));
      const response = await loginUser(loginData);
      console.log("[응답 데이터]:", JSON.stringify(response));
      if (response.code === "SU") {
        localStorage.setItem("userEmail", email); // 로그인 성공 시 이메일 저장
        navigate("/main");
      } else {
        console.error("Login failed:", response.message);
        setError(response.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      setError("Login failed. Please try again.");
    }
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
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            style={{ color: "black" }}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;
