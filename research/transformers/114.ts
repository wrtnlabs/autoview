import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4GroupView = {
                managers?: legacy.v4.LegacyV4Manager[];
                onlines?: legacy.v4.LegacyV4Online[];
                bookmark?: legacy.v4.LegacyV4ChatBookmark;
                session?: legacy.v4.LegacyV4ChatSession;
                group?: legacy.v4.LegacyV4Group;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Manager = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            accountId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            description?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showDescriptionToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            nameDescI18nMap?: {
                [key: string]: NameDesc;
            };
            profile?: {
                [key: string]: {};
            };
            email: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showEmailToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            mobileNumber?: string & tags.Default<"+18004424000"> & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showMobileNumberToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            role: "owner" | "member";
            removed?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            displayAsChannel?: boolean;
            defaultGroupWatch?: "all" | "info" | "none";
            defaultDirectChatWatch?: "all" | "info" | "none";
            defaultUserChatWatch?: "all" | "info" | "none";
            operatorScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            touchScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            avatar?: TinyFile;
            operatorEmailReminder?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            operator?: boolean;
            statusEmoji?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusText?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusClearAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            managerId?: string;
            avatarUrl?: string;
            emailForFront?: string;
            mobileNumberForFront?: string & tags.Default<"+18004424000">;
        };
        export type LegacyV4Online = {
            channelId?: string;
            personType?: string;
            personId?: string;
            id?: string;
        };
        export type LegacyV4ChatBookmark = {
            key?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            chatId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            chatKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            bookmarkKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            chatType?: string;
            personType?: string;
            personId?: string;
        };
        export type LegacyV4ChatSession = {
            key?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            chatId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            chatKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            updatedKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            unreadKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            alert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            unread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            watch?: "all" | "info" | "none";
            readAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            receivedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            postedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            updatedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            id?: string;
            chatType?: string;
            personType?: string;
            personId?: string;
        };
        export type LegacyV4Group = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
            scope: "all" | "public" | "private";
            managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            icon?: string & tags.Pattern<"\\S+">;
            description?: string;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            updatedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            active?: boolean;
        };
    }
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4GroupView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract group information from the input.
  // If there is no group information provided, return a simple markdown component.
  const group = input.group;
  if (!group) {
    // When group data is missing, we display a friendly markdown message.
    return {
      type: "Markdown",
      content: "### No Group Data Available\nThe provided data does not contain any group information to display."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Compose the card header to display the group's primary details.
  // If an icon exists in the group data, attach it as the start element.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: group.name,
    description: group.description,
    startElement: group.icon
      ? {
          type: "Icon",
          id: group.icon, // using group.icon as icon identifier (must be in kebab-case)
          size: 32,
          // Optionally, the color could be set based on business rules.
        }
      : undefined
  };

  // Build a DataList to visually display the managers.
  // For each manager, we create a list item that combines an avatar with markdown details.
  let managerListItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (input.managers && input.managers.length > 0) {
    managerListItems = input.managers.map((manager) => {
      // Create an avatar component for the manager.
      // If avatarUrl is not provided, the avatar component will display initials (determined by the front-end).
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        src: manager.avatarUrl,
        name: manager.name,
        size: 40, // size chosen for good visibility on mobile and desktop
        variant: "primary"
      };

      // Create a markdown component to display additional manager details.
      // Using markdown allows for enhanced formatting compared to plain text.
      const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `**Email:** ${manager.email}\n**Role:** ${manager.role}`
      };

      // Combine the avatar and details in a data list item.
      // The avatar is used for the label and the markdown for the value.
      const listItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: avatar,
        value: detailsMarkdown
      };

      return listItem;
    });
  } else {
    // If there are no managers available, inform the user via a markdown component.
    const emptyItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**No managers available.**"
      } as IAutoView.IAutoViewMarkdownProps
    };
    managerListItems.push(emptyItem);
  }

  // Create a data list component to hold the list items representing the managers.
  const managersDataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: managerListItems
  };

  // Build the card content component.
  // Here we insert the managers data list. In a full production scenario,
  // additional components (e.g., online status, session info, bookmarks) could be appended.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: managersDataList
  };

  // Assemble the final visual component.
  // Using a vertical card component combines the header and the content for a cohesive display.
  // This layout is designed to be responsive and works well on both desktop and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
