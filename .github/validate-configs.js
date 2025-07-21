const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

const REQUIRED_FIELDS = ['toolName', 'author', 'description', 'version', 'repositoryUrl'];
const configsDir = path.join(__dirname, 'data/configs');

fs.readdirSync(configsDir).forEach(file => {
  const content = fs.readFileSync(path.join(configsDir, file), 'utf8');
  const { data } = matter(content);
  REQUIRED_FIELDS.forEach(field => {
    if (!data[field]) {
      console.error(`${file} is missing field: ${field}`);
      process.exitCode = 1;
    }
  });
});
