const API_KEY = import.meta.env.VITE_CLOVA_API_KEY;
const APIGW_KEY = import.meta.env.VITE_CLOVA_API_GW_KEY;

export const fetchClovaSecondQuestions = async (content, selectedChoice) => {
  try {
    console.log("Sending request to Clova API for second choices");

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
              content: "",
            },
            {
              role: "user",
              content: `독후감 내용: ${content}\n\n선택한 장면: ${selectedChoice}`,
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
    console.log("Full response text for second API:", textResponse);

    const events = textResponse
      .split("\n\n")
      .map((event) => event.trim())
      .filter((event) => event);
    console.log("All events for second API:", events);

    const secondLastEvent = events[events.length - 2];
    console.log("Second last event for second API:", secondLastEvent);

    if (!secondLastEvent)
      throw new Error("No second last event found for second API.");

    const dataStr = secondLastEvent.slice(secondLastEvent.indexOf("data:") + 5);
    const data = JSON.parse(dataStr);
    console.log("Parsed data for second API:", data);

    if (data.message && data.message.content) {
      const fullMessage = data.message.content;
      console.log("Full message content for second API:", fullMessage);

      const scene1Index = fullMessage.indexOf("[sub_1]");
      const scene2Index = fullMessage.indexOf("[sub_2]");
      const scene3Index = fullMessage.indexOf("[sub_3]");

      const choices = [
        fullMessage.slice(scene1Index, scene2Index).trim(),
        fullMessage.slice(scene2Index, scene3Index).trim(),
        fullMessage.slice(scene3Index).trim(),
      ];

      console.log("Extracted second choices:", choices);

      return { choices };
    } else {
      throw new Error(
        "No valid content received from Clova API for second choices."
      );
    }
  } catch (error) {
    console.error("Error fetching Clova second questions:", error);
    throw error;
  }
};
