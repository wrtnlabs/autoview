import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4WebhooksView = {
                webhooks?: legacy.v4.LegacyV4Webhook[];
                next?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
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
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4WebhooksView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract webhooks from the input; default to an empty array if not provided.
  const webhooks: legacy.v4.LegacyV4Webhook[] = input.webhooks ?? [];

  // Compose the content that displays the list of webhooks.
  // If there are no webhooks, show a markdown component stating so.
  let listContent: IAutoView.IAutoViewComponentProps;
  if (webhooks.length === 0) {
    listContent = {
      type: "Markdown",
      content: "No webhooks available."
    } as IAutoView.IAutoViewMarkdownProps;
  } else {
    // Map each webhook to a list item.
    // We use an icon as the start element to make the item more visually engaging.
    const listItems = webhooks.map((wh) => {
      return {
        type: "ListItem",
        // Use the webhook name as the title.
        title: wh.name,
        // Display the URL as a description.
        description: `URL: ${wh.url}`,
        // Attach a link icon to help signify the connection.
        startElement: {
          id: "link",  // Icon name in kebab-case
          type: "Icon",
          size: 16,
          color: "blue"
        } as IAutoView.IAutoViewIconProps
      } as IAutoView.IAutoViewListItemProps;
    });

    // Wrap the list items into a List component.
    listContent = {
      type: "List",
      childrenProps: listItems
    } as IAutoView.IAutoViewListProps;
  }

  // Create a Card Header component with a descriptive title and an icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Webhook Listing",
    description: `Total webhooks: ${webhooks.length}`,
    // Use an icon (for example, a bell) as the start element to emphasize notifications.
    startElement: {
      id: "bell",
      type: "Icon",
      size: 24,
      color: "green"
    } as IAutoView.IAutoViewIconProps
  };

  // Optionally, if there is a next page indicated by input.next, render a "Load More" button.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (input.next !== undefined && input.next > 0) {
    cardFooter = {
      type: "CardFooter",
      childrenProps: {
        type: "Button",
        label: "Load More",
        variant: "contained",
        color: "primary"
      } as IAutoView.IAutoViewButtonProps
    };
  }

  // Combine all parts into a Vertical Card.
  // The card includes a header, content (which includes our list or markdown message), and
  // optionally a footer with a "Load More" button if more data is available.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      {
        type: "CardContent",
        childrenProps: listContent
      } as IAutoView.IAutoViewCardContentProps,
      // Only include the footer if it is defined.
      ...(cardFooter ? [cardFooter] : [])
    ]
  };

  return verticalCard;
}
