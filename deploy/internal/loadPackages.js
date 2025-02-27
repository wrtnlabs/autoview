const fs = require("fs");
const path = require("path");

const loadPackages = () => {
  const packagesDir = path.resolve(__dirname, "../../packages");
  const directories = fs.readdirSync(packagesDir);

  return directories.filter((dir) => {
    const dirPath = path.join(packagesDir, dir);
    const stat = fs.lstatSync(dirPath);

    if (stat.isDirectory()) {
      const packageJsonPath = path.join(dirPath, "package.json");

      if (fs.existsSync(packageJsonPath)) {
        const packageJson = require(packageJsonPath);
        return !packageJson.private;
      }
    }
    return false;
  });
};

module.exports = { loadPackages };
