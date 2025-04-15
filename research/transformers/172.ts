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
  // Extract relevant properties from the input
  const { group, managers, onlines, bookmark, session } = input;

  // Create a CardHeader to display the group information.
  // If the group exists, we display its title, description and an icon (if provided).
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: group?.title ?? "Untitled Group",
    description: group?.description || "",
    startElement: group?.icon
      ? {
          type: "Icon",
          id: group.icon,
          size: 24,
          // You can adjust the color as needed for visual contrast; here we pick blue
          color: "blue"
        } as IAutoView.IAutoViewIconProps
      : undefined
  };

  // Build a list of DataListItems combining managers and online users.
  // We use a DataList to group these items to enable a visually engaging display.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Process managers if available.
  if (managers && managers.length > 0) {
    managers.forEach((manager) => {
      // Each manager is shown as a DataListItem that combines an avatar (if available)
      // and markdown-formatted text for emphasis.
      const managerItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: [
          {
            type: "Avatar",
            src: manager.avatarUrl, // Expected to be a URI if available
            name: manager.name,
            size: 40,
            variant: "primary"
          } as IAutoView.IAutoViewAvatarProps,
          {
            type: "Markdown",
            content: `**${manager.name}**\n${manager.description ? manager.description : ""}`
          } as IAutoView.IAutoViewMarkdownProps
        ],
        value: manager.email
          ? {
              type: "Markdown",
              content: `Email: ${manager.email}`
            } as IAutoView.IAutoViewMarkdownProps
          : undefined
      };
      dataListItems.push(managerItem);
    });
  } else {
    // Fallback message if no managers are provided.
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: `_No managers available._`
      } as IAutoView.IAutoViewMarkdownProps
    });
  }

  // Process online users if available.
  if (onlines && onlines.length > 0) {
    onlines.forEach((online) => {
      // Represent online users with a small green icon and markdown text.
      const onlineItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: [
          {
            type: "Icon",
            id: "circle", // Assumed icon, representing an online status indicator.
            size: 16,
            color: "green"
          } as IAutoView.IAutoViewIconProps,
          {
            type: "Markdown",
            content: `**Online:** ${online.personId || "Unknown User"}`
          } as IAutoView.IAutoViewMarkdownProps
        ]
      };
      dataListItems.push(onlineItem);
    });
  } else {
    // Fallback message if there are no online users.
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: `_No online users available._`
      } as IAutoView.IAutoViewMarkdownProps
    });
  }

  // Create a DataList component to present the managers and online users.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Wrap the DataList inside a CardContent component for visual grouping.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // Assemble extra details in a CardFooter.
  // We utilize markdown components to clearly display bookmark and session information if available.
  const footerElements: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (bookmark) {
    footerElements.push({
      type: "Markdown",
      content: `**Bookmark Key:** ${bookmark.bookmarkKey || "N/A"}`
    } as IAutoView.IAutoViewMarkdownProps);
  }
  if (session) {
    footerElements.push({
      type: "Markdown",
      content: `**Session Chat ID:** ${session.chatId || "N/A"}`
    } as IAutoView.IAutoViewMarkdownProps);
  }
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerElements
  };

  // Compose all the components into a VerticalCard for a responsive and visually appealing layout.
  // The VerticalCard wraps the header, content, and footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter]
  };

  // Return the final UI component configuration.
  return verticalCard;
}
