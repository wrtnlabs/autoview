import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type WebhooksView = {
        next?: number;
        webhooks?: Schema.webhook.Webhook[];
    };
    export namespace webhook {
        export type Webhook = {
            id?: string;
            channelId?: string;
            name: string;
            url: string;
            token?: string;
            createdAt?: number;
            scopes: ("userChat.opened" | "message.created.userChat" | "message.created.teamChat" | "lead.upserted.contact" | "lead.upserted.subscription" | "lead.deleted" | "member.upserted.contact" | "member.upserted.subscription" | "member.deleted")[] & tags.UniqueItems;
            /**
             * @deprecated
            */
            keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
            apiVersion: string;
            lastBlockedAt?: number;
            blocked?: boolean;
        };
    }
}
type IAutoViewTransformerInputType = Schema.WebhooksView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no webhooks, show a friendly markdown message
  if (!input.webhooks || input.webhooks.length === 0) {
    return {
      type: "Markdown",
      content: "### No webhooks configured."
    };
  }

  // Build DataListItems for each webhook entry
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.webhooks.map(webhook => {
    // Label: an icon + webhook name
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "link",
        color: "cyan",
        size: 20
      },
      {
        type: "Text",
        variant: "body1",
        content: [webhook.name]
      }
    ];

    // Value: show the URL as a markdown link, followed by scope chips
    const scopeChips: IAutoView.IAutoViewPresentationComponentProps[] = webhook.scopes.map(scope => ({
      type: "Chip",
      label: scope,
      size: "small",
      variant: "outlined",
      color: "blue"
    }));

    return {
      type: "DataListItem",
      label: labelComponents,
      value: [
        {
          type: "Markdown",
          // render the webhook URL as a clickable link
          content: `[${webhook.url}](${webhook.url})`
        },
        // append all scope chips inline
        ...scopeChips
      ]
    };
  });

  // Wrap the items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Card header with title, total count, and an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Webhooks",
    startElement: {
      type: "Icon",
      id: "rss",
      color: "blue",
      size: 24
    },
    endElement: {
      type: "Text",
      variant: "subtitle2",
      content: [`${input.webhooks.length} items`]
    }
  };

  // Card content holds the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Optionally add a footer with a "Load more" button if there's a next page
  const footer: IAutoView.IAutoViewCardFooterProps | undefined =
    input.next != null
      ? {
          type: "CardFooter",
          childrenProps: {
            type: "Button",
            label: `Load more (page ${input.next})`,
            variant: "text",
            color: "primary"
          }
        }
      : undefined;

  // Return a vertical card composed of header, content, and optional footer
  return {
    type: "VerticalCard",
    childrenProps: footer ? [header, content, footer] : [header, content]
  };
}
