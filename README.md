# 🖥 Blue Screen Boy OS — Interactive Portfolio System

An interactive dual-mode portfolio built by **Adhitya Maulana Wijaya**  
Full-Stack Developer & Undergraduate Student at Universitas Kuningan

> This is not just a portfolio.  
> It is a system interface.

---

## 🚀 Live Preview

🔗 **Demo:** _https://blue-screen-boy-portfolio.vercel.app/_  

---

## 🧠 Concept

This portfolio is built around a **Dual Experience Architecture**:

### 🧭 GUI Mode

A clean, professional interface designed for:

- Recruiters
- HR teams
- Non-technical stakeholders

Provides:

- Structured navigation
- Clear case studies
- Straightforward user experience

---

### 💻 Dev Mode

An interactive system interface designed for:

- Technical leads
- Engineers
- Founders

Includes:

- Boot sequence simulation
- Live terminal logging
- Execution logs per project
- Command-based navigation
- Real-time system feedback

Both modes share the same data layer —  
but deliver two fundamentally different experiences.

---

## ⚙️ Core Features

### 🖥 Dual Mode Interface

- Toggle between GUI Mode and Dev Mode
- Persistent mode state (stored in `localStorage`)
- Mode-based rendering and behavioral logic
- Animated transition between modes

---

### 💻 Interactive Terminal Engine

Available in both modes, enhanced in Dev Mode.

#### Supported Commands

```bash
help           — Show this help
whois          — Short bio + CV link
about          — Education & career summary
skills         — List skills
projects       — List all projects
open <id>      — Open project detail
filter --tech  — Filter by technology
contact        — Open contact page
cv             — Download CV
clear          — Clear terminal
bsod           — Easter Egg
```

#### Dev Mode Enhancements

- Auto-logs user interactions
- Execution logs on project open
- Session history
- Autocomplete (Tab)
- Command history (↑ / ↓)
- Boot sequence animation
- Real-time feedback simulation

---

## 📂 Project System

Each project includes:

- Hero preview section
- Problem → Approach → Result breakdown
- Tech stack badges
- Role & duration
- External links
- Dev Mode execution logs

### Included Projects

- CMS Website for AISEE Organization
- SolusiKos (SaaS Prototype)
- TaskTunes (Android Productivity App)
- Data Update Automation (Chrome Extension)
- Screening Batch Automation
- Spotify Web Automation Testing

---

## 🏗 Architecture Overview

### Frontend Stack

- React (Vite)
- React Router
- Tailwind CSS
- ShadcnUI
- Framer Motion
- Zod

### State Management

- Context API (`ModeContext`)
- Local state hooks
- Persistent mode via `localStorage`

### Terminal Engine

- Custom command parser
- Action dispatcher
- Autocomplete system
- Command history stack
- Navigation + filtering integration

---

## 🎨 Design Philosophy

This portfolio reflects my core strengths:

- Multi-role architecture design
- Workflow automation systems
- Performance optimization
- Scalable frontend-backend integration

Dev Mode represents how I think:

> Structured systems. Observable behavior. Feedback-driven design.

GUI Mode represents how I deliver:

> Clean interfaces. Production-ready polish. Accessible UX.

---

## 📁 Project Structure

```plaintext
src/
 ├── components/
 │    └── ui/
 │    └── context/
 │    └── data/
 │    └── hooks/
 │    └── lib/
 │    └── pages/
 └── App.tsx
```

---

## 🛠 Installation

Clone the repository:

```bash
git clone https://github.com/AdhityaMaulana11/Blue-Screen-Boy_Portfolio.git
cd yourrepo
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🔄 How the Mode System Works

The application uses a global `ModeContext`:

```js
mode = "gui" | "dev";
```

Mode affects:

- Visual styling tokens
- Conditional rendering
- Terminal auto-logging behavior
- System overlays
- Execution log visibility

Switching mode triggers:

- Transition animation
- Optional boot sequence (Dev Mode)
- UI token update
- State persistence

---

## 🧩 Adding a New Project

Edit:

```plaintext
src/data/portfolio.tsx
```

Each project object should follow:

```json
{
  "id": "",
  "title": "",
  "year": "",
  "summary": "",
  "screenshots": [],
  "tech": [],
  "role": "",
  "duration": "",
  "problem": "",
  "approach": "",
  "result": ""
}
```

Execution logs are automatically rendered in Dev Mode if provided.

---

## 📬 Contact Integration

Default setup:

- Client-side validation
- Ready for Formspree or serverless endpoint

To connect a backend:

- Modify handler in `ContactForm` component
- Configure environment variables for API endpoint

---

## 🎯 Why This Portfolio Is Different

Most portfolios display projects.

This one demonstrates:

- System thinking
- Behavioral architecture
- Interaction design strategy
- Automation mindset
- Execution transparency

It doesn’t just show what I built —  
it simulates how I build systems.

---

## 👨‍💻 About

**Adhitya Maulana Wijaya**  
Full-Stack Developer & Automation Engineer

Specialized in:

- Scalable web platforms
- Multi-role systems
- Browser automation
- RESTful API architecture
- Performance optimization

📍 Kuningan, Indonesia

---

## 📄 License

Personal portfolio project.  
Feel free to explore, fork, and get inspired.

---

> Blue Screen Boy — Built with systems in mind.
