import {
  CodeGeneration,
  IAutoViewAgentProvider,
  PlanGeneration,
} from "@autoview/agent";
import {
  IAutoViewCompilerMetadata,
  IAutoViewComponentProps,
} from "@autoview/interface";
import { ChatGptTypeChecker } from "@samchon/openapi";
import OpenAI from "openai";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";

export async function test_agent_code_generation_agent(): Promise<void> {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  const planProvider: IAutoViewAgentProvider.IChatGpt = {
    type: "chatgpt",
    model: "o3-mini-2025-01-31",
    isThinkingEnabled: true,
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };
  const codeProvider: IAutoViewAgentProvider.IChatGpt = {
    type: "chatgpt",
    model: "o3-mini-2025-01-31",
    isThinkingEnabled: true,
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };

  const planGenerationAgent = new PlanGeneration.Agent();
  await planGenerationAgent.open();

  const codeGenerationAgent = new CodeGeneration.Agent();
  await codeGenerationAgent.open();

  const components = componentSchema();

  const schemaAsCompilerMetadata: IAutoViewCompilerMetadata = {
    $defs: schema["$defs"] as any,
    schema: schema as any,
  };

  const plan = await planGenerationAgent.execute({
    provider: planProvider,
    inputSchema: schemaAsCompilerMetadata,
    componentSchema: components,
  });
  const code = await codeGenerationAgent.execute({
    provider: codeProvider,
    inputSchema: schemaAsCompilerMetadata,
    componentSchema: components,
    initialAnalysis: plan.initial_analysis,
    dataExploration: plan.data_exploration,
    ideas: plan.ideas,
    reasoning: plan.reasoning,
    planning: plan.planning,
  });

  console.log(code.transformTsCode);

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

const schema = {
  type: "object",
  properties: {
    body: {
      description:
        'Creation information of a shopping cart commodity.\n\n------------------------------\n\nDescription of the current {@link IShoppingCartCommodity.ICreate} type:\n\n> Creation information of a shopping cart commodity.\n\n------------------------------\n\nDescription of the parent {@link IShoppingCartCommodity} type:\n\n> Item in a shopping cart.\n> \n> `IShoppingCartCommodity` is an entity that represents a\n> {@link IShoppingSaleSnapshot snapshot} of the items that\n> {@link IShoppingCustomer customer} has placed into his shopping cart with a\n> {@link IShoppingOrder purchase} in mind. And if the customer continues this\n> into an actual order in the future, `IShoppingCartCommodity` be changed to\n> {@link IShoppingOrderGood}.\n> \n> And while adding a sale snapshot to the shopping cart, the customer inevitably\n> selects specific {@link IShoppingSaleUnit units} and\n> {@link IShoppingSaleUnitStock final stocks} within the listing snapshot.\n> Information about these units and stocks is recorded in the subsidiary entity\n> {@link IShoppingCartCommodityStock}. Also, there is an attribute {@link volume}\n> that indicates how many sets of snapshots of the target commodity will be\n> purchased. This "volume" is a value that will be multiplied by\n> {@link IShoppingSaleUnitStock.IInvert.quantity}, the quantity for each\n> component.',
      type: "object",
      properties: {
        sale_id: {
          title: "Target sale's {@link IShoppingSale.id}",
          description:
            "Target sale's {@link IShoppingSale.id}.\n\n\n@format uuid",
          type: "string",
        },
        stocks: {
          title: "List of the stocks to be purchased",
          description:
            "List of the stocks to be purchased.\n\n\n@minItems 1\n\n\nEach item must be annotated with an icon.",
          type: "array",
          items: {
            description:
              "Creation information of the commodity stock of shopping cart.\n\nWhen record being created, its corresponding structure would be\n{@link IShoppingSaleSnapshotUnit.IInvert} and\n{@link IShoppingSaleSnapshotUnitStock.IInvert}.\n\n------------------------------\n\nDescription of the current {@link IShoppingCartCommodityStock.ICreate} type:\n\n> Creation information of the commodity stock of shopping cart.\n> \n> When record being created, its corresponding structure would be\n> {@link IShoppingSaleSnapshotUnit.IInvert} and\n> {@link IShoppingSaleSnapshotUnitStock.IInvert}.",
            type: "object",
            properties: {
              unit_id: {
                title: "Target unit's {@link IShoppingSaleUnit.id}",
                description:
                  "Target unit's {@link IShoppingSaleUnit.id}.\n\n\n@format uuid",
                type: "string",
              },
              stock_id: {
                title: "Target stock's {@link IShoppingSaleUnitStock.id}",
                description:
                  "Target stock's {@link IShoppingSaleUnitStock.id}.\n\nIt must be matched with the {@link choices} property.\n\n\n@format uuid",
                type: "string",
              },
              choices: {
                title:
                  "Creation information of the choices for each descriptive option",
                description:
                  "Creation information of the choices for each descriptive option.\n\nIf target option is not of descriptive but of selective, then\nthis property must be an empty array.",
                type: "array",
                items: {
                  description:
                    "Creation information of the choice for each option (of descriptive).\n\nWhen target option is {@link IShoppingSaleUnitDescriptiveOption}\ntype, then you have to compose this choice structure with\n{@link value} specification.\n\nOtherwise when target option is {@link IShoppingSaleUnitSelectableOption}\ntype, you don't need to compose this choice structure. Just fill only\nthe {@link IShoppingCartCommodityStock.ICreate.stock_id} property.\n\n------------------------------\n\nDescription of the current {@link IShoppingCartCommodityStockChoice.ICreate} type:\n\n> Creation information of the choice for each option (of descriptive).\n> \n> When target option is {@link IShoppingSaleUnitDescriptiveOption}\n> type, then you have to compose this choice structure with\n> {@link value} specification.\n> \n> Otherwise when target option is {@link IShoppingSaleUnitSelectableOption}\n> type, you don't need to compose this choice structure. Just fill only\n> the {@link IShoppingCartCommodityStock.ICreate.stock_id} property.",
                  type: "object",
                  properties: {
                    option_id: {
                      title:
                        "Target option's {@link IShoppingSaleUnitOption.id}",
                      description:
                        "Target option's {@link IShoppingSaleUnitOption.id}.\n\n\n@format uuid",
                      type: "string",
                    },
                    value: {
                      title: "Written value about the option",
                      description:
                        "Written value about the option.\n\nWhen target option's type is 'descriptive', then you have to\nfill this property with the written value by the customer.",
                      anyOf: [
                        {
                          type: "null",
                        },
                        {
                          type: "string",
                        },
                        {
                          type: "number",
                        },
                        {
                          type: "boolean",
                        },
                      ],
                    },
                  },
                  required: ["option_id", "value"],
                },
              },
              quantity: {
                title: "Quantity of the stock to purchase",
                description:
                  "Quantity of the stock to purchase.\n\nThis value is multiplied by the {@link IShoppingCartCommodity.volume}.\n\n\n@minimum 1",
                type: "integer",
              },
            },
            required: ["unit_id", "stock_id", "choices", "quantity"],
          },
        },
        volume: {
          title: "Volume of the commodity to purchase",
          description:
            "Volume of the commodity to purchase.\n\nA value indicating how many sets would be multiplied to the children\n{@link IShoppingSaleUnitStock.IInvert.quantity} values.\n\n\n@minimum 1",
          type: "integer",
        },
        accumulate: {
          title: "Whether to accumulate the volume or not",
          description:
            "Whether to accumulate the volume or not.\n\nIf this attribute is not `false` and there's same commodity that\ncomposed with same stocks and options, then the volume will be\naccumulated to the existed one.\n\nOtherwise, duplicated commodity would be newly created.",
          anyOf: [
            {
              type: "null",
            },
            {
              type: "boolean",
            },
          ],
        },
      },
      required: ["sale_id", "stocks", "volume"],
    },
  },
  additionalProperties: false,
  required: ["body"],
  $defs: {
    "IShoppingChannelCategory.IInvert": {
      description: "Invert category information with parent category.",
      type: "object",
      properties: {
        parent: {
          title: "Parent category info with recursive structure",
          description:
            "Parent category info with recursive structure.\n\nIf no parent exists, then be `null`.",
          anyOf: [
            {
              type: "null",
            },
            {
              $ref: "#/$defs/IShoppingChannelCategory.IInvert",
            },
          ],
        },
        id: {
          title: "Primary Key",
          description: "Primary Key.\n\n\n@format uuid",
          type: "string",
        },
        code: {
          title: "Identifier code of the category",
          description:
            "Identifier code of the category.\n\nThe code must be unique in the channel.",
          type: "string",
        },
        parent_id: {
          title: "Parent category's ID",
          description: "Parent category's ID.",
          anyOf: [
            {
              type: "null",
            },
            {
              type: "string",
              description: "@format uuid",
            },
          ],
        },
        name: {
          title: "Representative name of the category",
          description:
            "Representative name of the category.\n\nThe name must be unique within the parent category. If no parent exists,\nthen the name must be unique within the channel between no parent\ncategories.",
          type: "string",
        },
        created_at: {
          title: "Creation time of record",
          description: "Creation time of record.\n\n\n@format date-time",
          type: "string",
        },
      },
      required: ["parent", "id", "code", "parent_id", "name", "created_at"],
    },
  },
};
