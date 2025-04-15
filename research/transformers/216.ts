import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type WebhookView = {
    webhook?: webhook.Webhook;
};
namespace webhook {
    export type Webhook = {
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
        createdAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        scopes: ("userChat.opened" | "message.created.userChat" | "message.created.teamChat" | "lead.upserted.contact" | "lead.upserted.subscription" | "lead.deleted" | "member.upserted.contact" | "member.upserted.subscription" | "member.deleted")[] & tags.UniqueItems;
        /**
         * @deprecated
        */
        keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
        apiVersion: string;
        lastBlockedAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        blocked?: boolean;
    };
}
type IAutoViewTransformerInputType = WebhookView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if the webhook data exists.
  if (input.webhook) {
    const webhookData = input.webhook;

    // Create a Card Header component.
    // We use an icon as the start element to add a visual cue.
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: webhookData.name,
      // Using a generic "link" icon to represent the webhook visually.
      startElement: {
        type: "Icon",
        id: "link",
        // Optionally, choose a color that fits the design. Here we use "blue" for a link.
        color: "blue",
        size: 20,
      }
    };

    // Compose markdown content to display key webhook details.
    // We use markdown formatting to reduce plain text exposure.
    // Note: Only include fields that are available.
    let markdownContent = `**Webhook Details**\n\n`;
    if (webhookData.url) {
      markdownContent += `- **URL:** [${webhookData.url}](${webhookData.url})\n`;
    }
    if (webhookData.channelId) {
      markdownContent += `- **Channel ID:** ${webhookData.channelId}\n`;
    }
    if (webhookData.apiVersion) {
      markdownContent += `- **API Version:** ${webhookData.apiVersion}\n`;
    }
    if (webhookData.scopes && webhookData.scopes.length > 0) {
      markdownContent += `- **Scopes:** ${webhookData.scopes.join(", ")}\n`;
    }
    if (typeof webhookData.blocked === "boolean") {
      markdownContent += `- **Blocked:** ${webhookData.blocked ? "Yes" : "No"}\n`;
    }
    // Optionally, show a truncated token if available.
    if (webhookData.token) {
      const truncatedToken = webhookData.token.length > 4
        ? "…" + webhookData.token.slice(-4)
        : webhookData.token;
      markdownContent += `- **Token (last 4 digits):** ${truncatedToken}\n`;
    }
    // Optionally, display creation date if provided.
    if (webhookData.createdAt) {
      const createdDate = new Date(webhookData.createdAt);
      markdownContent += `- **Created At:** ${createdDate.toLocaleString()}\n`;
    }
    // Optionally, display last blocked date if provided.
    if (webhookData.lastBlockedAt) {
      const blockedDate = new Date(webhookData.lastBlockedAt);
      markdownContent += `- **Last Blocked At:** ${blockedDate.toLocaleString()}\n`;
    }

    // Create a Markdown component for rendering the details.
    const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent,
    };

    // Create a Card Content component which will include our markdown details.
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // The childrenProps here accepts a single presentation component.
      childrenProps: markdownComponent,
    };

    // Compose the final Vertical Card component.
    // A vertical card container helps ensure responsiveness across devices.
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      // Include the header and content as children.
      childrenProps: [cardHeader, cardContent],
    };

    // Return the composed visual component.
    return verticalCard;
  } else {
    // If there is no webhook data, fall back to a Markdown component displaying a friendly message.
    const fallbackMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "**No webhook data available.**",
    };

    // Return the fallback UI component.
    return fallbackMarkdown;
  }
}
