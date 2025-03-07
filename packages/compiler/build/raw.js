const cp = require("child_process");
const fs = require("fs");

const emendName = (name) =>
  name
    .replaceAll("@", "_at_")
    .replaceAll("/", "_slash_")
    .replaceAll("-", "_dash_");

const external = (container) => (config) => (lib) => {
  const write = (variable) => (file) => (content) =>
    fs.writeFileSync(
      file,
      `export const ${emendName(variable)}: string = ${JSON.stringify(content)};`,
      "utf8",
    );

  const packageJson = () => {
    const location = `${__dirname}/../node_modules/${lib}/package.json`;
    const directory = `${__dirname}/../src/raw/${lib}`;
    fs.mkdirSync(directory, { recursive: true });

    if (config.packageJson) {
      write(`${emendName(lib)}_packageJson`)(`${directory}/packageJson.ts`)(
        fs.readFileSync(location, "utf8"),
      );
      container.push({
        format: "json",
        name: `${emendName(lib)}_packageJson`,
        import: `./${lib}/packageJson`,
        url: `file:///node_modules/${lib}/package.json`,
      });
    }
    return true;
  };
  if (packageJson() === false) return () => {};

  const iterate = (path) => {
    const directory = fs.readdirSync(
      `${__dirname}/../node_modules/${lib}/${path}`,
    );
    for (const file of directory) {
      const location = `${path}/${file}`;
      const from = `${__dirname}/../node_modules/${lib}/${location}`;
      const link = `${__dirname}/../src/raw/${lib}/${location}`;

      // CHECK DIRECTORY AND EXTENSION
      const stats = fs.statSync(from);
      if (stats.isDirectory()) {
        fs.mkdirSync(link, { recursive: true });
        iterate(location);
        continue;
      } else if (
        file.endsWith(".d.ts") === false &&
        (config.javaScript === false || file.endsWith(".js") === false)
      )
        continue;
      else if (config.filter && config.filter(file) === false) continue;

      // COPY TEXT FILE
      const extension = location.endsWith(".d.ts") ? ".d.ts" : ".js";
      const alias = `${lib}/${location.replace(extension, extension === ".d.ts" ? "_d_ts" : "_js")}`;
      const name = emendName(alias.split("/").join("_").split(".").join("_"));
      const content = fs.readFileSync(from, "utf8");
      write(name)(
        link.replace(extension, extension === ".d.ts" ? "_d_ts.ts" : "_js.ts"),
      )(content);
      container.push({
        format: "ts",
        import: `./${alias}`,
        name,
        url: `file:///node_modules/${lib}/${location}`,
      });
    }
  };
  return (path) => {
    if (path.length) {
      fs.mkdirSync(`${__dirname}/../src/raw/${lib}/${path}`, {
        recursive: true,
      });
      if (config.index) {
        write(`${emendName(lib)}_index`)(
          `${__dirname}/../src/raw/${lib}/index.ts`,
        )(
          [
            `import * as ${emendName(lib)} from "./${path}";`,
            `export * from "./${path}";`,
            `export default ${emendName(lib)};`,
          ].join("\n"),
        );
        container.push({
          format: "ts",
          import: `./${lib}/index`,
          name: `${emendName(lib)}_index`,
          url: `file:///node_modules/${lib}/index.d.ts`,
        });
      }
    }
    return iterate(path);
  };
};

// PREPARE DIRECTORIES
if (fs.existsSync(__dirname + "/../src/raw"))
  fs.rmSync(__dirname + "/../src/raw", { recursive: true });
fs.mkdirSync(__dirname + "/../src/raw", { recursive: true });

//----
// CLONE DEFINITIONS
//----
// BUILD INTERFACE
console.log("----");
console.log(" Build @autoview/interface");
console.log("----");
cp.execSync("pnpm run build", {
  stdio: "inherit",
  cwd: `${__dirname}/../../interface`,
});

// CREATE RAW TEXT FILES
const bucket = [];
external(bucket)({
  packageJson: false,
  javaScript: false,
  index: true,
})("@autoview/interface")("lib");
external(bucket)({
  index: true,
  packageJson: true,
  javaScript: false,
})("@samchon/openapi")("lib");
external(bucket)({
  packageJson: false,
  javaScript: false,
  index: true,
})("tgrid")("lib");
external(bucket)({
  index: true,
  packageJson: true,
  javaScript: false,
})("typia")("lib");
external(bucket)({
  packageJson: false,
  javaScript: false,
  index: false,
})("typescript")("lib");

// COMBINE THEM ALL
const content = [
  ...bucket.map((b) => `import { ${b.name} } from "${b.import}";`),
  "",
  `export const RAW: [file: string, content: string][] = [`,
  ...bucket.map((b) => `  ["${b.url}", ${b.name}],`),
  `];`,
].join("\n");
fs.writeFileSync(__dirname + "/../src/raw/RAW.ts", content, "utf8");
