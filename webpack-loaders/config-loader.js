const { getOptions } = require('loader-utils');
const yaml = require('yaml');

// piping utility function
const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe);
// mustache utlity function
const processMustache = (data = {}) => (string) =>
  Object.entries(data).reduce((res, [key, value]) => res.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value), string);

const parseYaml = str => yaml.parse(str, { merge: true });

const transformConfigYml = (yml, hash = {}) => pipe(
  processMustache(hash),
  parseYaml
)(yml);

module.exports = function loader(source) {
  const options = getOptions(this);

    const envHash = options ? options[process.env.NODE_ENV] : {};
    if (options && !envHash) {
      throw new Error(
        `config-loader: No configuration options for NODE_ENV '${process.env.NODE_ENV}' have been found. {{ Mustached }} values will not be processed!`
      );
    }

  const configObject = transformConfigYml(source, envHash);
  return `export default ${JSON.stringify(configObject)}`;
};
