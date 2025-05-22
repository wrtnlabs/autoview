import { IAutoViewCompilerMetadata } from "@autoview/interface";
import { type ILlmSchema } from "@samchon/openapi";
import { type IJsonSchemaUnit } from "typia";

import { LlmUnrecoverableError } from "../core";
import { CodeGen, RandomGen } from "../passes";
import { IAutoViewVendor } from "../structures";
import { type ConvertedSchema, convertSchema } from "./convert-schema";

export interface IAutoViewInputSchemaBase<T extends string> {
  type: T;
}

export interface IAutoViewJsonSchemaInput
  extends IAutoViewInputSchemaBase<"json-schema"> {
  unit: IJsonSchemaUnit;
}

export interface IAutoViewLlmSchemaInput<Model extends ILlmSchema.Model>
  extends IAutoViewInputSchemaBase<"llm-schema"> {
  model: Model;
  schema: ILlmSchema.ModelSchema[Model];
  $defs?: Record<string, ILlmSchema.ModelSchema[Model]>;
}

export interface IAutoViewParametersInput<Model extends ILlmSchema.Model>
  extends IAutoViewInputSchemaBase<"parameters"> {
  model: Model;
  parameters: ILlmSchema.ModelParameters[Model];
}

export type IAutoViewInput =
  | IAutoViewJsonSchemaInput
  | IAutoViewLlmSchemaInput<"chatgpt">
  | IAutoViewLlmSchemaInput<"claude">
  | IAutoViewLlmSchemaInput<"deepseek">
  | IAutoViewLlmSchemaInput<"gemini">
  | IAutoViewLlmSchemaInput<"llama">
  | IAutoViewLlmSchemaInput<"3.0">
  | IAutoViewLlmSchemaInput<"3.1">
  | IAutoViewParametersInput<"chatgpt">
  | IAutoViewParametersInput<"claude">
  | IAutoViewParametersInput<"deepseek">
  | IAutoViewParametersInput<"gemini">
  | IAutoViewParametersInput<"llama">
  | IAutoViewParametersInput<"3.0">
  | IAutoViewParametersInput<"3.1">;

/**
 * Configuration of the {@link AutoViewAgent}.
 */
export interface IAutoViewConfig {
  /**
   * The vendor of the entire agent pipeline.
   */
  vendor: IAutoViewVendor;

  /**
   * The vendor of the mock data generation.
   *
   * If not provided, the same vendor as the `vendor` will be used.
   */
  mockDataVendor?: IAutoViewVendor;

  /**
   * The input schema that will be consumed by the generated React component.
   */
  input: IAutoViewInput;
}

/**
 * Result of the {@link AutoViewAgent}.
 */
export type IAutoViewResult = IAutoViewResultSuccess | IAutoViewResultFailure;

export interface IAutoViewResultBase<T extends string> {
  status: T;
}

export interface IAutoViewResultSuccess extends IAutoViewResultBase<"success"> {
  /**
   * A TypeScript code of the generated React component including needed interface definitions. This code can be inserted directly in your project.
   */
  tsxCode: string;

  /**
   * A TypeScript code same as `tsxCode`, but compiler boilerplate part (import statements and interface definitions) is removed. This is a pure LLM-generated output.
   */
  tsxCodeGeneratedOnly: string;

  /**
   * A JavaScript code of the generated and transpiled React component.
   */
  jsxCode: string;

  /**
   * The mock data that matches with the input schema.
   *
   * This is useful to test and visualize the generated React component.
   */
  mockData: any;
}

export interface IAutoViewResultFailure extends IAutoViewResultBase<"failure"> {
  /**
   * Describes why the pipeline execution has failed.
   */
  reason: string;
}

/**
 * The `AutoViewAgent`.
 *
 * This is the class that orchestrates the entire agent pipeline.
 */
export class AutoViewAgent {
  constructor(private config: IAutoViewConfig) {}

  /**
   * Execute the agent pipeline.
   *
   * It generates a React component that consumes a value of the input schema and visualizes it.
   *
   * @returns The result of the agent pipeline.
   */
  async generate(): Promise<IAutoViewResult> {
    const inputSchema = this.getInputSchema();

    const codegenAgent = new CodeGen.Agent();
    const randomgenAgent = new RandomGen.Agent();

    try {
      await Promise.all([codegenAgent.open(), randomgenAgent.open()]);
    } catch (error: unknown) {
      return {
        status: "failure",
        reason: `[INTERNAL ISSUE] failed to open connection to the compiler service: ${error}`,
      };
    }

    try {
      const [code, mockData] = await Promise.all([
        codegenAgent
          .execute({
            vendor: this.config.vendor,
            inputSchema,
          })
          .catch((error) =>
            error instanceof LlmUnrecoverableError
              ? `the LLM failed to generate a compilable React component despite of multiple tries with error feedback:\n\n<error>\n${error.getMessage()}\n</error>`
              : `failed to execute code generation agent:\n\n<error>\n${error}\n</error>`,
          ),
        randomgenAgent
          .execute({
            vendor: this.config.mockDataVendor ?? this.config.vendor,
            inputSchema,
          })
          .catch((error) =>
            error instanceof LlmUnrecoverableError
              ? `the LLM failed to generate a valid mock data despite of multiple tries with error feedback:\n\n<error>\n${error.getMessage()}\n</error>`
              : `[INTERNAL ISSUE] failed to execute mock data generation agent:\n\n<error>\n${error}\n</error>`,
          ),
      ]);

      const failureReasons: string[] = [];

      if (typeof code !== "string" && typeof mockData !== "string") {
        return {
          status: "success",
          tsxCode: code.entireTsCode,
          tsxCodeGeneratedOnly: code.generatedTsCode,
          jsxCode: code.jsCode,
          mockData: mockData.mockData,
        };
      }

      if (typeof code === "string") failureReasons.push(code);
      if (typeof mockData === "string") failureReasons.push(mockData);

      return {
        status: "failure",
        reason: `failure reasons:\n\n<reasons>\n${failureReasons.map((reason) => `- ${reason}`).join("\n")}\n</reasons>`,
      };
    } finally {
      try {
        await codegenAgent.close();
      } catch (error) {
        console.warn(`failed to close code generation agent: ${error}`);
      }

      try {
        await randomgenAgent.close();
      } catch (error) {
        console.warn(`failed to close mock data generation agent: ${error}`);
      }
    }
  }

  private getInputSchema(): IAutoViewCompilerMetadata {
    if (this.config.input.type === "json-schema") {
      return {
        components: this.config.input.unit.components ?? {},
        schema: this.config.input.unit.schema,
      } satisfies IAutoViewCompilerMetadata;
    } else if (this.config.input.type === "llm-schema") {
      let converted: ConvertedSchema;

      switch (this.config.input.model) {
        case "chatgpt": {
          converted = convertSchema<"chatgpt">(
            "chatgpt",
            this.config.input.schema,
            this.config.input.$defs,
          );
          break;
        }
        case "claude":
        case "deepseek":
        case "llama":
        case "3.1": {
          converted = convertSchema<"claude">(
            "claude",
            this.config.input.schema,
            this.config.input.$defs,
          );
          break;
        }
        case "gemini": {
          converted = convertSchema<"gemini">(
            "gemini",
            this.config.input.schema,
            this.config.input.$defs,
          );
          break;
        }
        case "3.0": {
          converted = convertSchema<"3.0">(
            "3.0",
            this.config.input.schema,
            this.config.input.$defs,
          );
          break;
        }
      }
      return {
        components: converted.components,
        schema: converted.schema,
      } satisfies IAutoViewCompilerMetadata;
    } else if (this.config.input.type === "parameters") {
      let converted: ConvertedSchema;

      switch (this.config.input.model) {
        case "chatgpt": {
          converted = convertSchema<"chatgpt">(
            "chatgpt",
            this.config.input.parameters,
            this.config.input.parameters.$defs,
          );
          break;
        }
        case "claude":
        case "deepseek":
        case "llama":
        case "3.1": {
          converted = convertSchema<"claude">(
            "claude",
            this.config.input.parameters,
            this.config.input.parameters.$defs,
          );
          break;
        }
        case "gemini": {
          converted = convertSchema<"gemini">(
            "gemini",
            this.config.input.parameters,
          );
          break;
        }
        case "3.0": {
          converted = convertSchema<"3.0">("3.0", this.config.input.parameters);
          break;
        }
      }
      return {
        components: converted.components,
        schema: converted.schema,
      } satisfies IAutoViewCompilerMetadata;
    } else {
      throw new Error("invalid input schema type");
    }
  }
}

// function componentSchema(): IAutoViewCompilerMetadata {
//   return typia.json.schema<IAutoViewComponentProps>();
// }
