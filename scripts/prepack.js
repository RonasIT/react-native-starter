const fs = require('fs');

console.log('Preparing to publish:');

fs.writeFile('app.json', JSON.stringify({ expo: { name: 'RN Starter', slug: 'rn-starter' } }), () => console.log(' - app.json created'));

fs.copyFile('.gitignore', 'gitignore', () => console.log(' - gitignore copied'));
