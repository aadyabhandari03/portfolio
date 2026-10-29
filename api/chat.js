const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-20b";
const MAX_QUESTION_LENGTH = 500;

const SYSTEM_PROMPT =
  "You are a friendly portfolio chatbot. Keep replies under 60 words. If you do not know a personal detail, say so rather than inventing it.";

function readQuestion(body) {
  if (!body) {
    return "";
  }
  if (typeof body === "string") {
    try {
      return JSON.parse(body).question || "";
    } catch {
      return "";
    }
  }
  return body.question || "";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Chat is not configured on the server." });
  }

  const question = String(readQuestion(req.body)).trim();
  if (!question) {
    return res.status(400).json({ error: "Please type a question." });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: "Question is too long." });
  }

  try {
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
      }),
    });

    if (!groqResponse.ok) {
      if (groqResponse.status === 401) {
        return res.status(502).json({ error: "Chat service rejected the server credentials." });
      }
      if (groqResponse.status === 429) {
        return res.status(429).json({ error: "Too many requests. Wait and try again." });
      }
      return res.status(502).json({ error: "Chat service request failed." });
    }

    const data = await groqResponse.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : "";

    return res.status(200).json({ reply: reply || "No reply received." });
  } catch {
    return res.status(502).json({ error: "Chat is temporarily unavailable." });
  }
};
