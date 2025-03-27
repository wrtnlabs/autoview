import { IAutoViewComponentProps } from "@autoview/interface";
import { ChatGptTypeChecker } from "@samchon/openapi";
import typia from "typia";

import { CodeGeneration, PlanGeneration } from "../passes";
import { IComponentWithoutValueValidator } from "../passes/common";
import { IAutoViewAgentProvider } from "../structures";

export namespace AutoViewAgent {
  export interface IResult {
    /**
     * (Intermediate reasoning) The plan of the visualization.
     */
    visualizationPlanning: string;
    /**
     * (Intermediate reasoning) React-like component plan.
     */
    componentPlan: string;
    /**
     * (Intermediate reasoning) The analysis of the input schema and data exploration.
     */
    analysis: string;

    /**
     * The transform function that takes input value (which follows the input schema) and returns the output value (which follows the {@link IAutoViewComponentProps}).
     */
    // transform: Function;

    /**
     * The random function that generates random data which follows the {@link IAutoViewComponentProps}.
     *
     * It is useful to quickly test your generated component.
     */
    // random: Function;

    /**
     * The TypeScript code of the transform function.
     *
     * This code includes several import statements, preventing it to include bunch of DTO interface declarations.
     */
    transformTsCode: string;
  }

  export async function execute(
    provider: IAutoViewAgentProvider,
    inputSchema: unknown,
  ): Promise<IResult> {
    const components = listComponents();

    const planGenerationAgent = new PlanGeneration.Agent();
    const codeGenerationAgent = new CodeGeneration.Agent();
    await codeGenerationAgent.open();

    const plan = await planGenerationAgent.execute({
      provider,
      inputSchema,
      components,
    });

    try {
      const { analysis, transformTsCode } = await codeGenerationAgent.execute({
        provider,
        inputSchema,
        componentSchema: componentSchema(),
        componentPlan: plan.component,
      });

      return {
        visualizationPlanning: plan.visualizationPlanning,
        componentPlan: plan.component,
        analysis,
        // transform,
        // random,
        transformTsCode,
      };
    } finally {
      try {
        await codeGenerationAgent.close();
      } catch (error) {
        console.warn(`failed to close code generation agent: ${error}`);
      }
    }
  }

  function listComponents(): IComponentWithoutValueValidator[] {
    const components: IComponentWithoutValueValidator[] = [];

    ChatGptTypeChecker.visit({
      closure(schema) {
        if (!ChatGptTypeChecker.isReference(schema)) {
          return;
        }

        if (
          !schema.$ref.startsWith("#/$defs/IAutoView") ||
          !schema.$ref.endsWith("Props") ||
          schema.$ref.includes(".")
        ) {
          return;
        }

        const name = schema.$ref.split("/").pop();

        if (!name) {
          return;
        }

        const definition = PARAMETERS.$defs[name];

        if (!definition) {
          return;
        }

        components.push({
          name,
          description: definition.description ?? definition.title ?? "",
          componentSchema: definition as Record<string, unknown>,
        });
      },
      $defs: PARAMETERS.$defs,
      schema: PARAMETERS.properties["props"]!,
    });

    return components;
  }

  function componentSchema(): unknown {
    if (!ChatGptTypeChecker.isObject(PARAMETERS)) {
      throw new Error("PARAMETERS is not an object.");
    }

    return {
      ...PARAMETERS.properties["props"],
      $defs: PARAMETERS.$defs,
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
}
