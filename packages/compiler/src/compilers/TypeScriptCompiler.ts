import type { IAutoViewCompilerResult } from "@autoview/interface";
import { EmbedTypeScript } from "embed-typescript";
import ts from "typescript";
import typiaTransform from "typia/lib/transform";

import type { IAutoViewProgrammerContext } from "../programmers/IAutoViewProgrammerContext";
import external from "../raw/external.json";

export namespace TypeScriptCompiler {
  export const build = (
    _ctx: IAutoViewProgrammerContext,
    typescript: string,
    target: "cjs" | "esm",
  ): IAutoViewCompilerResult => {
    const compiler: EmbedTypeScript = new EmbedTypeScript({
      external: external as Record<string, string>,
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
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
        jsx: ts.JsxEmit.ReactJSX,
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
      "main.tsx": typescript,
    });
  };
}
