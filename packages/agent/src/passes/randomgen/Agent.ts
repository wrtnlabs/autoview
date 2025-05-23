import { IAutoViewCompilerService } from "@autoview/interface";
import { OpenApi, OpenApiTypeChecker } from "@samchon/openapi";
import { OpenApiValidator } from "@samchon/openapi/lib/utils/OpenApiValidator";
import { WorkerConnector } from "tgrid";
import { is_node } from "tstl";
import typia from "typia";

import { AgentBase, LlmFailure, LlmProxy } from "../../core";
import { BOILERPLATE_ALIAS, BOILERPLATE_SUBTYPE_PREFIX } from "../common";
import { Input, Output } from "./dto";
import { prompt } from "./prompt";

/**
 * The agent for the random data generation pass. This agent is responsible for generating the realistic mock data that matches with the input schema.
 */
export class Agent implements AgentBase<Input, Output> {
  private worker: WorkerConnector<null, null, IAutoViewCompilerService> | null =
    null;

  async open(): Promise<void> {
    this.worker = new WorkerConnector(null, null);

    if (is_node()) {
      await this.worker.connect(
        `${__dirname}/../../../../compiler/lib/worker/index.js`,
      );
    } else {
      await this.worker.connect("/worker.js");
    }
  }

  async close(): Promise<void> {
    if (this.worker == null) return;
    await this.worker.close();
    this.worker = null;
  }

  async execute(input: Input): Promise<Output> {
    if (!this.worker) throw new Error("worker not initialized");

    const service = this.worker.getDriver();
    await service.initialize({
      inputMetadata: input.inputSchema,
    });

    const boilerplate = await service.generateBoilerplateForReactComponent(
      BOILERPLATE_ALIAS,
      BOILERPLATE_SUBTYPE_PREFIX,
    );
    const systemPrompt = prompt({
      boilerplate,
    });

    const results = await new LlmProxy<Input, Output>()
      .withTextHandler(handleText)
      .withPreGenerationCallback(
        async (api, body, options, backoffStrategy) => {
          if (!input.onPreLlmGeneration) {
            return undefined;
          }

          const result = await input.onPreLlmGeneration(
            input.sessionId,
            api,
            body,
            options,
            backoffStrategy,
          );

          if (typeof result === "function") {
            return async (completion) => {
              await result(input.sessionId, completion);
            };
          }

          return undefined;
        },
      )
      .call(
        input,
        input.vendor.api,
        {
          model: input.vendor.model,
          messages: [
            {
              role: "user",
              content: systemPrompt,
            },
          ],
          ...(input.vendor.isThinkingEnabled
            ? { reasoning_effort: "medium" }
            : {}),
        },
        input.vendor.options,
      );

    const result = results[0];

    if (result == null) {
      throw new LlmFailure(`expect 1 output, but got ${results.length}`);
    }

    return result;
  }
}

/**
 * Handles the text output from the LLM.
 *
 * This function extracts the mock data from the text output and then validates the mock data with the input schema.
 *
 * It will throw `LlmFailure` if the mock data is not valid, so the LLM will be retried.
 *
 * @param input - The input of the pass.
 * @param text - The text output from the LLM.
 * @returns The output of the pass, a mock data.
 */
function handleText(input: Input, text: string): Output {
  const output = parseOutput(text);

  const [sanitizedSchema, sanitizedComponents] = removeInvalidPattern(
    input.inputSchema.schema,
    input.inputSchema.components,
  );
  const result = OpenApiValidator.validate({
    schema: sanitizedSchema,
    components: sanitizedComponents,
    value: output.mock_data,
    required: true,
  });

  if (!result.success) {
    throw new LlmFailure(
      `the mock data you've generated is not match with the type \`${BOILERPLATE_ALIAS}\`; analyze the type again with the errors and try again: \n\n<error>\n${JSON.stringify(
        result.errors,
        null,
        2,
      )}\n</error>`,
    );
  }

  return {
    mockData: output.mock_data,
  };
}

interface TextOutput {
  mock_data: unknown;
}

/**
 * Parses the text output from the LLM.
 *
 * This function expects the output text is formatted as follows:
 *
 * ```xml
 * <mock_data>
 *   ...
 * </mock_data>
 * ```
 *
 * PROMPT: This format is bound to the prompt, so it should not be changed without proper prompt update.
 *
 * @param text - The text output from the LLM.
 * @returns The parsed text output, including the mock data.
 */
function parseOutput(text: string): TextOutput {
  const mockData = text.match(/<mock_data>([\s\S]*?)<\/mock_data>/);

  if (mockData?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain a mock data within <mock_data> tags`,
    );
  }

  try {
    return {
      mock_data: JSON.parse(mockData[1]),
    };
  } catch (error: unknown) {
    throw new LlmFailure(
      `failed to parse the output; the mock data string you've generated is not a valid JSON value: \n\n<error>\n${JSON.stringify(
        error,
        null,
        2,
      )}\n</error>`,
    );
  }
}

/**
 * Remove the invalid patterns from the schema and components.
 *
 * Since the `OpenApiValidator` expects valid regex patterns for `pattern` property of `string` type,
 * this function must be called before using the schema with the `OpenApiValidator`.
 *
 * This function returns a copy of the schema and components with the invalid patterns removed.
 *
 * @param schema - The schema to remove the invalid patterns from.
 * @param components - The components to remove the invalid patterns from.
 * @returns The sanitized schema and components.
 */
function removeInvalidPattern(
  schema: OpenApi.IJsonSchema,
  components: OpenApi.IComponents,
): [OpenApi.IJsonSchema, OpenApi.IComponents] {
  const clonedSchema = typia.misc.assertClone(schema);
  const clonedComponents = typia.misc.assertClone(components);

  removeInvalidPatternInline(clonedSchema);

  if (clonedComponents.schemas) {
    for (const value of Object.values(clonedComponents.schemas)) {
      removeInvalidPatternInline(value);
    }
  }

  return [clonedSchema, clonedComponents];
}

function removeInvalidPatternInline(schema: OpenApi.IJsonSchema): void {
  if (OpenApiTypeChecker.isString(schema)) {
    removeInvalidPatternString(schema);
  } else if (OpenApiTypeChecker.isArray(schema)) {
    removeInvalidPatternArray(schema);
  } else if (OpenApiTypeChecker.isTuple(schema)) {
    removeInvalidPatternTuple(schema);
  } else if (OpenApiTypeChecker.isObject(schema)) {
    removeInvalidPatternObject(schema);
  } else if (OpenApiTypeChecker.isOneOf(schema)) {
    removeInvalidPatternOneOf(schema);
  }
}

function removeInvalidPatternString(string: OpenApi.IJsonSchema.IString): void {
  if (string.pattern) {
    try {
      new RegExp(string.pattern);
    } catch {
      string.pattern = undefined;
    }
  }
}

function removeInvalidPatternArray(array: OpenApi.IJsonSchema.IArray): void {
  removeInvalidPatternInline(array.items);
}

function removeInvalidPatternTuple(tuple: OpenApi.IJsonSchema.ITuple): void {
  for (const prefixItem of tuple.prefixItems) {
    removeInvalidPatternInline(prefixItem);
  }

  if (tuple.additionalItems && typeof tuple.additionalItems === "object") {
    removeInvalidPatternInline(tuple.additionalItems);
  }
}

function removeInvalidPatternObject(object: OpenApi.IJsonSchema.IObject): void {
  if (object.properties) {
    for (const value of Object.values(object.properties)) {
      removeInvalidPatternInline(value);
    }
  }

  if (
    object.additionalProperties &&
    typeof object.additionalProperties === "object"
  ) {
    removeInvalidPatternInline(object.additionalProperties);
  }
}

function removeInvalidPatternOneOf(oneOf: OpenApi.IJsonSchema.IOneOf): void {
  for (const value of oneOf.oneOf) {
    removeInvalidPatternInline(value);
  }
}
