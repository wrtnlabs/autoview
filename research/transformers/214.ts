import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type WebhooksView = {
    next?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    webhooks?: webhook.Webhook[];
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
type IAutoViewTransformerInputType = WebhooksView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // The goal of this transformation is to visually display the webhooks data.
  // We use different AutoView components (like DataListItem with Text and Markdown)
  // to present the details using visual cues rather than raw text.
  //
  // If webhooks are available, we create a DataList where each webhook is represented
  // by a DataListItem that includes a title (as a Text component) and details (as a Markdown component).
  // If no webhooks are provided, we return a VerticalCard that informs the user no data is available.
  
  // Check if we have valid webhook data and at least one webhook entry
  if (input.webhooks && input.webhooks.length > 0) {
    // Transform each webhook into a DataList item for visual display.
    // We use AutoView Text for the name and Markdown for the detailed info.
    const items: IAutoView.IAutoViewDataListItemProps[] = input.webhooks.map((wh) => {
      // Build markdown content for the webhook details.
      // We include the URL (as a clickable link via markdown syntax), the API version,
      // the creation date (if available) and any blocked status.
      const markdownContent = 
        `**URL:** [${wh.url}](${wh.url})\n\n` +
        `**API Version:** ${wh.apiVersion}\n\n` +
        (wh.createdAt ? `**Created At:** ${new Date(wh.createdAt).toLocaleString()}\n\n` : "") +
        (wh.blocked ? `**Status:** Blocked\n\n` : "") +
        (wh.scopes && wh.scopes.length > 0 ? `**Scopes:** ${wh.scopes.join(", ")}` : "");
      
      return {
        type: "DataListItem",
        // Use a Text component to display the webhook name prominently.
        label: {
          type: "Text",
          variant: "subtitle1",
          // Though the 'content' property may be either a string or an array as per the type,
          // we are using a simple string.
          content: wh.name
        },
        // Use a Markdown component for a rich, formatted presentation of details.
        value: {
          type: "Markdown",
          content: markdownContent
        }
      };
    });
    
    // If there is pagination info (for example, 'next' exists) we can add a note at the end.
    if (input.next !== undefined && input.next > 0) {
      items.push({
        type: "DataListItem",
        label: {
          type: "Text",
          variant: "caption",
          content: "Additional webhooks available"
        },
        value: {
          type: "Markdown",
          content: `Page Token: **${input.next}**`
        }
      });
    }
    
    // Return a DataList component that visualizes all the webhook items.
    return {
      type: "DataList",
      childrenProps: items
    };
  }
  
  // In the case where no webhooks are provided,
  // we return a VerticalCard that informs the user accordingly.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Webhooks",
        description: "No webhooks available."
        // We could also add a startElement here (e.g., an icon) but it is not strictly required.
      },
      {
        type: "CardContent",
        // The markdown content is used to provide a friendly message.
        childrenProps: {
          type: "Markdown",
          content: "It appears that there are no webhooks currently configured. Please add and configure your webhooks to see them listed here."
        }
      }
    ]
  };
}
