import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4CampaignUserView = {
                campaignUser?: legacy.v4.marketing.LegacyV4CampaignUser;
            };
        }
    }
    export namespace v4 {
        export namespace marketing {
            export type LegacyV4CampaignUser = {
                campaignId?: string;
                userId?: string;
                msgId?: string;
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
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4CampaignUserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no campaignUser data provided, display a markdown component indicating the absence.
  if (!input.campaignUser) {
    return {
      type: "Markdown",
      content: "### No Campaign User Data Available\n\nThe provided data does not contain any campaign user details."
    };
  }

  // Destructure the provided campaign user properties.
  const { campaignId, userId, msgId, sent, view, goal, click, version, id } = input.campaignUser;

  // Helper function to create a DataList item.
  // We use markdown components for both the label and the value to provide rich formatting.
  function createItem(label: string, value: string | number | undefined): IAutoView.IAutoViewDataListItemProps {
    return {
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: `**${label}:**`
      },
      value: {
        type: "Markdown",
        content: (value !== undefined && value !== null) ? `${value}` : "_Not provided_"
      }
    };
  }

  // Build the list of data items. Even if some fields are missing, we still include them for completeness.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    createItem("Campaign ID", campaignId),
    createItem("User ID", userId),
    createItem("Message ID", msgId),
    createItem("Sent", sent),
    createItem("View", view),
    createItem("Goal", goal),
    createItem("Click", click),
    createItem("Version", version),
    createItem("Internal ID", id)
  ];

  // Compose a card header to display a title and brief description.
  // We add an icon as a visual element in the header using IAutoViewIconProps.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Campaign User Overview",
    description: `Details for campaign user ${userId || ""}`,
    startElement: {
      type: "Icon",
      id: "user", // Using an icon representing the user.
      size: 24,
      color: "blue"
    }
  };

  // Create a DataList component to visually list the campaign user's data.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Wrap the list inside a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // For a structured, responsive layout, we compose a VerticalCard which includes the header and content.
  // VerticalCard is chosen to ensure that the display is clean on both large screens and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed UI component data.
  return verticalCard;
}
