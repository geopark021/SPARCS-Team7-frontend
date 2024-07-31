// src/pages/SignupPage/SignupPage.jsx

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { registerUser, checkEmailDuplicate } from "../../utils/api";
import {
  PageContainer,
  BackgroundContainer,
  BackgroundImage,
  SignupContainer,
  Title,
  Input,
  Button,
  CheckboxContainer,
  CheckboxLabel,
  LinkContainer,
  Link,
} from "./SignupPage.styles";
import backgroundImg from "../../assets/images/login-page-background.png";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emailCheckMessage, setEmailCheckMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 이메일 중복 검사
  const handleEmailCheck = async () => {
    try {
      const response = await checkEmailDuplicate(formData.email);
      if (response.isDuplicate) {
        setEmailCheckMessage("이미 사용 중인 이메일입니다."); // 초록색 표시
      } else {
        setEmailCheckMessage("사용 가능한 이메일입니다."); // 빨간색 표시
      }
    } catch (error) {
      setEmailCheckMessage("이메일 중복 검사를 실패했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setSuccess(response.message);
      setError(null);
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <BackgroundContainer>
        <BackgroundImage src={backgroundImg} alt="Background" />
      </BackgroundContainer>
      <SignupContainer>
        <Title>Hello Artist!</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              onClick={handleEmailCheck}
              style={{ marginLeft: "10px" }}
            >
              중복검사
            </Button>
          </div>
          {emailCheckMessage && <p>{emailCheckMessage}</p>}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <CheckboxContainer>
            <input type="checkbox" id="terms" required />
            <CheckboxLabel htmlFor="terms">
              <a href="#">이용 약관</a>을 읽고 동의했습니다.
            </CheckboxLabel>
          </CheckboxContainer>
          <Button type="submit">계정 생성</Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <LinkContainer>
          <Link href="/login">이미 계정이 있으신가요? 로그인하기</Link>
        </LinkContainer>
      </SignupContainer>
    </PageContainer>
  );
};

export default SignupPage;
