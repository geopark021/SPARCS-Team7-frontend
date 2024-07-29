import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PlusButton from "../../components/PlusButton/PlusButton";
import {
  PageContainer,
  ContentContainer,
  CustomContainer,
  ProfileSection,
  ProfileImage,
  ProfileName,
  ProfileStats,
  Stat,
  StatLabel,
  StatCount,
  IconSection,
  IconWrapper,
  Icon,
  IconUnderline,
  PostGrid,
  PostImage,
} from "./MyPage.styles";
import myPageBackgroundImg from "../../assets/images/my-page-background-img.png";
import myPageMyUploadReportIconClicked from "../../assets/icons/my-page-my-upload-report-icon-clicked.png";
import myPageMyUploadReportIconUnclicked from "../../assets/icons/my-page-my-upload-report-icon-unclicked.png";
import myPageLikedIconClicked from "../../assets/icons/my-page-liked-icon-clicked.png";
import myPageLikedIconUnclicked from "../../assets/icons/my-page-liked-icon-unclicked.png";
import profileImage from "../../assets/images/profile-image.png";
import postImage1 from "../../assets/images/report-most-liked_1.png";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("uploads");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer
        style={{ backgroundImage: `url(${myPageBackgroundImg})` }}
      >
        <CustomContainer>
          <ProfileSection>
            <ProfileImage src={profileImage} alt="Profile" />
            <ProfileName>MINJI NAM</ProfileName>
            <ProfileStats>
              <Stat>
                <StatLabel>POST</StatLabel>
                <StatCount>100</StatCount>
              </Stat>
              <Stat>
                <StatLabel>LIKE</StatLabel>
                <StatCount>100</StatCount>
              </Stat>
            </ProfileStats>
            <IconSection>
              <IconWrapper>
                <Icon
                  src={
                    activeTab === "uploads"
                      ? myPageMyUploadReportIconClicked
                      : myPageMyUploadReportIconUnclicked
                  }
                  alt="My Uploads"
                  onClick={() => handleTabChange("uploads")}
                  isActive={activeTab === "uploads"}
                />
                <IconUnderline isActive={activeTab === "uploads"} />
              </IconWrapper>
              <IconWrapper>
                <Icon
                  src={
                    activeTab === "liked"
                      ? myPageLikedIconClicked
                      : myPageLikedIconUnclicked
                  }
                  alt="Liked Posts"
                  onClick={() => handleTabChange("liked")}
                  isActive={activeTab === "liked"}
                />
                <IconUnderline isActive={activeTab === "liked"} />
              </IconWrapper>
            </IconSection>
          </ProfileSection>
          <PostGrid>
            {activeTab === "uploads" ? (
              <>
                <PostImage src={postImage1} alt="Uploaded Post" />
                <PostImage src={postImage1} alt="Uploaded Post" />
                <PostImage src={postImage1} alt="Uploaded Post" />
                <PostImage src={postImage1} alt="Uploaded Post" />
                <PostImage src={postImage1} alt="Uploaded Post" />
                <PostImage src={postImage1} alt="Uploaded Post" />
              </>
            ) : (
              <>
                <PostImage src={postImage1} alt="Liked Post" />
                <PostImage src={postImage1} alt="Liked Post" />
                <PostImage src={postImage1} alt="Liked Post" />
              </>
            )}
          </PostGrid>
        </CustomContainer>
        <PlusButton />
      </ContentContainer>
    </PageContainer>
  );
};

export default MyPage;
