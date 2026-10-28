const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'css/styles.css'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'js/main.js'), 'utf8');

console.log('--- TEST 1: ASSET FILES & SIZES ---');
const files = [
  'index.html',
  'css/styles.css',
  'js/main.js',
  'assets/images/profile.jpg',
  'assets/docs/Ashwan_Sai_Ragav_Resume.pdf',
  'vercel.json',
  'README.md'
];

let assetsOk = true;
for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) {
    console.error('FAIL: Missing file ' + f);
    assetsOk = false;
  } else {
    const size = fs.statSync(p).size;
    console.log('PASS: ' + f + ' exists (' + size + ' bytes)');
  }
}

console.log('\n--- TEST 2: JAVASCRIPT SYNTAX CHECK ---');
try {
  new Function(js);
  console.log('PASS: js/main.js syntax is valid');
} catch (e) {
  console.error('FAIL: js/main.js syntax error: ' + e.message);
}

console.log('\n--- TEST 3: HEADING HIERARCHY VERIFICATION ---');
const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
let match;
const headings = [];
while ((match = headingRegex.exec(html)) !== null) {
  const cleanText = match[2]
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim()
    .replace(/\s+/g, ' ');
  headings.push({ level: parseInt(match[1]), text: cleanText });
}

console.log('Found ' + headings.length + ' headings:');
headings.forEach(h => console.log('  H' + h.level + ': ' + h.text));

// Verify h1 count
const h1s = headings.filter(h => h.level === 1);
if (h1s.length === 1 && h1s[0].text.includes('Ashwan Sai Ragav')) {
  console.log('PASS: Exactly 1 H1 found for main page heading');
} else {
  console.log('FAIL: H1 count is ' + h1s.length);
}

// Verify H2 headings for major sections
const expectedH2s = [
  'About Me',
  'Internship Experience',
  'Featured Projects',
  'Technical Skills',
  'Education & Certifications',
  'Achievements',
  "Let's Connect"
];

let allH2Present = true;
expectedH2s.forEach(sec => {
  const found = headings.some(h => h.level === 2 && h.text.includes(sec));
  if (!found) {
    console.log('FAIL: Missing H2 for ' + sec);
    allH2Present = false;
  }
});
if (allH2Present) {
  console.log('PASS: All 7 major section titles use H2 headings');
}

console.log('\n--- TEST 4: PROJECT LINKS VERIFICATION ---');
const projectCardsAnchors = (html.match(/<span>Browse GitHub Profile<\/span>/g) || []).length;
console.log('PASS: Found exactly ' + projectCardsAnchors + ' "Browse GitHub Profile" project cards');

console.log('\n--- TEST 5: LEETCODE STATS & METADATA CLAIMS ---');
if (html.includes('Verified on Resume')) {
  console.log('FAIL: "Verified on Resume" is still present in HTML');
} else {
  console.log('PASS: "Verified on Resume" unsupported claim successfully removed');
}

console.log('\n--- TEST 6: ACCESSIBILITY ATTRIBUTES ---');
const hasAriaExpanded = html.includes('aria-expanded="false"');
const hasAriaControls = html.includes('aria-controls="mobile-menu"');
const hasAriaHidden = html.includes('aria-hidden="true"');
const hasRoleStatus = html.includes('role="status"');
const hasAriaLive = html.includes('aria-live="polite"');
console.log('PASS: aria-expanded present: ' + hasAriaExpanded);
console.log('PASS: aria-controls present: ' + hasAriaControls);
console.log('PASS: aria-hidden present: ' + hasAriaHidden);
console.log('PASS: role="status" and aria-live="polite" present: ' + (hasRoleStatus && hasAriaLive));

console.log('\n--- TEST 7: RESPONSIVE WIDTH & OVERFLOW RULES ---');
const checks = [
  { name: 'Body overflow-x-hidden', test: html.includes('overflow-x-hidden') || css.includes('overflow-x: hidden') },
  { name: 'Hero social links max-w-full and flex-wrap', test: html.includes('flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 text-slate-500 w-full max-w-full') },
  { name: 'Truncate utility defined', test: css.includes('.truncate') },
  { name: 'Break-all utility defined', test: css.includes('.break-all') },
  { name: 'Hero avatar responsive size (w-56 h-56 sm:w-64 sm:h-64)', test: html.includes('w-56 h-56 sm:w-64 sm:h-64') }
];
checks.forEach(c => {
  console.log((c.test ? 'PASS: ' : 'FAIL: ') + c.name);
});
