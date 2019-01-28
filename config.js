const yaml = require('yaml');
const fs = require('fs');

// piping utility function
const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe);
// mustache utlity function
const mustache = (string, data = {}) =>
  Object.entries(data).reduce((res, [key, value]) => res.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value), string);

const parseYaml = str => yaml.parse(str, { merge: true });
const readFile = path => fs.readFileSync(path, 'utf8');

// gets variables to mustache based on schema: { environments: { staging: { var1: val1, var2: val2, ... } } }
// if not found, returns {} and warns
const getMustacheHash = config => {
  const warn = () => console.warn(
    '{{ Mustached }} values will not be processed.'
  );

  try {
    const hash = config.environments[process.env.NODE_ENV];
    if (hash === undefined) {
      warn();
    }
    return hash || {};
  } catch(err) {
    warn();
    return {}
  }
};


const configYamlTemplate = readFile(process.env.CONFIG || './config.yml');
const config = pipe(
  parseYaml,
  getMustacheHash,
  mustache.bind(null, configYamlTemplate),
  parseYaml
)(configYamlTemplate);

/* Uncomment to inspect rendered config: */
// const { inspect } = require('util');
// console.log(inspect(config, { showHidden: false, depth: null }));

module.exports = config;