import { IAutoViewCompilerResult } from "@autoview/interface";
import { IPointer } from "tstl";
import ts from "typescript";
import transform from "typia/lib/transform";

import { IAutoViewProgrammerContext } from "../programmers/IAutoViewProgrammerContext";
import { RAW } from "../raw/RAW";

export namespace TypeScriptCompiler {
  export const build = (
    ctx: IAutoViewProgrammerContext,
    typescript: string,
    target: "cjs" | "esm",
  ): IAutoViewCompilerResult => {
    // LLM GENERATED CODE
    typescript = typescript.replace(
      "return typia.random<IAutoViewComponentProps>();",
      ctx.body,
    );

    // PREPARE RAW FILES
    const dict: Map<string, ts.SourceFile> = new Map();
    for (const [file, content] of RAW) {
      if (file.endsWith("packageJson.d.ts")) continue;
      const replaced: string = file.replace("file:///", "");
      const source: ts.SourceFile = ts.createSourceFile(
        file,
        content,
        ts.ScriptTarget.ES2015,
      );
      dict.set(replaced, source);
    }

    // CREATE SOURCE FILE
    const source: ts.SourceFile = ts.createSourceFile(
      "main.ts",
      typescript,
      ts.ScriptTarget.ES2015,
    );
    dict.set("main.ts", source);

    // DO COMPILE
    const output: IPointer<string> = { value: "" };
    const diagnostics: ts.Diagnostic[] = [];
    const program: ts.Program = ts.createProgram(
      ["main.ts"],
      {
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
      },
      {
        // KEY FEATURES
        fileExists: (file) => dict.has(file),
        writeFile: (_file, text) => (output.value = text),
        readFile: (file) =>
          file.startsWith("node_modules/") && file.endsWith("/package.json")
            ? RAW.find((r) => r[0] === `file:///${file}`)![1]
            : undefined,
        getSourceFile: (file: string) => dict.get(file),

        // ADDITIONAL OPTIONS
        getDefaultLibFileName: () =>
          "node_modules/typescript/lib/lib.es2015.d.ts",
        directoryExists: () => true,
        getCurrentDirectory: () => "",
        getDirectories: () => [],
        getNewLine: () => "\n",
        getCanonicalFileName: (file) => file,
        useCaseSensitiveFileNames: () => false,
        jsDocParsingMode: ts.JSDocParsingMode.ParseAll,
      },
    );
    diagnostics.push(...ts.getPreEmitDiagnostics(program, source));

    program.emit(source, undefined, undefined, undefined, {
      before: [
        transform(
          program,
          {},
          { addDiagnostic: (input) => diagnostics.push(input) },
        ),
      ],
    });
    if (diagnostics.length)
      return {
        type: "failure",
        diagnostics: diagnostics.map((diag) => ({
          category: getCategory(diag.category),
          code: diag.code,
          start: diag.start,
          length: diag.length,
          messageText: getMessageText(diag.messageText),
        })),
      };
    return {
      type: "success",
      typescript: typescript,
      javascript: output.value,
    };
  };
}

const getCategory = (
  value: ts.DiagnosticCategory,
): IAutoViewCompilerResult.DiagnosticCategory => {
  if (value === ts.DiagnosticCategory.Message) return "message";
  else if (value === ts.DiagnosticCategory.Suggestion) return "suggestion";
  else if (value === ts.DiagnosticCategory.Warning) return "warning";
  return "error";
};
const getMessageText = (text: string | ts.DiagnosticMessageChain): string =>
  typeof text === "string" ? text : text.messageText;
