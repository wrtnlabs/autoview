import * as fs from "fs/promises";

async function main(): Promise<void> {
  const components = [
    fs.glob("./components/*.tsx"),
    fs.glob("./components/*.jsx"),
    fs.glob("./components/*.jsx.map"),
  ];

  for (const items of components) {
    for await (const item of items) {
      await fs.unlink(item);
    }
  }

  const randoms = [
    fs.glob("./mock-data/*.ts"),
    fs.glob("./mock-data/*.js"),
    fs.glob("./mock-data/*.js.map"),
  ];

  for (const items of randoms) {
    for await (const item of items) {
      await fs.unlink(item);
    }
  }
}

main().catch(console.error);
