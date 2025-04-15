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
  // Check if webhook data exists in the input.
  if (input.webhook) {
    const webhook = input.webhook;
    
    // ---------------------------------------------------------------------
    // Create the Card Header component.
    // We use CardHeader to display the primary information.
    // The startElement shows a visual icon (using the "link" icon) to make the header engaging.
    // ---------------------------------------------------------------------
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: webhook.name,
      description: webhook.id ? `Identifier: ${webhook.id}` : "No ID provided",
      startElement: {
        type: "Icon",
        id: "link",
        color: "blue",
        size: 24,
      }
    };

    // ---------------------------------------------------------------------
    // Create the Card Content component.
    // We generate a markdown string that nicely formats the details
    // about the webhook (URL, API version, keywords, blocked status).
    // Markdown is used for rich-text formatting and for responsiveness.
    // ---------------------------------------------------------------------
    let markdownContent = `**URL:** [${webhook.url}](${webhook.url})\n\n`;
    markdownContent += `**API Version:** ${webhook.apiVersion}\n\n`;
    if (webhook.keywords && webhook.keywords.length > 0) {
      markdownContent += "**Keywords:**\n";
      webhook.keywords.forEach(keyword => {
        markdownContent += `- ${keyword}\n`;
      });
      markdownContent += "\n";
    }
    if (webhook.blocked) {
      // Using an emoji to immediately convey the blocked state.
      markdownContent += "🚫 **This webhook is currently blocked.**\n";
    }
    
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // childrenProps accepts either an array or a single component.
      // Here we use the Markdown component to render rich text.
      childrenProps: {
        type: "Markdown",
        content: markdownContent,
      } as IAutoView.IAutoViewMarkdownProps
    };

    // ---------------------------------------------------------------------
    // Create the Card Footer component.
    // This component displays additional metadata such as creation date
    // and information on watching chats and groups.
    // We use markdown here as well to afford flexibility and styling.
    // ---------------------------------------------------------------------
    let footerContent = "";
    if (webhook.createdAt) {
      const createdDate = new Date(webhook.createdAt);
      footerContent += `**Created On:** ${createdDate.toLocaleDateString()}\n\n`;
    }
    if (webhook.watchUserChats) {
      footerContent += "💬 Watching User Chats\n\n";
    }
    if (webhook.watchGroups) {
      footerContent += "👥 Watching Groups\n\n";
    }
    if (!footerContent) {
      footerContent = "No additional metadata.";
    }
    
    const cardFooter: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: {
        type: "Markdown",
        content: footerContent,
      } as IAutoView.IAutoViewMarkdownProps
    };

    // ---------------------------------------------------------------------
    // Compose the main visual component using a Vertical Card.
    // The VerticalCard is responsive and suitable for all screen sizes.
    // We pass the header, content, and footer as children.
    // ---------------------------------------------------------------------
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [cardHeader, cardContent, cardFooter],
    };

    return verticalCard;
  } else {
    // ---------------------------------------------------------------------
    // If no webhook data is provided, we return a Markdown component
    // that informs the user that no data is available.
    // ---------------------------------------------------------------------
    const noDataMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "## No Webhook Data Available\nPlease provide valid webhook data to visualize.",
    };
    return noDataMarkdown;
  }
}
