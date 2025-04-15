import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type GroupView = {
        managers?: Manager[];
        onlines?: Online[];
        bookmark?: ChatBookmark;
        session?: ChatSession;
        group?: Group;
    };
}
type Manager = {
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
    email?: string & tags.JsonSchemaPlugin<{
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
    roleId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    removed?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    removedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    displayAsChannel?: boolean;
    defaultGroupWatch?: "all" | "info" | "none";
    defaultDirectChatWatch?: "all" | "info" | "none";
    defaultUserChatWatch?: "all" | "info" | "none";
    chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
    meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
    showPrivateMessagePreview?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
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
    receiveUnassignedAlert?: boolean;
    receiveUnassignedChatAlert?: boolean;
    receiveUnassignedMeetAlert?: boolean;
    operator?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorStatusId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    defaultAllMentionImportant?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    userMessageImportant?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
    autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100> & tags.JsonSchemaPlugin<{
        format: "int32",
        readOnly: true
    }>;
    enableAutoAssignOnSync?: boolean;
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
    doNotDisturb?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    doNotDisturbClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    accountDoNotDisturb?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    accountDoNotDisturbClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    enableReactedMessageIndex?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    enableTeamMentionedMessageIndex?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorUpdatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    pcInboxMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileInboxMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    pcTeamChatMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileTeamChatMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    managerId?: string;
    avatarUrl?: string;
    /**
     * @deprecated
    */
    meetOperator?: boolean;
    emailForFront?: string;
    mobileNumberForFront?: string & tags.Default<"+18004424000">;
};
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
type Online = {
    channelId?: string;
    personType?: string;
    personId?: string;
    id?: string;
};
type ChatBookmark = {
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
type ChatSession = {
    key?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    chatId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    teamChatSectionId?: string;
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
    allMentionImportant?: boolean;
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
type Group = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    channelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    title: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
    scope: "all" | "public" | "private";
    managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    icon?: string & tags.Pattern<"\\S+">;
    liveMeetId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    description?: string;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    /**
     * @deprecated
    */
    name?: string;
    active?: boolean;
};
type IAutoViewTransformerInputType = desk.GroupView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We'll build a vertical card as the main container.
  // If the group field is present, we display its title, description and optional icon.
  // Additionally, we compose sub-components to visualize managers, online status, session and bookmark details.
  // If group data is not present, we fallback to a simple markdown message.

  // CardHeader: displays group title and description, with an optional start icon if available.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.group ? input.group.title : "Group Information",
    description: input.group && input.group.description ? input.group.description : undefined,
    // If an icon is provided in the group data, use it as the startElement.
    startElement: input.group && input.group.icon
      ? {
          type: "Icon",
          id: input.group.icon, // expects a string in kebab-case
          // Using a medium size for the icon. Adjust size if needed.
          size: 20,
        }
      : undefined,
    endElement: undefined,
  };

  // Prepare an array for card content children components.
  const cardContentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // If managers exist, create a DataList to show each manager's details.
  if (input.managers && Array.isArray(input.managers) && input.managers.length > 0) {
    const managerItems: IAutoView.IAutoViewDataListItemProps[] = input.managers.map((manager) => {
      // For each manager, we use a Markdown component to emphasize the manager name and show extra info.
      const labelComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `**${manager.name}**`,
      };
      // Compose a detail string from available information.
      let details = "";
      if (manager.description) {
        details += manager.description;
      }
      if (manager.email) {
        details += details ? `  \n_Email: ${manager.email}_` : `_Email: ${manager.email}_`;
      }
      if (manager.mobileNumber) {
        details += details ? `  \n_Mobile: ${manager.mobileNumber}_` : `_Mobile: ${manager.mobileNumber}_`;
      }
      const valueComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: details,
      };

      return {
        type: "DataListItem",
        label: labelComponent,
        value: valueComponent,
      };
    });

    const managersDataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: managerItems,
    };

    cardContentChildren.push(managersDataList);
  }

  // If online information exists, display a markdown summary.
  if (input.onlines && Array.isArray(input.onlines) && input.onlines.length > 0) {
    const onlineMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      // Using markdown formatting to emphasize the number of online users.
      content: `**Online Users:** ${input.onlines.length}`,
    };
    cardContentChildren.push(onlineMarkdown);
  }

  // If a chat bookmark is provided, display its key information.
  if (input.bookmark) {
    const bookmarkMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Chat Bookmark:** ${input.bookmark.bookmarkKey ? input.bookmark.bookmarkKey : "N/A"}`,
    };
    cardContentChildren.push(bookmarkMarkdown);
  }

  // If a chat session exists, display its unread count and alert status.
  if (input.session) {
    const sessionMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Chat Session:** Unread: ${input.session.unread || 0}, Alert: ${input.session.alert || 0}`,
    };
    cardContentChildren.push(sessionMarkdown);
  }

  // If no detailed information was found, provide a fallback message.
  if (cardContentChildren.length === 0) {
    cardContentChildren.push({
      type: "Markdown",
      content: "No detailed group information is available.",
    });
  }

  // Compose the card content using a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: cardContentChildren,
  };

  // Finally, compose the overall vertical card container.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed UI component.
  return verticalCard;
}
