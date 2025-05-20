import { IAutoViewCompilerService } from "@autoview/interface";
import * as fs from "fs/promises";
import { WorkerConnector } from "tgrid";

export async function test_boilerplates(): Promise<void> {
  const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
    new WorkerConnector(null, null);

  await worker.connect(
    `${__dirname}/../../../packages/compiler/lib/worker/index.js`,
  );

  const service = worker.getDriver();
  await service.initialize({
    inputMetadata: {
      schema: inputSchema.schema as any,
      components: {
        schemas: inputSchema.$defs as any,
      },
    },
  });

  const boilerplate = await service.generateBoilerplateForReactComponent(
    "AutoViewInput",
    "AutoViewInputSubTypes",
  );
  console.log(boilerplate);
  await fs.writeFile("test.tsx", boilerplate, "utf-8");

  await worker.close();
}

const inputSchema = {
  schema: {
    $ref: "#/components/schemas/marketplace-purchase",
  },
  $defs: {
    "marketplace-purchase": {
      title: "Marketplace Purchase",
      description: "Marketplace Purchase",
      type: "object",
      properties: {
        url: {
          type: "string",
        },
        type: {
          type: "string",
        },
        id: {
          type: "integer",
        },
        login: {
          type: "string",
        },
        organization_billing_email: {
          type: "string",
        },
        email: {
          oneOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
        marketplace_pending_change: {
          oneOf: [
            {
              type: "object",
              properties: {
                is_installed: {
                  type: "boolean",
                },
                effective_date: {
                  type: "string",
                },
                unit_count: {
                  oneOf: [
                    {
                      type: "integer",
                    },
                    {
                      type: "null",
                    },
                  ],
                },
                id: {
                  type: "integer",
                },
                plan: {
                  $ref: "#/components/schemas/marketplace-listing-plan",
                },
              },
              required: [],
            },
            {
              type: "null",
            },
          ],
        },
        marketplace_purchase: {
          type: "object",
          properties: {
            billing_cycle: {
              type: "string",
            },
            next_billing_date: {
              oneOf: [
                {
                  type: "string",
                },
                {
                  type: "null",
                },
              ],
            },
            is_installed: {
              type: "boolean",
            },
            unit_count: {
              oneOf: [
                {
                  type: "integer",
                },
                {
                  type: "null",
                },
              ],
            },
            on_free_trial: {
              type: "boolean",
            },
            free_trial_ends_on: {
              oneOf: [
                {
                  type: "string",
                },
                {
                  type: "null",
                },
              ],
            },
            updated_at: {
              type: "string",
            },
            plan: {
              $ref: "#/components/schemas/marketplace-listing-plan",
            },
          },
          required: [],
        },
      },
      required: ["url", "id", "type", "login", "marketplace_purchase"],
    },
    "marketplace-listing-plan": {
      title: "Marketplace Listing Plan",
      description: "Marketplace Listing Plan",
      type: "object",
      properties: {
        url: {
          example: "https://api.github.com/marketplace_listing/plans/1313",
          type: "string",
          format: "uri",
        },
        accounts_url: {
          example:
            "https://api.github.com/marketplace_listing/plans/1313/accounts",
          type: "string",
          format: "uri",
        },
        id: {
          example: 1313,
          type: "integer",
        },
        number: {
          example: 3,
          type: "integer",
        },
        name: {
          example: "Pro",
          type: "string",
        },
        description: {
          example: "A professional-grade CI solution",
          type: "string",
        },
        monthly_price_in_cents: {
          example: 1099,
          type: "integer",
        },
        yearly_price_in_cents: {
          example: 11870,
          type: "integer",
        },
        price_model: {
          example: "FLAT_RATE",
          oneOf: [
            {
              const: "FREE",
            },
            {
              const: "FLAT_RATE",
            },
            {
              const: "PER_UNIT",
            },
          ],
        },
        has_free_trial: {
          example: true,
          type: "boolean",
        },
        unit_name: {
          oneOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
        state: {
          example: "published",
          type: "string",
        },
        bullets: {
          example: ["Up to 25 private repositories", "11 concurrent builds"],
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: [
        "url",
        "accounts_url",
        "id",
        "number",
        "name",
        "description",
        "has_free_trial",
        "price_model",
        "unit_name",
        "monthly_price_in_cents",
        "state",
        "yearly_price_in_cents",
        "bullets",
      ],
    },
  },
};
