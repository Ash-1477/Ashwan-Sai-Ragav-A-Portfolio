# Ashwan Sai Ragav A - Personal Portfolio

A lightweight, modern, and fully responsive personal portfolio website engineered with semantic HTML5, a production-grade Tailwind CSS system, and vanilla JavaScript. Built with a blue-and-white theme, prominent hero avatar with blue accent ring, reusable content cards, and zero runtime CDN dependencies.

---

## 📁 Project Structure

```text
ashwan-portfolio/
├── assets/
│   ├── docs/
│   │   └── Ashwan_Sai_Ragav_Resume.pdf  # Downloadable resume PDF (unmodified original)
│   └── images/
│       └── profile.jpg                  # High-resolution portrait photo (unmodified original)
├── css/
│   └── styles.css                       # Production Tailwind utility & component stylesheet
├── js/
│   └── main.js                          # Accessible mobile drawer, active section tracking, email clipboard copy
├── index.html                           # Semantic, accessible portfolio entrypoint
├── vercel.json                          # Vercel deployment routing & static caching headers
└── README.md                            # Documentation and local preview guide
```

---

## 🔍 Verified Source of Truth (Resume Verification)

All personal and technical details in this portfolio are strictly verified against the uploaded resume:

| Section | Resume Source of Truth | Portfolio Representation |
| :--- | :--- | :--- |
| **Name & Identity** | Ashwan Sai Ragav A | Top navbar logo & `<h1>` page heading |
| **Education** | Chennai Institute of Technology | B.E. Computer Science and Engineering, 2nd Year, CGPA: **7.65** |
| **Interests** | Software Development, Web Dev, Cybersecurity, Cloud Computing | Sub-headline & competency tags |
| **Internship 1** | Cognifyz Technologies (Jun 2026 – Jul 2026) | Web Development Intern (all 3 bullets preserved) |
| **Internship 2** | Thiranex (May 2026 – Jun 2026) | Cybersecurity Intern (all 3 bullets preserved) |
| **Project 1** | Smart Waste Segregation Assistant | Web Application (Image recognition, ML classification, real-time UI) |
| **Project 2** | Phishing Email Detection Model | Machine Learning (Python, pandas, scikit-learn) |
| **Project 3** | Vulnerability Scanner | Python Security Tool (Target scan, common risk identification) |
| **Project 4** | Password Strength Analyzer | Python Tool (Strength evaluation, criteria feedback) |
| **Project Links** | Not individually specified on resume | Labelled clearly as **"Browse GitHub Profile"** (`github.com/Ash-1477`) |
| **Languages** | Python, C, C++, JavaScript, Java | Technical Skills card |
| **Web Tech** | HTML, CSS, JavaScript, React (Basics), Node.js | Technical Skills card |
| **Databases** | MySQL, MongoDB | Technical Skills card |
| **Tools** | Git, GitHub, VS Code, Linux, Docker (Basics), Firebase (Basics) | Technical Skills card |
| **Certifications** | Oracle (OCI Foundation, OCI AI Foundation, Data Platform) & Cisco (Networking 1 & 2) | Official Certifications card |
| **Achievements** | 425+ LeetCode problems solved, EY Techathon 6.0, E-Summit '25 | Achievements banner & milestones cards |
| **Contact** | Email: `ashwansairagav9522@gmail.com`<br>LinkedIn: `linkedin.com/in/ashwan-sai-ragav`<br>GitHub: `github.com/Ash-1477` | Public contact options |
| **Phone** | `9940346881` | **Omitted** from public display as requested |

---

## ♿ Accessibility & Standards Compliance

- **Semantic Heading Hierarchy:** `h1` strictly reserved for the page title ("Ashwan Sai Ragav A"), `h2` for primary section titles ("About Me", "Internship Experience", "Featured Projects", etc.), `h3` for subsections and cards, with small eyebrow labels styled using semantic `<p>` / `<span>` tags.
- **Mobile Menu ARIA:** Toggle button includes `aria-controls="mobile-menu"`, `aria-expanded="false|true"`, `aria-label`, and the drawer includes `aria-hidden="true|false"` with automatic `Escape` key close.
- **Email Copy Feedback:** Screen-reader accessible alert region with `role="status"` and `aria-live="polite"`.
- **Keyboard Navigation:** High-contrast focus-visible outlines (`outline: 2px solid #2563eb`) on all buttons, links, and form elements.
- **Responsive Widths:** Fully responsive flexbox & grid design with `overflow-x-hidden` safety to eliminate horizontal scrolling across 320px, 375px, 768px, 1024px, and desktop screens.

---

## 🚀 How to Preview & Test Locally

You do not need Node.js or any external package manager to run and test this portfolio.

### Option 1: Direct File Opening
Double-click `index.html` or right-click and choose **Open With > Google Chrome / Microsoft Edge / Firefox**.

### Option 2: Local HTTP Server (Python)
If Python is installed on your machine:
```powershell
cd C:\Users\yagna\.gemini\antigravity\scratch\ashwan-portfolio
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: VS Code Live Server
1. Open the `ashwan-portfolio` folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Click **Go Live** at the bottom right corner of VS Code.

---

## 🌐 Deploying to Vercel (When Ready)

1. Initialize git and commit:
   ```bash
   cd ashwan-portfolio
   git init
   git add .
   git commit -m "feat: portfolio release"
   ```
2. Create a GitHub repository under your account (`Ash-1477`) and push:
   ```bash
   git remote add origin https://github.com/Ash-1477/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Import into [Vercel](https://vercel.com). Vercel will deploy it automatically with zero build steps and provide free HTTPS.
4. **Update Open Graph URL:** Once your Vercel URL is assigned (e.g., `https://ashwan-portfolio.vercel.app`), update line 16 of `index.html` to an absolute URL:
   ```html
   <meta property="og:image" content="https://your-domain.vercel.app/assets/images/profile.jpg">
   ```
