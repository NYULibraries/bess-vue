const yaml = require('yaml');
const fs = require('fs');

const yamlFile = fs.readFileSync('./config.yml', 'utf8');
const config = yaml.parse(yamlFile, { merge: true });

module.exports = config;