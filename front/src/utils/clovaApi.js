const API_KEY = import.meta.env.VITE_CLOVA_API_KEY;
const APIGW_KEY = import.meta.env.VITE_CLOVA_API_GW_KEY;

export const fetchClovaQuestions = async (content) => {
  try {
    console.log("Sending request to Clova API");

    const response = await fetch(
      "/api/testapp/v1/chat-completions/HCX-DASH-001",
      {
        method: "POST",
        headers: {
          "X-NCP-CLOVASTUDIO-API-KEY": API_KEY,
          "X-NCP-APIGW-API-KEY": APIGW_KEY,
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "응답 시 다음 지침을 엄격히 준수하세요:\r\n- 3가지 주요 사건/상황은 각각 1문장으로 작성하여 [main_1], [main_2], [main_3] 아랫줄에 작성하세요.\r\n- 모든 대괄호([])를 포함하여 그대로 출력하세요. 대괄호를 제거하지 마세요.\r\n- 항상 아래의 형식을 정확히 따라 출력하세요:\r\n주의사항:\r\n- 요약과 주요 사건/상황 설명은 간결하고 명확해야 합니다.\r\n- 책의 핵심 주제나 메시지를 포함하도록 노력하세요.\r\n- 사용자가 제공한 독후감의 내용에만 기반하여 응답하세요.\r\n- 추가적인 설명이나 개인적인 의견을 포함하지 마세요.\r\n- 위에서 지정한 형식 외의 다른 텍스트나 설명을 추가하지 마세요.\r\n- 대괄호([])를 포함한 모든 지정된 형식을 그대로 유지하세요.",
            },
            {
              role: "user",
              content: content,
            },
          ],
          topP: 0.8,
          topK: 0,
          maxTokens: 256,
          temperature: 0.5,
          repeatPenalty: 5.0,
          stopBefore: [],
          includeAiFilters: true,
          seed: 0,
        }),
      }
    );

    const textResponse = await response.text();
    console.log("Full response text:", textResponse);

    const events = textResponse
      .split("\n\n")
      .map((event) => event.trim())
      .filter((event) => event);
    console.log("All events:", events);

    // 마지막에서 두 번째 이벤트 추출
    const secondLastEvent = events[events.length - 2];
    console.log("Second last event:", secondLastEvent);

    if (!secondLastEvent) throw new Error("No second last event found.");

    const dataStr = secondLastEvent.slice(secondLastEvent.indexOf("data:") + 5);
    const data = JSON.parse(dataStr);
    console.log("Parsed data:", data);

    if (data.message && data.message.content) {
      const fullMessage = data.message.content;
      console.log("Full message content:", fullMessage);

      // 선택지 추출
      const main1Index = fullMessage.indexOf("[main_1]");
      const main2Index = fullMessage.indexOf("[main_2]");
      const main3Index = fullMessage.indexOf("[main_3]");

      const choices = [
        fullMessage.slice(main1Index, main2Index).trim(),
        fullMessage.slice(main2Index, main3Index).trim(),
        fullMessage.slice(main3Index).trim(),
      ];

      console.log("Extracted choices:", choices);

      return { choices };
    } else {
      throw new Error("No valid content received from Clova API.");
    }
  } catch (error) {
    console.error("Error fetching Clova questions:", error);
    throw error;
  }
};
