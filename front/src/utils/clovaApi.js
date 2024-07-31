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
                "다음 <안내상황>을 순서대로 이행하세요\n<안내상황>\n1.입력받은  내용에서 나타난 감상들이나 사건들을 보고 생각난 감정 3가지를 생각하세요\n2. 생각한 감정 3가지를 각각 무조건 한 단어으로 요약하세요\n3. 요약한 문장을 <example> 에 맞게 무조건 한번만 출력해주세요\n</안내상황>\n\n<example>\n[main_1] 충격\n[main_2] 죽음\n[main_3] 안타까움\n</example>\n\n\n",
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

    const secondLastEvent = events[events.length - 2];
    console.log("Second last event:", secondLastEvent);

    if (!secondLastEvent) throw new Error("No second last event found.");

    const dataStr = secondLastEvent.slice(secondLastEvent.indexOf("data:") + 5);
    const data = JSON.parse(dataStr);
    console.log("Parsed data:", data);

    if (data.message && data.message.content) {
      const fullMessage = data.message.content;
      console.log("Full message content:", fullMessage);

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
