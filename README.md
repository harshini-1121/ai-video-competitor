# Video Competitor Intelligence 🚀

AI-powered YouTube competitor analysis platform that compares video marketing performance between brands using YouTube Data API, interactive analytics dashboards, and automated PowerPoint report generation.

---

## 📌 Features

* 🔍 Analyze YouTube competitors
* 📊 Compare subscribers, views & engagement
* 📈 Interactive charts and rankings
* 🎥 Top performing video insights
* 🧠 AI-generated executive summary
* 📥 Download PowerPoint intelligence report
* 🌐 Full-stack deployment (Frontend + Backend)

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts
* Axios

### Backend

* Node.js
* Express.js
* YouTube Data API v3
* PptxGenJS
* Dotenv

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```bash
video-competitor-intelligence/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ReportDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── routes/
│   │   └── reportRoutes.js
│   ├── services/
│   │   ├── youtubeService.js
│   │   └── analyzeService.js
│   ├── ppt/
│   │   └── generatePPT.js
│   └── index.js
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https:/harshini-1121/github.com//ai-video-competitor.git
cd ai-video-competitor
```

---

## 2️⃣ Install Frontend

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create `.env` inside `server/`

```env
YOUTUBE_API_KEY=YOUR_API_KEY
PORT=5000
```

Get API key from:

```text
Google Cloud Console → YouTube Data API v3
```

---

# ▶️ Run Project

## Start Backend

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm run dev
```

---

# 🌍 Deployment

## Frontend (Vercel)

* Import GitHub repository
* Select:

  * Framework: Vite
  * Root Directory: `client`
* Deploy

## Backend (Render)

* Create Web Service
* Root Directory: `server`
* Start Command:

```bash
node index.js
```

* Add Environment Variable:

```env
YOUTUBE_API_KEY=YOUR_API_KEY
```

---

# 📊 Example Competitor Analysis

```text
Tesla vs Ford vs Toyota vs BMW vs Audi
```

The dashboard provides:

* Subscriber comparison
* Average views
* Engagement metrics
* Ranking system
* Top performing videos
* Strategic recommendations

---

# 📥 PowerPoint Report

The platform automatically generates downloadable PPT reports containing:

* Executive Summary
* Company Rankings
* Performance Metrics
* Charts & Insights
* Marketing Recommendations

---

# 🧠 Future Improvements

* AI-powered sentiment analysis
* Multi-platform support (Instagram/TikTok)
* PDF report export
* User authentication
* Historical trend tracking
* Real-time analytics

---

# 👩‍💻 Author

**Harshini T N**

Full Stack & AI Developer

GitHub:

```text
https://github.com/harshini-1121/ai-video-competitor```

---

# ⭐ Project Outcome

Successfully built and deployed a full-stack AI-powered competitor intelligence platform capable of analyzing YouTube marketing performance and generating automated business intelligence reports.