
🎯 Smart Goal Planner
A lightweight, single-page React app that helps you track savings goals in real time—no login, no bloat, just results.
⚡ Features

Table
Copy
Feature	What it does
🆕 Add Goals	Name, target amount, category, deadline
💸 Deposit	One-click deposits update progress instantly
📊 Progress Bars	Visual % toward each goal
✅ Completed Goals	Auto-sort completed goals to the bottom
🗑 Delete	Remove goals you no longer need
🔍 Overview	Total saved, # completed, upcoming deadlines
🏁 Quick Start

Clone & install
bash
Copy
git clone https://github.com/Brian-mwit/smart-goal-planer.git
cd smart-goal-planner
npm install
Start JSON-Server (fake backend)
bash

Copy
npm run server   # or `json-server --watch db.json --port 3001`
Launch the app
bash

Copy
npm run dev      # Vite dev server on http://localhost:5173
📁 Project Structure

Copy
src/
├── components/
│   ├── GoalForm.jsx      # Add new goal
│   ├── GoalList.jsx      # List wrapper
│   ├── GoalItem.jsx      # Individual goal card
│   ├── DepositForm.jsx   # Inline deposit panel
│   ├── ProgressBar.jsx   # Reusable progress bar
│   └── GoalOverview.jsx  # Dashboard stats
├── App.jsx               # Root component
└── index.css             # Dark-theme styling
📡 API Endpoints (JSON-Server)

Table
Copy
Method	Endpoint	Body Example
GET	/goals	-
POST	/goals	{ "name":"Japan Trip", "targetAmount":5000, "category":"Travel", "deadline":"2025-12-31", "savedAmount":0 }
PUT	/goals/:id	{ ...updated fields }
DELETE	/goals/:id	-
🎨 Styling
Pure CSS dark theme—no Tailwind or external UI libs.
Colors are easy to tweak in index.css.
🧪 Testing Tips
Add a goal → see it appear.
Deposit → progress bar & remaining update.
Delete → disappears instantly.
JSON-Server persists until you reset db.json.
🛠 Tech Stack
React 18 + Vite
json-server (mock API)
CSS Modules / vanilla CSS
🚦 Roadmap Ideas
✅ 100 % offline via IndexedDB
🔔 Push notifications for due dates
📈 Charts & CSV export
🌗 Light / dark toggle
