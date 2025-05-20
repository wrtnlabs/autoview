import type { IAutoViewCompilerResult } from "@autoview/interface";
import { EmbedTypeScript } from "embed-typescript";
import ts from "typescript";
import typiaTransform from "typia/lib/transform";

import external from "../raw/external.json";

export namespace TypeScriptCompiler {
  export const build = (
    typescript: string,
    target: "cjs" | "esm",
    reactEnabled: boolean,
  ): IAutoViewCompilerResult => {
    const compiler = new EmbedTypeScript({
      external: external as Record<string, string>,
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        downlevelIteration: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
        ...(target === "cjs"
          ? {
              module: ts.ModuleKind.CommonJS,
            }
          : {
              module: ts.ModuleKind.ESNext,
              moduleResolution: ts.ModuleResolutionKind.Bundler,
            }),
        noImplicitAny: false,
      },
      transformers: (program, diagnostics) => ({
        before: [
          typiaTransform(
            program,
            {},
            {
              addDiagnostic: (input) => diagnostics.push(input),
            },
          ),
        ],
      }),
    });

    return compiler.compile({
      [reactEnabled ? "main.tsx" : "main.ts"]: typescript,
    });
  };
}
