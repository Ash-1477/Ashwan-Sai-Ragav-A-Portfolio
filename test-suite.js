const fs = require('fs');
const path = require('path');
const dir = __dirname;
const read = file => fs.readFileSync(path.join(dir, file), 'utf8');
const html = read('index.html');
const css = [
  'css/styles.css',
  'css/ashwan-os.css',
  'css/ashwan-os-editorial-v2.css'
].map(read).join('\n');
const js = read('js/main.js');
const osJs = read('js/ashwan-os.js');

const required = [
  'index.html',
  'css/styles.css',
  'css/ashwan-os.css',
  'css/ashwan-os-editorial-v2.css',
  'js/main.js',
  'js/ashwan-os.js',
  'assets/images/profile.jpg',
  'assets/docs/Ashwan_Sai_Ragav_Resume.pdf',
  'vercel.json'
];
let failed = false;
function check(label, ok) {
  console.log((ok ? 'PASS ' : 'FAIL ') + label);
  if (!ok) failed = true;
}

for (const file of required) check('asset: ' + file, fs.existsSync(path.join(dir, file)));

for (const [label, source] of [['main.js', js], ['ashwan-os.js', osJs]]) {
  try {
    new Function(source);
    check('JavaScript syntax: ' + label, true);
  } catch (error) {
    check('JavaScript syntax: ' + label + ' — ' + error.message, false);
  }
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const uniqueIds = new Set(ids);
check('No duplicate HTML IDs', ids.length === uniqueIds.size);

const requiredSections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact'];
for (const id of requiredSections) check('section exists: ' + id, ids.includes(id));

const internalLinks = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]);
for (const target of internalLinks) check('internal link resolves: #' + target, uniqueIds.has(target));

const externalBlankLinks = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map(match => match[0]);
check('External new-tab links use safe rel attributes',
  externalBlankLinks.every(tag => /\brel="[^"]*noopener[^"]*"/.test(tag)));

const checks = [
  ['Purple design tokens', css.includes('--os-purple') && css.includes('#a78bfa')],
  ['Editorial v2 stylesheet is loaded', /css\/ashwan-os-editorial-v2\.css/.test(html)],
  ['Responsive breakpoints exist', /@media\s*\(max-width:\s*\d+px\)/.test(css)],
  ['Reduced-motion support exists', /prefers-reduced-motion\s*:\s*reduce/.test(css) && osJs.includes('prefers-reduced-motion: reduce')],
  ['Keyboard focus styles exist', css.includes('focus-visible')],
  ['Accessible mobile navigation', html.includes('aria-expanded="false"') && html.includes('aria-controls="mobile-menu"') && js.includes("e.key === 'Escape'")],
  ['Accessible email copy feedback', html.includes('role="status"') && html.includes('aria-live="polite"')],
  ['Resume download retained', html.includes('assets/docs/Ashwan_Sai_Ragav_Resume.pdf') && html.includes(' download')],
  ['Active navigation uses semantic state', js.includes("setAttribute('aria-current', 'location')")],
  ['Scroll reveal enhancement exists', osJs.includes('IntersectionObserver')],
  ['Project cards are present', (html.match(/class="portfolio-card os-project-card"/g) || []).length === 4]
];
for (const [label, ok] of checks) check(label, ok);

if (failed) {
  console.error('\nASHWAN.OS checks failed.');
  process.exitCode = 1;
} else {
  console.log('\nAll ASHWAN.OS checks passed.');
}
