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
  // Extract the webhook data from the input. This may be undefined.
  const webhook = input.webhook;

  // If there is no webhook data, return a simple vertical card with an informative message.
  if (!webhook) {
    return {
      type: "VerticalCard",
      childrenProps: [
        {
          type: "CardHeader",
          title: "No Webhook Data",
          description: "The webhook data is not available.",
          // Use an icon to denote informational status.
          startElement: {
            id: "info",
            type: "Icon",
            size: 24,
            color: "blue",
          },
        },
        {
          type: "CardContent",
          childrenProps: {
            type: "Markdown",
            content: "*No webhook data was provided. Please verify your configuration.*",
          },
        },
      ],
    };
  }

  // Build a markdown string to elegantly display the webhook details.
  // Markdown is used in order to provide a rich text presentation.
  let markdownContent = "";
  markdownContent += `**Webhook Name:** ${webhook.name}\n\n`;
  if (webhook.id) {
    markdownContent += `**ID:** ${webhook.id}\n\n`;
  }
  markdownContent += `**URL:** ${webhook.url}\n\n`;
  if (webhook.token) {
    markdownContent += `**Token:** ${webhook.token}\n\n`;
  }
  if (webhook.apiVersion) {
    markdownContent += `**API Version:** ${webhook.apiVersion}\n\n`;
  }
  if (webhook.keywords && webhook.keywords.length > 0) {
    markdownContent += `**Keywords:** ${webhook.keywords.join(", ")}\n\n`;
  }
  if (typeof webhook.watchUserChats === "boolean") {
    markdownContent += `**Watch User Chats:** ${webhook.watchUserChats ? "Yes" : "No"}\n\n`;
  }
  if (typeof webhook.watchGroups === "boolean") {
    markdownContent += `**Watch Groups:** ${webhook.watchGroups ? "Yes" : "No"}\n\n`;
  }
  if (typeof webhook.blocked === "boolean") {
    markdownContent += `**Blocked:** ${webhook.blocked ? "Yes" : "No"}\n\n`;
  }
  if (webhook.lastBlockedAt !== undefined) {
    // Convert timestamp to a locale readable string.
    markdownContent += `**Last Blocked At:** ${new Date(webhook.lastBlockedAt).toLocaleString()}\n\n`;
  }
  if (webhook.createdAt !== undefined) {
    markdownContent += `**Created At:** ${new Date(webhook.createdAt).toLocaleString()}\n\n`;
  }

  // Build the Card Header component.
  // We use an icon as a visual representation of the webhook (using "link" as a typical symbol).
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: webhook.name,
    description: "Webhook Overview",
    startElement: {
      id: "link",
      type: "Icon",
      size: 32,
      color: "blue",
    },
  };

  // Build the Card Content component
  // The detailed information is rendered as markdown for a rich text experience.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    },
  };

  // Compose the overall Vertical Card component.
  // The Vertical Card aggregates header and content ensuring responsiveness and a clear UI on all devices.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
