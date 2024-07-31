import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, BackgroundImage, ArrowButton } from "./InitialPage.styles";

const InitialPage = () => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate("/main");
  };

  return (
    <Container>
      <BackgroundImage />
      <ArrowButton onClick={handleArrowClick} />
    </Container>
  );
};

export default InitialPage;
