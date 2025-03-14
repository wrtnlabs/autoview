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
  ): Promise<Function> {
    const components = listComponents();

    const planGenerationAgent = new PlanGeneration.Agent();
    const plan = await planGenerationAgent.execute({
      provider,
      inputSchema,
      components,
    });

    const codeGenerationAgent = new CodeGeneration.Agent();
    const { transform } = await codeGenerationAgent.execute({
      provider,
      inputSchema,
      componentSchema: componentSchema(),
      componentPlan: plan.component,
    });

    return transform;
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
