import { createFileRoute } from "@tanstack/react-router";
import { GoogleGenAI } from "@google/genai";

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { config } = await import("dotenv");
          config({ path: ".env.local" });

          const apiKey = process.env.GEMINI_API_KEY;

          if (!apiKey) {
            return Response.json(
              { error: "Gemini API key is not configured." },
              { status: 500 },
            );
          }

          const body = await request.json();
          const text = body.text;

          if (typeof text !== "string" || !text.trim()) {
            return Response.json(
              { error: "Please provide threat details." },
              { status: 400 },
            );
          }

          if (text.length > 4000) {
            return Response.json(
              { error: "Input is too long. Maximum 4000 characters." },
              { status: 400 },
            );
          }

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `
            You are Sentinel AI, a cybersecurity threat analysis assistant.

            Analyse the following user-provided message or threat description.

            Provide:
            1. Threat category
            2. Severity: Low, Medium, High, or Critical
            3. Suspicious indicators
            4. Explanation of the potential risk
            5. Recommended protective actions

            Be accurate and cautious. Do not claim that a threat
            is confirmed when the available information is insufficient.

            Threat details:
            ${text}
          `;

          let response;
          let lastError;

          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              response = await ai.models.generateContent({
                model: "gemini-3.5-flash-lite",
                contents: prompt,
              });

              break;
            } catch (error) {
              lastError = error;

              const status = Number(
                (error as { status?: number })?.status
              );

              const retryable =
                status === 429 ||
                status === 503 ||
                (status >= 500 && status <= 599);

              if (!retryable || attempt === 3) {
                throw error;
              }

              await new Promise((resolve) =>
                setTimeout(resolve, attempt * 1500)
              );
            }
          }

          if (!response) {
            throw lastError || new Error("Analysis failed.");
          }

          return Response.json({
            analysis: response.text || "No analysis was generated.",
          });

        } catch (error) {
          console.error("Gemini analysis error:", error);

          return Response.json(
            {
              error: "Threat analysis is temporarily unavailable. Please try again shortly.",
            },
            { status: 503 },
          );
        }
      },
    },
  },
});