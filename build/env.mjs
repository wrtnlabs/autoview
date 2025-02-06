import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (fs.existsSync(`${__dirname}/../.env`) === false)
  fs.copyFileSync(`${__dirname}/../.env.local`, `${__dirname}/../.env`);
