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
  // If there is no webhook data provided, display a minimal markdown message.
  if (!input.webhook) {
    // Using a Markdown component to inform the user that no data is available.
    return {
      type: "Markdown",
      content: "### No Webhook Data Available\nPlease configure a webhook to view its details."
    };
  }

  // Destructure the webhook for easier access.
  const { webhook } = input;

  // Create a header component using the CardHeader interface.
  // This header uses an icon as a visual cue to represent the webhook.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: webhook.name,
    description: `API Version: ${webhook.apiVersion}`,
    // startElement accepts an icon, which helps visually represent the webhook.
    startElement: {
      type: "Icon",
      id: "link", // Using 'link' as an icon to symbolize connectivity.
      color: "blue",
      size: 24
    }
  };

  // Assemble markdown content to display webhook details.
  // We use markdown formatting to break down key information to improve readability.
  let markdownContent = "### Webhook Details\n\n";
  if (webhook.id) {
    markdownContent += `**ID:** ${webhook.id}\n\n`;
  }
  markdownContent += `**URL:** ${webhook.url}\n\n`;
  if (webhook.token) {
    markdownContent += `**Token:** ${webhook.token}\n\n`;
  }
  if (webhook.channelId) {
    markdownContent += `**Channel ID:** ${webhook.channelId}\n\n`;
  }
  if (webhook.scopes && webhook.scopes.length > 0) {
    markdownContent += `**Scopes:** ${webhook.scopes.join(", ")}\n\n`;
  }
  if (typeof webhook.blocked === "boolean") {
    markdownContent += `**Blocked:** ${webhook.blocked}\n\n`;
  }
  if (webhook.createdAt) {
    // Converting the timestamp to a human-readable format; this ensures better UX especially on mobile devices.
    markdownContent += `**Created At:** ${new Date(webhook.createdAt).toLocaleString()}\n\n`;
  }
  if (webhook.lastBlockedAt) {
    markdownContent += `**Last Blocked At:** ${new Date(webhook.lastBlockedAt).toLocaleString()}\n\n`;
  }
  if (webhook.keywords && webhook.keywords.length > 0) {
    markdownContent += `**Keywords:** ${webhook.keywords.join(", ")}\n\n`;
  }

  // Create a content component using the CardContent interface,
  // embedding a Markdown component to visually format detailed information.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      // Markdown component is ideal for rendering rich text in a responsive way.
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose the final vertical card that encapsulates the header and content.
  // The VerticalCard component is chosen for its flexibility on various screen sizes.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  // Return the assembled UI component which adheres to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
