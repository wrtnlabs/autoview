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
  // If the core group information is missing, display a simple markdown message in a vertical card.
  if (!input.group) {
    // Using a CardContent with Markdown to express the absence of data.
    return {
      type: "VerticalCard",
      childrenProps: {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: "## No Group Data Available\nThe input did not contain any group information."
        }
      }
    } as IAutoView.IAutoViewVerticalCardProps;
  }

  // Create a CardHeader that visually represents the group.
  // If the group has an icon string (which is expected to be a valid icon identifier),
  // use an Icon component as the startElement to enrich the UI.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.group.name,
    description: input.group.description || "",
    startElement: input.group.icon
      ? {
          type: "Icon",
          id: input.group.icon,
          size: 24,
          color: "blue"
        }
      : undefined
  };

  // Prepare an array of DataList items to display various aspects of the input.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Group Information: provide basic group details like ID and Scope.
  dataListItems.push({
    type: "DataListItem",
    label: {
      type: "Markdown",
      content: "**Group Information**"
    },
    value: {
      type: "Markdown",
      content: `**ID:** ${input.group.id || "N/A"}\n\n**Scope:** ${input.group.scope}`
    }
  });

  // 2. Managers: if there are any managers provided, represent each with a Chip.
  if (input.managers && input.managers.length > 0) {
    // Map each manager to a Chip component.
    const managerChips: IAutoView.IAutoViewChipProps[] = input.managers.map((manager) => ({
      type: "Chip",
      label: manager.name,
      // Differentiate visual appearance based on role.
      color: manager.role === "owner" ? "primary" : "secondary"
    }));
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**Managers**"
      },
      // The value property accepts an array of presentation components.
      value: managerChips
    });
  }

  // 3. Online Users: if there are any online entries, display the count with a descriptive text.
  if (input.onlines && input.onlines.length > 0) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**Online Count**"
      },
      value: {
        type: "Text",
        content: `There are ${input.onlines.length} user${input.onlines.length > 1 ? "s" : ""} online.`,
        variant: "body1",
        color: "green"
      }
    });
  }

  // 4. Chat Session: display basic chat session details (if present) as markdown.
  if (input.session) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**Chat Session**"
      },
      value: {
        type: "Markdown",
        content: `**Chat ID:** ${input.session.chatId || "N/A"}\n\n**Alert:** ${input.session.alert ?? "N/A"}`
      }
    });
  }

  // 5. Chat Bookmark: if a chat bookmark exists, include its key as part of the details.
  if (input.bookmark) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**Chat Bookmark**"
      },
      value: {
        type: "Markdown",
        content: `**Bookmark Key:** ${input.bookmark.bookmarkKey || "N/A"}`
      }
    });
  }

  // Compose the DataList component that aggregates all the items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Wrap the DataList into a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Finally, compose a VerticalCard that holds the CardHeader and CardContent.
  // This structure is chosen to produce a responsive and visually engaging layout
  // that will render well both on web and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the fully composed UI component.
  return verticalCard;
}
