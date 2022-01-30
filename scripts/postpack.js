const fs = require('fs');

function deleteFile(path) {
  fs.unlink(path, (error) => error && console.log(`Failed to remove ${path}: ` + error));
}

console.log('Package published. Clean up repository...')

deleteFile('app.json');
deleteFile('gitignore');
deleteFile('npm-shrinkwrap.json');
