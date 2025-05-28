import { convertSchema } from "@autoview/agent";
import {
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
} from "@autoview/interface";
import { ILlmSchemaV3_1 } from "@samchon/openapi";
import * as fs from "fs/promises";
import { WorkerConnector } from "tgrid";

export async function test_render_interlaced_diagnostics(): Promise<void> {
  const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
    new WorkerConnector(null, null);

  await worker.connect(
    `${__dirname}/../../../packages/compiler/lib/worker/index.js`,
  );

  const converted = convertSchema("3.1", inputSchema.schema, inputSchema.$defs);

  const service = worker.getDriver();
  await service.initialize({
    inputMetadata: {
      schema: converted.schema,
      components: converted.components,
    },
  });

  const boilerplate = await service.generateBoilerplateForReactComponent(
    "AutoViewInput",
    "AutoViewInputSubTypes",
  );
  const failureCode = `
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  return return;
}
  `;
  const result = await service.compileReactComponent(boilerplate, failureCode);

  if (result.type !== "failure") {
    await worker.close();
    return;
  }

  const rendered = renderInterlacedDiagnostics(
    boilerplate,
    failureCode,
    result.diagnostics,
  );

  console.log(rendered);

  await fs.writeFile("rendered.tsx", rendered, "utf-8");
  await worker.close();
}

function renderInterlacedDiagnostics(
  boilerplate: string,
  componentTsCode: string,
  diagnostics: IAutoViewCompilerResult.IDiagnostic[],
): string {
  diagnostics.sort((a, b) => (b.start ?? 0) - (a.start ?? 0));

  const entireTsCode = `${boilerplate}\n\n${componentTsCode}`;
  const lines = entireTsCode.split("\n");
  const lineIndices: number[] = [0];

  for (let i = 0; i < lines.length; ++i) {
    lineIndices.push(lineIndices[i]! + (lines[i]!.length + 1));
  }

  function findLineIndex(index: number): number {
    let low = 0;
    let high = lineIndices.length - 1;

    while (low !== high) {
      const mid = Math.floor((low + high) / 2);
      const midLineStartIndex = lineIndices[mid]!;
      const midLineEndIndex = lineIndices[mid + 1]!;

      if (midLineStartIndex <= index && index < midLineEndIndex) {
        return mid;
      }

      if (index < midLineStartIndex) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return low;
  }

  for (const item of diagnostics) {
    const lineIndex = findLineIndex(item.start!);
    const indentCount = item.start! - lineIndices[lineIndex]!;
    const line = lines[lineIndex]!;

    lines[lineIndex] =
      `${" ".repeat(indentCount)}/* COMPILE ERROR(BELOW THIS LINE): TS${item.code}: ${item.messageText} */\n${line}`;
  }

  const boilerplateLineCount = boilerplate.split("\n").length;

  return lines.slice(boilerplateLineCount).join("\n").trim();
}

const inputSchema = {
  schema: {
    type: "array",
    items: {
      $ref: "#/$defs/marketplace-purchase",
    },
  } satisfies ILlmSchemaV3_1,
  $defs: {
    "IApiMarketplaceListingPlansAccounts.GetQuery": {
      type: "object",
      properties: {},
      required: [],
    },
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
                  $ref: "#/$defs/marketplace-listing-plan",
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
              $ref: "#/$defs/marketplace-listing-plan",
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
  } satisfies Record<string, ILlmSchemaV3_1>,
};
