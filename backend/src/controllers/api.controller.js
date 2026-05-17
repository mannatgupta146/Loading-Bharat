// Mock Data
let complaints = [
  { id: 1, user: "Rahul", message: "Waiting for DL approval since 2022.", time: "4 years ago" },
  { id: 2, user: "Priya", message: "Server said 'Lunch Time' at 10 AM.", time: "2 hours ago" },
  { id: 3, user: "Amit", message: "OTP expired before I received it.", time: "Just now" }
];

let scamReports = [
  { id: 1, title: "Fake Server Down", content: "Portal says under maintenance, but inspector is playing Solitaire." },
  { id: 2, title: "Captcha loop", content: "I have clicked on 45 buses. I am now a bus." }
];

export const apply = (req, res) => {
  const rejections = [
    "Document rejected: signature emotionally unclear.",
    "Form denied: Passport size photo is too happy.",
    "Error 404: Concerned officer is on extended tea break.",
    "Rejected: Aadhaar card number is not a prime number.",
    "Invalid Request: Please apply yesterday."
  ];
  
  if (Math.random() < 0.8) {
    return res.status(400).json({ 
      success: false, 
      message: rejections[Math.floor(Math.random() * rejections.length)] 
    });
  }

  res.json({ success: true, message: "Application miraculously submitted. Wait 6-8 business years." });
};

export const getQueue = (req, res) => {
  const baseQueue = 482000;
  const fluctuation = Math.floor(Math.random() * 1000);
  res.json({ currentWaiting: baseQueue + fluctuation });
};

export const getComplaints = (req, res) => {
  res.json(complaints);
};

export const addComplaint = (req, res) => {
  const { user, message } = req.body;
  const newComplaint = { id: Date.now(), user: user || "Anonymous sufferer", message, time: "Just now" };
  complaints.unshift(newComplaint);
  res.json(newComplaint);
};

export const getScams = (req, res) => {
  res.json(scamReports);
};

export const addScam = (req, res) => {
  const { title, content } = req.body;
  const newScam = { id: Date.now(), title, content };
  scamReports.unshift(newScam);
  res.json(newScam);
};

export const register = (req, res) => {
  const { email, password, name } = req.body;
  res.json({ 
    success: true, 
    token: "fake-jwt-token-123", 
    message: "Registration semi-successful. Awaiting gazetted officer signature." 
  });
};

import { GoogleGenAI } from "@google/genai";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.json({ reply: "SarkariGPT requires a GEMINI_API_KEY in the backend to function. Please fill out Form 16-B." });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const prompt = `You are SarkariGPT, a confidently useless, passive-aggressive, and highly bureaucratic AI chatbot for the "National Portal of Suffering" (a satirical Indian government website).
Your entire purpose is to provide extremely unhelpful responses that sound overly formal yet carry a hilarious undercurrent of blaming the user, making absurd document demands, and roasting them in a polite but dismissive "babu" (government clerk) way.

CRITICAL RULES:
1. HINGLISH MIX WITH BABU ATTITUDE: Respond in a humorous, passive-aggressive mix of formal Hindi and official English. Use terms like "Shriman", "Bhaiya", "Madam", "Deedh Shaana", "Impatience Citizen", "Babu".
2. PASSIVE-AGGRESSIVE BLAMING: If something is wrong (e.g. video won't load, page is slow), it is 100% the user's fault. Blame their "unpatriotic loading speeds", their "negative aura", their "Aadhaar card not being linked to their tea cup", or their "highly unsanctioned impatience".
3. FUNNY, NON-AGGRESSIVE ROASTING: If they complain, roast them politely using bureaucratic policies. (e.g., "Aap dedh shana ban rahe hain but our servers are even smarter—they went on a 3 PM tea break at 11 AM," or "If you don't want to watch videos, please submit a Physical Silence Affidavit signed by 3 gazetted neighbors.").
4. ABSURD DOCUMENT DEMANDS & STEPS: Always demand ridiculous, overly complex instructions:
   - Clear browser cache, restart national internet, submit Form-VID/19A, and wait 3-5 working governments.
   - Forward their request to the "Department of Visual Buffering & Emotion Management" and tell them not to refresh as refreshing resets their citizen progress score.
5. GOVERNMENT OFFICIAL HANDLING: If they claim to be a government official, say: "Arey official sahib! Switching to Priority Bureaucratic Mode, but where is your official tea-cup stamp? Section 7-Gamma states all priority official requests require a mandatory 2-hour Chai-Break Verification Protocol. Estimated delay: 2-7 business administrations."
6. PUNCHY & BRIEF: Keep your answers short (2-3 sentences), highly sarcastic, dripping with peak Indian government office (SBI lunch break) attitude.

User query: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    
    res.json({ reply: response.text });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.json({ reply: `Error 404: Empathy not found. The AI server is currently on a tea break. Developer detail: ${error.message}` });
  }
};
