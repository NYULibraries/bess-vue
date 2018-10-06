const yaml = require('yaml');
const fs = require('fs');
const { render } = require('mustache');
const R = require('ramda');

const parseYaml = str => yaml.parse(str, { merge: true });
const readFile = path => fs.readFileSync(path, 'utf8');
const parseYamlFromPath = path => parseYaml(readFile(path));
const parseYamlIfPathWithDefault = defaultVal => path => path === undefined ? defaultVal : parseYamlFromPath(path);

// curryable Mustache.render, expects only 2 arguments
const renderMustache = R.curryN(2, render);

// gets mustache yml file path based on schema: { environments: { staging: { mustache: './myMustacheValues.yml' } } }
// if not found, returns undefined and warns
// defaults to NODE_ENV: development
const getMustacheYamlPath = config => {
  const warn = () => console.warn(
    'A mustache environment has not been set.',
    '{{ Mustached }} values will not be processed.'
  );
  try {
    const path = config.environments[process.env.NODE_ENV || 'development'].mustache;
    return path === undefined ? warn() : path;
  } catch(err) {
    warn();
  }
};

const configYaml = readFile(process.env.CONFIG || './config.yml');
const config = R.pipe(
  parseYaml,
  getMustacheYamlPath,
  parseYamlIfPathWithDefault({}),
  renderMustache(configYaml),
  parseYaml
)(configYaml);

/* Uncomment to inspect rendered config: */
// const { inspect } = require('util');
// console.log(inspect(config, { showHidden: false, depth: null }));

module.exports = config;