# ASHWAN.OS — Personal Portfolio

A responsive personal portfolio for **Ashwan Sai Ragav A**, built with semantic HTML, CSS and dependency-free JavaScript. The current visual direction is a midnight-purple editorial interface with a floating navigation capsule, portrait-led introduction, project gallery and focused contact section.

## Experience

- Editorial hero and responsive portrait layout
- About, experience, selected projects, technical skills, education, certifications and achievements
- Downloadable résumé and direct contact links
- Responsive navigation with keyboard dismissal and active-section state
- Scroll progress, reveal-on-scroll and subtle pointer spotlight effects
- Reduced-motion support, visible keyboard focus and accessible email-copy feedback

## Project links

The four project cards currently link to the public GitHub profile at [github.com/Ash-1477](https://github.com/Ash-1477). Individual repository URLs and live demos have not been independently confirmed, so no project-specific destinations are implied. Replace these profile links with direct repository/demo links when those URLs are available.

## Project structure

```text
.
├── assets/
│   ├── docs/Ashwan_Sai_Ragav_Resume.pdf
│   └── images/profile.jpg
├── css/
│   ├── styles.css
│   ├── ashwan-os.css
│   └── ashwan-os-editorial-v2.css
├── js/
│   ├── main.js
│   └── ashwan-os.js
├── index.html
├── test-suite.js
└── vercel.json
```

## Preview locally

No package manager or build step is required. From the repository root, run:

```bash
python -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Run the release checks

With Node.js installed, run:

```bash
node test-suite.js
```

The script checks required assets, JavaScript syntax, unique IDs, internal anchor targets, responsive/reduced-motion/accessibility hooks and the key portfolio sections. It is a lightweight static check, not a substitute for manually testing the site in desktop and mobile browsers.

## Deployment

The project is configured for Vercel as a static site. Pushes to the production branch trigger the connected Vercel deployment. Confirm the production deployment status in Vercel after merging.
