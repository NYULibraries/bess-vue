const yaml = require('yaml');

// piping utility function
const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe);
// mustache utlity function
const processMustache = (string, data = {}) =>
  Object.entries(data).reduce((res, [key, value]) => res.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value), string);

const parseYaml = str => yaml.parse(str, { merge: true });

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
    return {};
  }
};

const transformConfigYml = yml => pipe(
  parseYaml,
  getMustacheHash,
  processMustache.bind(null, yml),
  parseYaml
)(yml);

module.exports = function loader(source) {
  source = transformConfigYml(source);
  return `export default ${JSON.stringify(source)}`;
};
