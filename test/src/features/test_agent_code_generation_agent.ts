import {
  CodeGeneration,
  IAutoViewAgentProvider,
  PlanGeneration,
} from "@autoview/agent";
import OpenAI from "openai";

import { TestGlobal } from "../TestGlobal";

export async function test_agent_code_generation_agent(): Promise<void> {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  const provider: IAutoViewAgentProvider.IChatGpt = {
    type: "chatgpt",
    model: "gpt-4o-mini",
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };

  //   const mainContentExtractionAgent = new MainContentExtraction.Agent();

  //   await mainContentExtractionAgent.execute({
  //     provider,
  //     jsonResponse: `
  // {
  //   "function": {
  //     "path": "connector_slack_get_files_post",
  //     "method": "post"
  //   },
  //   "arguments": [
  //     {
  //       "channel": "C0654GRKQNM",
  //       "latestDateTime": "2024-10-16T10:31:47.492Z",
  //       "limit": 200,
  //       "oldestDateTime": "2024-10-13T00:00:00.000Z",
  //       "secretKey": "63bfd9cf-b377-49b4-9ecc-0fb3fc0942ed"
  //     }
  //   ],
  //   "success": true,
  //   "value": {
  //     "ok": true,
  //     "files": [
  //       {
  //         "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SBPQREAU/mockups.png",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SBPQREAU/download/mockups.png",
  //         "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07SBPQREAU-02c218b539/mockups_1024.png",
  //         "name": "Mockups.png",
  //         "id": "F07SBPQREAU",
  //         "user": "U060JBN3PGX",
  //         "size": 933559,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728857835,
  //         "mimetype": "image/png"
  //       },
  //       {
  //         "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/image.png",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/download/image.png",
  //         "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLA68XGV-7ba430e150/image_1024.png",
  //         "name": "image.png",
  //         "id": "F07RLA68XGV",
  //         "user": "U0769CNJVLL",
  //         "size": 1351407,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728865958,
  //         "mimetype": "image/png"
  //       },
  //       {
  //         "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP3BTBMZ/image.png",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP3BTBMZ/download/image.png",
  //         "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RP3BTBMZ-b3f01a2f8f/image_1024.png",
  //         "name": "image.png",
  //         "id": "F07RP3BTBMZ",
  //         "user": "U0769CNJVLL",
  //         "size": 1327518,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728865967,
  //         "mimetype": "image/png"
  //       },
  //       {
  //         "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SC00310Q/image.png",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SC00310Q/download/image.png",
  //         "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07SC00310Q-005e912be6/image_1024.png",
  //         "name": "image.png",
  //         "id": "F07SC00310Q",
  //         "user": "U0769CNJVLL",
  //         "size": 1410819,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728865998,
  //         "mimetype": "image/png"
  //       },
  //       {
  //         "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP61MCHG/image.png",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP61MCHG/download/image.png",
  //         "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RP61MCHG-19e338ab2d/image_1024.png",
  //         "name": "image.png",
  //         "id": "F07RP61MCHG",
  //         "user": "U0769CNJVLL",
  //         "size": 1370028,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728866008,
  //         "mimetype": "image/png"
  //       },
  //       {
  //         "url_private": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLU40D1B-e506dd18f1/________________________________2024-10-14______________2.38.45.mp4",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLU40D1B/download/________________________________2024-10-14______________2.38.45.mov",
  //         "name": "화면 기록 2024-10-14 오후 2.38.45.mov",
  //         "id": "F07RLU40D1B",
  //         "user": "U04JTP7U1JS",
  //         "size": 15396803,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728884368,
  //         "mimetype": "video/quicktime"
  //       },
  //       {
  //         "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07R8KG95ST/image.png",
  //         "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07R8KG95ST/download/image.png",
  //         "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07R8KG95ST-65edb15839/image_1024.png",
  //         "name": "image.png",
  //         "id": "F07R8KG95ST",
  //         "user": "U0769CNJVLL",
  //         "size": 1313006,
  //         "channels": [
  //           "C0654GRKQNM"
  //         ],
  //         "comments_count": 0,
  //         "created": 1728866108,
  //         "mimetype": "image/png"
  //       }
  //     ]
  //   }
  // }
  // `,
  //   });

  const planGenerationAgent = new PlanGeneration.Agent();
  const plan = await planGenerationAgent.execute({
    provider,
    inputSchema: {
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
                "List of the stocks to be purchased.\n\n\n@minItems 1",
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
    },
    defs: {
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
    components: [
      {
        name: "VerticalList",
        description: "places children components in vetical layout",
        componentSchema: {
          type: "object",
          properties: {
            children: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
          required: ["children"],
        },
      },
      {
        name: "HorizontalList",
        description: "places children components in horizontal layout",
        componentSchema: {
          type: "object",
          properties: {
            children: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
      },
      {
        name: "Grid",
        description: "places children components in grid layout",
        componentSchema: {
          type: "object",
          properties: {
            children: {
              type: "array",
              items: {
                type: "object",
              },
            },
            columns: {
              type: "number",
            },
          },
          required: ["children", "columns"],
        },
      },
      {
        name: "ImageView",
        description: "displays an image",
        componentSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
            },
            alt: {
              type: "string",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "Text",
        description: "displays a text",
        componentSchema: {
          type: "object",
          properties: {
            children: {
              type: "string",
            },
          },
          required: ["children"],
        },
      },
      {
        name: "LinkText",
        description: "displays a text with a link",
        componentSchema: {
          type: "object",
          properties: {
            children: {
              type: "string",
            },
            url: {
              type: "string",
            },
          },
          required: ["children", "url"],
        },
      },
    ],
  });

  const codeGenerationAgent = new CodeGeneration.Agent();
  const code = await codeGenerationAgent.execute({
    provider,
    inputSchema: {
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
                "List of the stocks to be purchased.\n\n\n@minItems 1",
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
    },
    rootComponentSchema: {
      defs: {
        Component: {
          anyOf: [
            {
              $ref: "#/defs/VerticalList",
            },
            {
              $ref: "#/defs/HorizontalList",
            },
            {
              $ref: "#/defs/Grid",
            },
            {
              $ref: "#/defs/ImageView",
            },
            {
              $ref: "#/defs/TextView",
            },
            {
              $ref: "#/defs/LinkTextView",
            },
          ],
        },
        VerticalList: {
          type: "object",
          properties: {
            children: {
              type: "array",
              items: {
                $ref: "#/defs/Component",
              },
            },
          },
          required: ["children"],
        },
        HorizontalList: {
          type: "object",
          properties: {
            children: {
              type: "array",
              items: {
                $ref: "#/defs/Component",
              },
            },
          },
          required: ["children"],
        },
        Grid: {
          type: "object",
          properties: {
            children: {
              type: "array",
              items: {
                $ref: "#/defs/Component",
              },
            },
            columns: {
              type: "number",
            },
          },
          required: ["children", "columns"],
        },
        ImageView: {
          type: "object",
          properties: {
            url: {
              type: "string",
            },
            alt: {
              type: "string",
            },
          },
          required: ["url"],
        },
        TextView: {
          type: "object",
          properties: {
            children: {
              type: "string",
            },
          },
          required: ["children"],
        },
        LinkTextView: {
          type: "object",
          properties: {
            children: {
              type: "string",
            },
            url: {
              type: "string",
            },
          },
          required: ["children", "url"],
        },
      },
      $ref: "#/defs/Component",
    },
    componentPlan: plan.component,
  });

  console.log(code.analysis);
  console.log(code.tsFunction);
  console.log(code.jsFunction);
}
