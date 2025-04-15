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
  // Check if we have a webhook available in input.
  if (input.webhook) {
    const webhookData = input.webhook;

    // Create a header icon representing a link (webhook). Using "link" as a conventional id.
    const headerIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "link",
      color: "blue", // use blue to indicate a link; can be modified as needed
      size: 16,
    };

    // If the webhook is blocked, we want to visually indicate that.
    // We'll create a badge with an exclamation icon.
    let blockedBadge: IAutoView.IAutoViewBadgeProps | undefined = undefined;
    if (webhookData.blocked) {
      blockedBadge = {
        type: "Badge",
        // The childrenProps allows either an Avatar or an Icon. Use an Icon to represent a warning.
        childrenProps: {
          type: "Icon",
          id: "exclamation-triangle", // using a typical warning icon name (in kebab-case, without prefix)
          color: "red",
          size: 12,
        },
        // Set color and dot flag to make it stand out.
        color: "error",
        dot: true,
      };
    }

    // Create the card header.
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: webhookData.name,
      description: webhookData.url,
      startElement: headerIcon,
      // If a blocked badge was created, attach it to the end element.
      endElement: blockedBadge,
    };

    // Build markdown content summarizing additional webhook details.
    // Use markdown formatting to enhance readability.
    let markdownContent = `**Webhook Details**\n\n`;
    markdownContent += `- **API Version:** ${webhookData.apiVersion}\n`;
    markdownContent += `- **Scopes:** ${webhookData.scopes.join(", ")}\n`;

    // Optionally output token if provided (even if read-only)
    if (webhookData.token) {
      markdownContent += `- **Token:** \`${webhookData.token}\`\n`;
    }

    // Include creation date if available.
    if (webhookData.createdAt) {
      // Convert timestamp to a human-readable string for display.
      const createdDate = new Date(webhookData.createdAt).toLocaleString();
      markdownContent += `- **Created At:** ${createdDate}\n`;
    }

    // Create the card content using a Markdown component.
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: {
        // Use a Markdown component to render the content with rich text formatting.
        type: "Markdown",
        content: markdownContent,
      },
    };

    // Compose the final vertical card component.
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [cardHeader, cardContent],
    };

    return verticalCard;
  } else {
    // If no webhook data is provided, return a Markdown component with a friendly message.
    return {
      type: "Markdown",
      content: "### No Webhook Data Available\n\nThe provided input does not include any webhook information.",
    };
  }
}
