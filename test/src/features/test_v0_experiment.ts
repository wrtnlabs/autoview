import {
  HttpMigration,
  IHttpMigrateApplication,
  IHttpMigrateRoute,
  OpenApiTypeChecker,
} from "@samchon/openapi";
import fs from "fs";
import { Singleton } from "tstl";

import { VercelZeroMdxGenerator } from "../internal/VercelZeroMdxGenerator";

export const test_v0_experiment = async () => {
  const application: IHttpMigrateApplication = HttpMigration.application(
    await fetch("https://shopping-be.wrtn.ai/editor/swagger.json").then((r) =>
      r.json(),
    ),
  );
  const routes: IHttpMigrateRoute[] = application.routes.filter(
    (f) =>
      !!f.success?.schema &&
      false === OpenApiTypeChecker.isUnknown(f.success.schema),
  );

  await Promise.all(
    routes.map(async (r) => {
      try {
        const result: string | null = await VercelZeroMdxGenerator.generate({
          components: application.document().components,
          schema: r.success!.schema,
        });
        if (result === null) return;

        await await mkdir.get();
        await fs.promises.writeFile(
          `results/v0/${r.method}-${r.path.replace(/\//g, "-")}.md`,
          result,
          "utf8",
        );
      } catch (error) {
        await fs.promises.writeFile(
          `results/v0/${r.method}-${r.path.replace(/\//g, "-")}.error.json`,
          JSON.stringify(
            error instanceof Error
              ? {
                  ...error,
                  name: error.name,
                  message: error.message,
                }
              : error,
            null,
            2,
          ),
          "utf8",
        );
      }
    }),
  );
};

const mkdir = new Singleton(async () => {
  if (fs.existsSync("results/v0"))
    await fs.promises.rm("results/v0", { recursive: true });
  await fs.promises.mkdir("results/v0", { recursive: true });
});
