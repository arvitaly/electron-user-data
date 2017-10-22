import { copyFile as copyFileC } from "fs";
import globN = require("glob");
import mkdirp = require("mkdirp");
import rimraf = require("rimraf");
import { promisify } from "util";
export const createDir = promisify(mkdirp);
export const removeDir = promisify(rimraf);
export const glob = (pattern: string): Promise<string[]> => (promisify(globN) as any)(pattern);
export const copyFile = promisify(copyFileC);
