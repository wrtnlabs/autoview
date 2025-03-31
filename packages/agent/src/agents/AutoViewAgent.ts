import {
  IAutoViewCompilerMetadata,
  IAutoViewComponentProps,
} from "@autoview/interface";
import { ChatGptTypeChecker } from "@samchon/openapi";
import typia from "typia";

import { CodeGeneration, PlanGeneration } from "../passes";
import { IAutoViewAgentProvider } from "../structures";

export namespace AutoViewAgent {
  export interface IResult {
    /**
     * (Intermediate reasoning) Initial analysis of the input schema.
     */
    initialAnalysis: string;

    /**
     * (Intermediate reasoning) Data exploration of the input schema.
     */
    dataExploration: string;

    /**
     * (Intermediate reasoning) Ideas of visualizations.
     */
    ideas: string;

    /**
     * (Intermediate reasoning) Reasoning of the visualization.
     */
    reasoning: string;

    /**
     * (Intermediate reasoning) Planning of the visualization.
     */
    planning: string;

    /**
     * (Intermediate reasoning) The analysis of the input schema and thinking process of the visualization planning.
     */
    analysis: string;

    /**
     * The TypeScript code of the transform function.
     *
     * This code includes several import statements, preventing it to include bunch of DTO interface declarations.
     */
    transformTsCode: string;
  }

  export async function execute(
    planProvider: IAutoViewAgentProvider,
    codeProvider: IAutoViewAgentProvider,
    inputSchema: IAutoViewCompilerMetadata,
  ): Promise<IResult> {
    const planGenerationAgent = new PlanGeneration.Agent();
    await planGenerationAgent.open();

    const codeGenerationAgent = new CodeGeneration.Agent();
    await codeGenerationAgent.open();

    const components = componentSchema();

    const plan = await planGenerationAgent.execute({
      provider: planProvider,
      inputSchema,
      componentSchema: components,
    });

    try {
      const { analysis, transformTsCode } = await codeGenerationAgent.execute({
        provider: codeProvider,
        inputSchema,
        componentSchema: components,
        initialAnalysis: plan.initial_analysis,
        dataExploration: plan.data_exploration,
        ideas: plan.ideas,
        reasoning: plan.reasoning,
        planning: plan.planning,
      });

      return {
        initialAnalysis: plan.initial_analysis,
        dataExploration: plan.data_exploration,
        ideas: plan.ideas,
        reasoning: plan.reasoning,
        planning: plan.planning,
        analysis,
        transformTsCode,
      };
    } finally {
      try {
        await planGenerationAgent.close();
      } catch (error) {
        console.warn(`failed to close plan generation agent: ${error}`);
      }
      try {
        await codeGenerationAgent.close();
      } catch (error) {
        console.warn(`failed to close code generation agent: ${error}`);
      }
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
}
