const parse = require('csv-parse/lib/sync');

module.exports = { parseFile };
// **********************************************
function parseFile(csvFile) {
  const [records] = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}
