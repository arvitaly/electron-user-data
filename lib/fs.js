"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
exports.createDir = util_1.promisify(mkdirp);
exports.removeDir = util_1.promisify(rimraf);
