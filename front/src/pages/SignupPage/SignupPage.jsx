import React from "react";
import Navbar from "../../components/Navbar/Navbar";
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
  return (
    <PageContainer>
      <Navbar />
      <BackgroundContainer>
        <BackgroundImage src={backgroundImg} alt="Background" />
      </BackgroundContainer>
      <SignupContainer>
        <Title>Hello Artist!</Title>
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <CheckboxContainer>
          <input type="checkbox" id="terms" />
          <CheckboxLabel htmlFor="terms">
            I've read and agree to the <a href="#">Terms & Conditions</a>
          </CheckboxLabel>
        </CheckboxContainer>
        <Button>Create Account</Button>
        <LinkContainer>
          <Link href="/login">Already have an account? Log In</Link>
        </LinkContainer>
      </SignupContainer>
    </PageContainer>
  );
};

export default SignupPage;
