const fse = require('fs-extra');
const path = require('path');

const SRC_PATH = path.join(__dirname, 'public/');
const DIST_PATH = path.join(__dirname, '/../');

fse.copy(SRC_PATH, DIST_PATH, { overwite: true }, err => {
    if (err) return console.error(err);
    console.log('directories copied');
});