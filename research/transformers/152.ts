import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4WebhookView = {
                webhook?: legacy.v4.LegacyV4Webhook;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Webhook = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string;
            url: string;
            token?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            watchUserChats?: boolean;
            watchGroups?: boolean;
            apiVersion: string;
            lastBlockedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            blocked?: boolean;
        };
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4WebhookView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the webhook data from input
  const webhook = input.webhook;

  // If no webhook data is provided, return a simple VerticalCard indicating this.
  if (!webhook) {
    return {
      type: "VerticalCard",
      childrenProps: {
        type: "CardContent",
        // Use a Markdown component to display a message when there's no data
        childrenProps: {
          type: "Markdown",
          content: "## No Webhook Data Available\n\nThere is no webhook data to display at the moment."
        }
      }
    };
  }
  
  // Prepare markdown content for the webhook details.
  // Only include the fields that are present.
  const details: string[] = [];
  
  if (webhook.id) {
    details.push(`- **ID:** \`${webhook.id}\``);
  }
  if (webhook.channelId) {
    details.push(`- **Channel ID:** \`${webhook.channelId}\``);
  }
  if (webhook.url) {
    details.push(`- **URL:** [${webhook.url}](${webhook.url})`);
  }
  if (webhook.token) {
    // Token is sensitive; display only a masked version if needed.
    details.push(`- **Token:** \`${webhook.token.substr(0, 4)}****\``);
  }
  if (webhook.keywords && webhook.keywords.length > 0) {
    details.push(`- **Keywords:** ${webhook.keywords.map(k => `\`${k}\``).join(", ")}`);
  }
  if (typeof webhook.watchUserChats === "boolean") {
    details.push(`- **Watch User Chats:** ${webhook.watchUserChats ? "Yes" : "No"}`);
  }
  if (typeof webhook.watchGroups === "boolean") {
    details.push(`- **Watch Groups:** ${webhook.watchGroups ? "Yes" : "No"}`);
  }
  if (webhook.apiVersion) {
    details.push(`- **API Version:** \`${webhook.apiVersion}\``);
  }
  if (webhook.lastBlockedAt) {
    // Convert timestamp to a readable date format if possible.
    const dateStr = new Date(webhook.lastBlockedAt).toLocaleString();
    details.push(`- **Last Blocked At:** \`${dateStr}\``);
  }
  if (typeof webhook.blocked === "boolean") {
    details.push(`- **Blocked:** ${webhook.blocked ? "Yes" : "No"}`);
  }
  
  // Combine the details into a single markdown string.
  const markdownContent = [
    `## Webhook Details`,
    "",
    ...details
  ].join("\n");

  // Compose the UI components
  // A VerticalCard is used to support responsive layout.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // CardHeader component for displaying the webhook's main information.
        type: "CardHeader",
        title: webhook.name,
        description: webhook.apiVersion ? `API Version: ${webhook.apiVersion}` : undefined,
        // startElement is set to an Icon to visually represent a webhook/link.
        startElement: {
          type: "Icon",
          id: "link", // Assuming "link" is a valid icon id in the icon set.
          color: "blue",
          size: 24
        }
      },
      {
        // CardContent component for displaying detailed webhook info using Markdown.
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: markdownContent
        }
      }
    ]
  };
}
