import fs from "fs";
import { Singleton } from "tstl";

export namespace TestGlobal {
  export const archive = async (
    file: string,
    content: string,
  ): Promise<void> => {
    const location: string = `${await directory.get()}/${file}`;
    await fs.promises.writeFile(location, content, "utf8");
  };

  const directory = new Singleton(async () => {
    const location: string = `${__dirname}/../results`;
    if (fs.existsSync(location) === false) await fs.promises.mkdir(location);
    return location;
  });
}
