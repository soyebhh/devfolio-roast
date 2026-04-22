# DevFolio Roast 🔥

> Get your developer portfolio **brutally reviewed by AI**. Receive detailed scores, actionable feedback, and a savage roast line.

**Live Demo:** [devfolioroast.vercel.app](https://devfolioroast.vercel.app)

---

## Features

- 🤖 **AI-Powered Review** — Uses Gemini 1.5 Flash to analyze any portfolio URL
- 📊 **5 Category Scores** — First Impression, Design, Content, Projects, SEO
- 🔥 **Savage Roast Line** — One-liner that sums up your portfolio's... personality
- 📱 **Fully Responsive** — Works beautifully on all screen sizes
- ✨ **Smooth Animations** — Count-up scores, progress bar fill, fade-in cards
- 📤 **Share Button** — Share your roast via Web Share API or clipboard

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework & build tool |
| Tailwind CSS v3 | Styling |
| @google/generative-ai | Gemini API client |
| Vercel | Deployment |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/devfolio-roast.git
cd devfolio-roast
npm install
```

### 2. Get a Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deploy to Vercel

1. Push your code to GitHub (**without** `.env` — it's gitignored)
2. Import the repo on [vercel.com](https://vercel.com)
3. In **Environment Variables**, add:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: your Gemini API key
4. Deploy!

---

## Project Structure

```
src/
├── App.jsx                 # Main app, state management
├── main.jsx                # React entry point
├── index.css               # Global styles & animations
├── components/
│   ├── Header.jsx          # Logo, subtitle, credit
│   ├── InputSection.jsx    # URL input, submit, loading messages
│   ├── LoadingState.jsx    # Animated spinner
│   ├── ResultsSection.jsx  # Overall score, roast, fixes, share
│   └── CategoryCard.jsx    # Individual category score card
└── utils/
    └── gemini.js           # Gemini API call & prompt
```

---

## Made by

**Soyeb Khan** · [soyeb.in](https://soyeb.in)
