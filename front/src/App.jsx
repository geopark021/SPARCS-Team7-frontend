import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InitialPage from "./pages/InitialPage/InitialPage";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";
import ImageResultPage from "./pages/ImageResultPage/ImageResultPage";
import ReviewWithPhotoPage from "./pages/ReviewWithPhotoPage/ReviewWithPhotoPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/review-photo" element={<ReviewWithPhotoPage />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/imageresult" element={<ImageResultPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
