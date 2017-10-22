import { promisify } from "util";
import { unlink } from "fs";
import mkdirp = require("mkdirp");
import rimraf = require("rimraf");
export const createDir = promisify(mkdirp);
export const removeDir = promisify(rimraf);