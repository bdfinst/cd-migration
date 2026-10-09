/**
 * Shared helpers for the data/*.yaml integrity specs.
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const DATA_ROOT = path.join(__dirname, "../../data");

/** Parses data/<name> as YAML. */
function loadDataFile(name) {
  return yaml.load(fs.readFileSync(path.join(DATA_ROOT, name), "utf8"));
}

/** Returns each value that appears more than once, once per extra occurrence. */
function findDuplicates(values) {
  return values.filter((value, i) => values.indexOf(value) !== i);
}

module.exports = { loadDataFile, findDuplicates };
