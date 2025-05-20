import * as fs from "fs/promises";

async function main(): Promise<void> {
  const components = fs.glob("./components/*.ts");

  for await (const component of components) {
    await fs.unlink(component);
  }

  const randoms = fs.glob("./mock-data/*.ts");

  for await (const random of randoms) {
    await fs.unlink(random);
  }
}

main().catch(console.error);
