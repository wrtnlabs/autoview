const cp = require("child_process");
const fs = require("fs");

const main = async () => {
  cp.execSync("npm run build", {
    cwd: `${__dirname}/../../compiler-bundle`,
    stdio: "inherit",
  });
  fs.copyFileSync(
    `${__dirname}/../../compiler-bundle/dist/worker.js`,
    `${__dirname}/../public/worker.js`,
  );
};
main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
