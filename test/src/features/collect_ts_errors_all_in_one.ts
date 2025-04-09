import {
  AllInOne,
  CodeGeneration,
  IAutoViewVendor,
  LlmUnrecoverableError,
  PlanGeneration,
} from "@autoview/agent";
import {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerResult,
  IAutoViewComponentProps,
} from "@autoview/interface";
import { ChatGptTypeChecker } from "@samchon/openapi";
import * as fs from "fs/promises";
import OpenAI from "openai";
import * as path from "path";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import * as Report from "./collect_ts_errors_report_agent";

const NUM_OF_ATTEMPTS_PER_SCHEMA = 10;

export async function test_collect_ts_errors_all_in_one(): Promise<void> {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  const schemaList = await collectSchemaList();
  const counter: TestCounter = {
    finished: 0,
    total: schemaList.length * NUM_OF_ATTEMPTS_PER_SCHEMA,
    reportProgress(status) {
      ++counter.finished;
      console.log(
        `${counter.finished} / ${counter.total} finished as "${status}"`,
      );
    },
  };

  console.log(`${schemaList.length} schema(s) loaded`);
  console.log(`total ${counter.total} run(s) will be executed...`);

  const results = await collectAllTsErrors(
    counter,
    "o3-mini-2025-01-31",
    true,
    schemaList,
    NUM_OF_ATTEMPTS_PER_SCHEMA,
  );

  console.log("all tests are finished; generating report...");

  const report = await buildReport(
    results,
    schemaList.length,
    NUM_OF_ATTEMPTS_PER_SCHEMA,
  );
  const dump = buildDump(results);
  const reportDir = path.join(__dirname, "collect_ts_errors_report");

  if (
    !(await fs
      .access(reportDir)
      .then(() => true)
      .catch(() => false))
  ) {
    await fs.mkdir(reportDir);
  }

  const reportPath = path.join(reportDir, "all-in-one-report.md");
  await fs.writeFile(reportPath, report, "utf-8");

  const dumpPath = path.join(reportDir, "all-in-one-dump.md");
  await fs.writeFile(dumpPath, dump, "utf-8");

  console.log(`report is generated at "${reportPath}"`);
  console.log(`dump is generated at "${dumpPath}"`);
  console.log("finished");
}

async function buildReport(
  results: IRunAttemptResult[],
  schemaCount: number,
  numOfAttemptsPerSchema: number,
): Promise<string> {
  const mdLines: string[] = [];

  mdLines.push("# AutoView Code Generation Report");
  mdLines.push("");

  mdLines.push("## Summary");
  mdLines.push("");
  {
    const systemErrors = filterSystemErrors(results);
    const hardFailures = filterHardFailures(results);
    const softFailures = countSoftFailures(results);
    const successes = filterSuccesses(results);
    const avgSoftFailureCount = computeAvgSoftFailureCount(results);

    mdLines.push("| Name | Value |");
    mdLines.push("| --- | --- |");
    mdLines.push(`| Total schemas | ${schemaCount} |`);
    mdLines.push(`| Attempts per schema | ${numOfAttemptsPerSchema} |`);
    mdLines.push(
      `| Total attempts | ${results.length} _(${schemaCount} \* ${numOfAttemptsPerSchema})_ |`,
    );
    mdLines.push(`| System errors | ${systemErrors.length} |`);
    mdLines.push(`| Hard failures | ${hardFailures.length} |`);
    mdLines.push(`| Soft failures | ${softFailures} |`);
    mdLines.push(`| Successes | ${successes.length} |`);
    mdLines.push(
      `| Avg. errors per success | ${Number.isNaN(avgSoftFailureCount) ? "*No success*" : avgSoftFailureCount.toFixed(2)} |`,
    );
    mdLines.push("");
  }

  mdLines.push("## Failure Statistics");
  mdLines.push("");
  {
    mdLines.push(buildErrorStatistics(results));
    mdLines.push("");
  }

  mdLines.push("## Per-schema Failure Statistics");
  mdLines.push("");
  {
    const schemaResults = buildPerSchemaResults(results);

    for (const [schemaName, results] of schemaResults.entries()) {
      mdLines.push(`### Schema: ${schemaName}`);
      mdLines.push("");
      {
        const systemErrors = filterSystemErrors(results);
        const hardFailures = filterHardFailures(results);
        const softFailures = countSoftFailures(results);
        const successes = filterSuccesses(results);
        const avgSoftFailureCount = computeAvgSoftFailureCount(results);

        mdLines.push("| Name | Value |");
        mdLines.push("| --- | --- |");
        mdLines.push(`| System errors | ${systemErrors.length} |`);
        mdLines.push(`| Hard failures | ${hardFailures.length} |`);
        mdLines.push(`| Soft failures | ${softFailures} |`);
        mdLines.push(`| Successes | ${successes.length} |`);
        mdLines.push(
          `| Avg. errors per success | ${Number.isNaN(avgSoftFailureCount) ? "*No success*" : avgSoftFailureCount.toFixed(2)} |`,
        );
        mdLines.push("");
      }
    }
  }

  mdLines.push("## Most Problematic Components");
  mdLines.push("");
  {
    const reportAgent = new Report.Agent();
    const reportAgentVendor: IAutoViewVendor = {
      model: "o3-mini-2025-01-31",
      isThinkingEnabled: true,
      api: new OpenAI({
        apiKey: TestGlobal.env.CHATGPT_API_KEY,
      }),
    };

    const failures = results.flatMap((result) => result.errors);
    const analysises = await Promise.all(
      failures.map(async (failure) => {
        try {
          return await reportAgent.execute({
            vendor: reportAgentVendor,
            generatedCode: failure.tsCode,
            diagnostics: failure.diagnostics,
          });
        } catch {
          return null;
        }
      }),
    );

    const problematicComponentMap: Map<string, number> = new Map();
    const problematicComponentPropsMap: Map<
      string,
      Map<string, number>
    > = new Map();

    for (const analysis of analysises) {
      if (analysis == null) {
        continue;
      }

      if (analysis.componentName.toLowerCase() === "n/a") {
        continue;
      }

      problematicComponentMap.set(
        analysis.componentName,
        (problematicComponentMap.get(analysis.componentName) ?? 0) + 1,
      );

      let propsMap = problematicComponentPropsMap.get(analysis.componentName);

      if (!propsMap) {
        propsMap = new Map();
        problematicComponentPropsMap.set(analysis.componentName, propsMap);
      }

      for (const prop of analysis.componentProperties) {
        propsMap.set(prop, (propsMap.get(prop) ?? 0) + 1);
      }
    }

    if (problematicComponentMap.size === 0) {
      mdLines.push("*No problematic component*");
    } else {
      const problematicComponentList = Array.from(
        problematicComponentMap.entries(),
      ).sort(([_a, a], [_b, b]) => b - a);

      for (const [
        component,
        componentReportCount,
      ] of problematicComponentList) {
        const props = problematicComponentPropsMap.get(component);

        if (props == null || props.size === 0) {
          mdLines.push(
            `- \`${component}\` (num. of report is ${componentReportCount})`,
          );
        } else {
          const propList = Array.from(props.entries()).sort(
            ([_a, a], [_b, b]) => b - a,
          );

          mdLines.push(
            `- \`${component}\` (num. of report is ${componentReportCount}): ${propList.map(([prop, propReportCount]) => `\`${prop}\` = ${propReportCount}`).join(", ")}`,
          );
        }
      }
    }

    mdLines.push("");
  }

  return mdLines.join("\n");
}

function buildDump(results: IRunAttemptResult[]): string {
  const mdLines: string[] = [];

  mdLines.push("# Dump");
  mdLines.push("");

  mdLines.push("## Failures");
  mdLines.push("");

  for (const result of results) {
    for (const error of result.errors) {
      for (const diagnostic of error.diagnostics) {
        const tsErrorCode =
          typeof diagnostic.code === "string"
            ? diagnostic.code
            : `TS${diagnostic.code}`;

        if (tsErrorCode.toLowerCase().startsWith("ts")) {
          const tsErrorLink = `https://typescript.tv/errors/#${tsErrorCode.toLowerCase()}`;
          mdLines.push(
            `- [${tsErrorCode}: ${diagnostic.messageText}](${tsErrorLink})`,
          );
        } else {
          mdLines.push(`- ${tsErrorCode}: ${diagnostic.messageText}`);
        }

        mdLines.push("");
      }

      mdLines.push("```plaintext");
      mdLines.push("schema.name:");
      mdLines.push(result.schema.name);
      mdLines.push("```");
      mdLines.push("");

      mdLines.push("```ts");
      mdLines.push(error.tsCode);
      mdLines.push("```");
      mdLines.push("");

      mdLines.push("---");
      mdLines.push("");
    }
  }

  mdLines.push("## Successes");
  mdLines.push("");

  if (filterSuccesses(results).length === 0) {
    mdLines.push("*No success*");
  } else {
    for (const result of results) {
      if (result.validTsCode === undefined) {
        continue;
      }

      mdLines.push("```ts");
      mdLines.push(result.validTsCode);
      mdLines.push("```");
      mdLines.push("");

      mdLines.push("---");
      mdLines.push("");
    }
  }

  return mdLines.join("\n");
}

function filterSystemErrors(results: IRunAttemptResult[]): IRunAttemptResult[] {
  return results.filter((result) => result.systemError !== undefined);
}

function filterHardFailures(results: IRunAttemptResult[]): IRunAttemptResult[] {
  return results.filter(
    (result) =>
      result.systemError === undefined && result.validTsCode === undefined,
  );
}

function filterSuccesses(results: IRunAttemptResult[]): IRunAttemptResult[] {
  return results.filter(
    (result) =>
      result.systemError === undefined && result.validTsCode !== undefined,
  );
}

function countSoftFailures(results: IRunAttemptResult[]): number {
  const countInHardFailures = filterHardFailures(results)
    .map((result) => result.errors.length)
    .reduce((acc, count) => acc + count, 0);
  const countInSuccesses = filterSuccesses(results)
    .map((result) => result.errors.length)
    .reduce((acc, count) => acc + count, 0);

  return countInHardFailures + countInSuccesses;
}

function computeAvgSoftFailureCount(results: IRunAttemptResult[]): number {
  const successes = filterSuccesses(results);
  const softFailures = countSoftFailures(results);

  if (successes.length === 0) {
    return Number.NaN;
  }

  return softFailures / successes.length;
}

function buildPerSchemaResults(
  results: IRunAttemptResult[],
): Map<string, IRunAttemptResult[]> {
  const schemaResults: Map<string, IRunAttemptResult[]> = new Map();

  for (const result of results) {
    let prev = schemaResults.get(result.schema.name);

    if (prev === undefined) {
      prev = [];
      schemaResults.set(result.schema.name, prev);
    }

    prev.push(result);
  }

  return schemaResults;
}

function buildErrorStatistics(results: IRunAttemptResult[]): string {
  const stats: Map<string | number, number> = new Map();

  for (const result of results) {
    for (const error of result.errors) {
      for (const diagnostic of error.diagnostics) {
        const prev = stats.get(diagnostic.code) ?? 0;
        stats.set(diagnostic.code, prev + 1);
      }
    }
  }

  const mdLines: string[] = [];

  if (stats.size === 0) {
    mdLines.push("*No error*");
    return mdLines.join("\n");
  }

  const sortedStats = Array.from(stats.entries()).sort(
    ([_a, aCount], [_b, bCount]) => bCount - aCount,
  );

  for (const [code, count] of sortedStats) {
    const tsErrorCode =
      typeof code === "string" ? code : `TS${code.toString()}`;

    if (tsErrorCode.toLowerCase().startsWith("ts")) {
      const tsErrorLink = `https://typescript.tv/errors/#${tsErrorCode.toLowerCase()}`;
      mdLines.push(`- [${tsErrorCode}: ${count}](${tsErrorLink})`);
    } else {
      mdLines.push(`- ${tsErrorCode}: ${count}`);
    }
  }

  return mdLines.join("\n");
}

interface TestCounter {
  total: number;
  finished: number;
  reportProgress: (status: "success" | "hard failure" | "system error") => void;
}

async function collectAllTsErrors(
  counter: TestCounter,
  model: string,
  isThinkingEnabled: boolean,
  schemaList: ISchema[],
  numOfAttemptsPerSchema: number,
): Promise<IRunAttemptResult[]> {
  const vendor: IAutoViewVendor = {
    model: model as any,
    isThinkingEnabled,
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };

  const results = await Promise.all(
    schemaList.flatMap((schema) =>
      new Array(numOfAttemptsPerSchema)
        .fill(0)
        .map(() => runAttempt(counter, vendor, schema)),
    ),
  );

  return results;
}

interface ISchema {
  name: string;
  schema: IAutoViewCompilerMetadata;
}

async function collectSchemaList(): Promise<ISchema[]> {
  const schemaList: ISchema[] = [];
  const files = await fs.readdir(
    path.join(__dirname, "collect_ts_errors_schemas"),
  );

  for (const file of files) {
    const stat = await fs.stat(
      path.join(__dirname, "collect_ts_errors_schemas", file),
    );

    if (!stat.isFile()) {
      continue;
    }

    if (path.extname(file).toLowerCase() !== ".json") {
      continue;
    }

    const schema: unknown = JSON.parse(
      await fs.readFile(
        path.join(__dirname, "collect_ts_errors_schemas", file),
        "utf-8",
      ),
    );

    if (typeof schema !== "object" || schema === null) {
      continue;
    }

    const $defs = "$defs" in schema ? schema["$defs"] : {};

    schemaList.push({
      name: file,
      schema: {
        $defs: $defs as any,
        schema: schema as any,
      },
    });
  }

  return schemaList;
}

interface ITsError {
  tsCode: string;
  diagnostics: IAutoViewCompilerResult.IDiagnostic[];
}

interface IRunAttemptResult {
  schema: ISchema;
  errors: ITsError[];
  validTsCode?: string;
  systemError?: unknown;
}

async function runAttempt(
  counter: TestCounter,
  vendor: IAutoViewVendor,
  schema: ISchema,
): Promise<IRunAttemptResult> {
  const agent = new AllInOne.Agent();
  await agent.open();

  const components = componentSchema();
  const tsErrors: ITsError[] = [];

  try {
    const result = await agent.execute({
      vendor,
      inputSchema: schema.schema,
      componentSchema: components,
      transformFunctionName: "transform",
      onCompilerError(tsCode, diagnostics) {
        tsErrors.push({ tsCode, diagnostics });
      },
    });

    counter.reportProgress("success");
    return {
      schema,
      errors: tsErrors,
      validTsCode: result.transformTsCode,
    };
  } catch (error: unknown) {
    if (error instanceof LlmUnrecoverableError) {
      counter.reportProgress("hard failure");
      return {
        schema,
        errors: tsErrors,
      };
    }

    counter.reportProgress("system error");
    return {
      schema,
      errors: tsErrors,
      systemError: error,
    };
  } finally {
    await agent.close();
  }
}

function componentSchema(): IAutoViewCompilerMetadata {
  if (!ChatGptTypeChecker.isObject(PARAMETERS)) {
    throw new Error("PARAMETERS is not an object.");
  }

  return {
    $defs: PARAMETERS.$defs,
    schema: PARAMETERS.properties["props"]!,
  };
}

const PARAMETERS = typia.llm.parameters<
  {
    props: IAutoViewComponentProps;
  },
  "chatgpt",
  {
    reference: true;
  }
>();
