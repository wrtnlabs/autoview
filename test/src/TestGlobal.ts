import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import fs from "fs";
import { Singleton } from "tstl";
import typia from "typia";

export class TestGlobal {
  private static readonly directory = new Singleton(async () => {
    const location: string = `${__dirname}/../results`;
    if (fs.existsSync(location) === false) await fs.promises.mkdir(location);
    return location;
  });

  private static readonly environments = new Singleton(() => {
    const env = dotenv.config();
    dotenvExpand.expand(env);
    return typia.assert<IEnvironments>(process.env);
  });

  public static get env(): IEnvironments {
    return this.environments.get();
  }

  public static async archive(file: string, content: string): Promise<void> {
    const location: string = `${await this.directory.get()}/${file}`;
    await fs.promises.writeFile(location, content, "utf8");
  }
}

interface IEnvironments {
  CHATGPT_API_KEY?: string;
}
