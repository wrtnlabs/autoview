import * as fs from "fs/promises";

async function main(): Promise<void> {
  const transformers = fs.glob("./transformers/*.ts");

  for await (const transformer of transformers) {
    await fs.unlink(transformer);
  }

  const randoms = fs.glob("./transformer-randoms/*.ts");

  for await (const random of randoms) {
    await fs.unlink(random);
  }
}

main().catch(console.error);
