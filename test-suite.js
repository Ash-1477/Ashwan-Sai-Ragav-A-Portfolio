const fs = require('fs');
const path = require('path');
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'css/styles.css'), 'utf8') + fs.readFileSync(path.join(dir, 'css/ashwan-os.css'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'js/main.js'), 'utf8');
const osJs = fs.readFileSync(path.join(dir, 'js/ashwan-os.js'), 'utf8');
const required = ['index.html','css/styles.css','css/ashwan-os.css','js/main.js','js/ashwan-os.js','assets/images/profile.jpg','assets/docs/Ashwan_Sai_Ragav_Resume.pdf','vercel.json'];
let failed = false;
for (const file of required) {
  const exists = fs.existsSync(path.join(dir,file));
  console.log((exists ? 'PASS ' : 'FAIL ') + 'asset: ' + file);
  if (!exists) failed = true;
}
for (const [label, source] of [['main.js',js],['ashwan-os.js',osJs]]) {
  try { new Function(source); console.log('PASS JavaScript syntax: ' + label); }
  catch (error) { console.log('FAIL JavaScript syntax: ' + label + ' — ' + error.message); failed = true; }
}
const ids = ['hero','about','experience','projects','skills','education','achievements','contact'];
for (const id of ids) {
  const ok = html.includes('id="' + id + '"');
  console.log((ok ? 'PASS ' : 'FAIL ') + 'section: ' + id);
  if (!ok) failed = true;
}
const checks = [
 ['Purple design system', css.includes('--os-purple') && css.includes('#a78bfa')],
 ['Responsive layouts', css.includes('@media(max-width:640px)')],
 ['Reduced motion support', css.includes('prefers-reduced-motion: reduce')],
 ['Accessible mobile navigation', html.includes('aria-expanded="false"') && html.includes('aria-controls="mobile-menu"')],
 ['Accessible email copy feedback', html.includes('role="status"') && html.includes('aria-live="polite"')],
 ['Resume download retained', html.includes('assets/docs/Ashwan_Sai_Ragav_Resume.pdf')],
 ['Reveal and card interaction', osJs.includes('IntersectionObserver') && osJs.includes('pointermove')]
];
for (const [label, ok] of checks) { console.log((ok ? 'PASS ' : 'FAIL ') + label); if (!ok) failed = true; }
if (failed) process.exitCode = 1;
else console.log('\nAll ASHWAN.OS checks passed.');
