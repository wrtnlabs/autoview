import { IAutoViewComponentProps } from "@autoview/interface";
import { ChatGptTypeChecker } from "@samchon/openapi";
import typia from "typia";

import { CodeGeneration, PlanGeneration } from "../passes";
import { IComponentWithoutValueValidator } from "../passes/common";
import { IAutoViewAgentProvider } from "../structures";

export namespace MainAgent {
  export async function execute(
    provider: IAutoViewAgentProvider,
    inputSchema: unknown,
  ): Promise<any> {
    const planGenerationAgent = new PlanGeneration.Agent();
    const codeGenerationAgent = new CodeGeneration.Agent();

    const components = listComponents();

    const { visualizationPlanning, component } =
      await planGenerationAgent.execute({
        components,
        inputSchema,
        provider,
      });

    const { jsFunction } = await codeGenerationAgent.execute({
      provider,
      inputSchema,
      componentPlan: visualizationPlanning,
      componentSchema: component,
    });

    const v2vTranformer = new Function("$input", jsFunction);

    return v2vTranformer;
  }

  function listComponents(): IComponentWithoutValueValidator[] {
    const components: IComponentWithoutValueValidator[] = [];

    ChatGptTypeChecker.visit({
      closure(schema) {
        if (!ChatGptTypeChecker.isReference(schema)) {
          return;
        }

        if (!schema.$ref.startsWith("#/$defs/IAutoView")) {
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
      schema: PARAMETERS.properties,
    });

    return components;
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
