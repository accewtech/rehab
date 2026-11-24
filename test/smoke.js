// simple smoke test: ensure workspace files exist
const fs = require('fs');
const ok = fs.existsSync('pages/index.js') && fs.existsSync('package.json');
if (!ok) {
  console.error('smoke failed');
  process.exit(1);
}
console.log('smoke ok');
