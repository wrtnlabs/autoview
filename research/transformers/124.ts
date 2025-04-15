import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4OneTimeMsgUserView = {
                oneTimeMsgUser?: legacy.v4.marketing.LegacyV4OneTimeMsgUser;
            };
        }
    }
    export namespace v4 {
        export namespace marketing {
            export type LegacyV4OneTimeMsgUser = {
                oneTimeMsgId?: string;
                userId?: string;
                sent?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
                view?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
                goal?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
                click?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
                version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
                id?: string;
            };
        }
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4OneTimeMsgUserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the oneTimeMsgUser from the input.
  const userData = input.oneTimeMsgUser;

  // If no data is available, render a simple markdown component
  if (!userData) {
    return {
      type: "Markdown",
      content: "### No Data Available\n\nThere is no user metrics data to display at the moment."
    };
  }

  // Compose a card header with basic user information.
  // We use an icon as a visual start element to make the header more engaging.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Prefer to show the oneTimeMsgId as a title if available, otherwise fallback to a generic title.
    title: userData.oneTimeMsgId ? `Message ${userData.oneTimeMsgId}` : "User Metrics",
    // Show userId as description if available.
    description: userData.userId ? `User ID: ${userData.userId}` : undefined,
    // Use an icon to represent the overall message metrics.
    startElement: {
      type: "Icon",
      id: "mail", // use "mail" icon in kebab-case without prefix
      color: "blue",
      size: 24
    }
  };

  // Create individual data items for each of the metrics.
  // We use icons within each data list item for intuitive representation,
  // and we render the numeric value using a markdown component to style the text.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "send", // icon for sent messages
        color: "green",
        size: 16
      },
      value: {
        type: "Markdown",
        content: `**Sent:** ${userData.sent ?? 0}`
      }
    },
    {
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "eye", // icon for viewed messages
        color: "cyan",
        size: 16
      },
      value: {
        type: "Markdown",
        content: `**Viewed:** ${userData.view ?? 0}`
      }
    },
    {
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "cursor-click", // icon for click events; note: using "cursor-click" to represent a click
        color: "orange",
        size: 16
      },
      value: {
        type: "Markdown",
        content: `**Clicks:** ${userData.click ?? 0}`
      }
    },
    {
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "target", // icon for goal achievement
        color: "red",
        size: 16
      },
      value: {
        type: "Markdown",
        content: `**Goal:** ${userData.goal ?? 0}`
      }
    }
  ];

  // Compose a DataList to hold these data list items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Wrap the data list inside a CardContent component, so it is well contained.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Here we use the previously defined dataList as the child component.
    childrenProps: dataList
  };

  // Finally, compose a VerticalCard to hold the header and content.
  // A VerticalCard is responsive and appropriate for rendering organized information.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the composed UI component.
  return verticalCard;
}
