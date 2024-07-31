// src/utils/api.js

const baseURL = import.meta.env.VITE_API_URL;
const bucketName = import.meta.env.VITE_NCP_BUCKET_NAME;

// 로그인 API 호출 함수
export const loginUser = async (loginData) => {
  try {
    console.log("Sending login request with data:", JSON.stringify(loginData));

    const response = await fetch(`${baseURL}/books/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const responseText = await response.text();
    console.log("Response body:", responseText);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// 회원 가입 API 호출 함수
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${baseURL}/books/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// 이메일 중복 검사 API 호출 함수
export const checkEmailDuplicate = async (email) => {
  try {
    const data = new URLSearchParams();
    data.append("email", email);

    const response = await fetch(`${baseURL}/books/register/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    console.error("Error checking email duplicate:", error);
    throw error;
  }
};

// Naver Cloud Object Storage에서 이미지 목록 가져오는 함수
export const fetchImages = async () => {
  try {
    const response = await fetch(`/ncloud/${bucketName}?list-type=2`);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const keys = xmlDoc.getElementsByTagName("Key");

    const imageUrls = Array.from(keys).map(
      (key) => `/ncloud/${bucketName}/${key.textContent}`
    );
    return imageUrls;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

// 본인 독후감 불러오기 API 호출 함수
export const fetchUserBooks = async (email) => {
  try {
    const response = await fetch(
      `${baseURL}/books/my?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const responseText = await response.text();
    console.log("Response body:", responseText);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const data = JSON.parse(responseText);

    // rp_id가 "Empty"인 경우 처리
    if (data.rp_id === "Empty") {
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching user books:", error);
    throw error;
  }
};
