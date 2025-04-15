import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type ChatSessionsView = {
    sessions?: ChatSession[];
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
type IAutoViewTransformerInputType = ChatSessionsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract sessions array; if not available, fallback to an empty array.
  const sessions: ChatSession[] = input.sessions ?? [];

  // If there are no sessions, return a DataList with a single DataListItem indicating no data.
  if (sessions.length === 0) {
    const noSessionsIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "inbox", // using "inbox" to indicate emptiness
      color: "gray",
      size: 16,
    };

    const noSessionsMessage: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "### No sessions available\nPlease check back later.",
    };

    const emptyItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: [noSessionsIcon, noSessionsMessage],
      value: {
        type: "Markdown",
        content: "",
      },
    };

    return {
      type: "DataList",
      childrenProps: [emptyItem],
    };
  }

  // Map each session to a DataListItem component
  const listItems: IAutoView.IAutoViewDataListItemProps[] = sessions.map((session) => {
    // Create an icon for the session.
    // Use different icons based on session.chatType if available, else fall back to a default icon.
    const sessionIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: session.chatType && session.chatType.toLowerCase() === "group" ? "users" : "comment",
      color: "blue",
      size: 16,
    };

    // Create a markdown component for the main session information.
    // We use markdown to make text more visually appealing (e.g., using headers and emphasis).
    const sessionInfoMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: session.chatId 
        ? `**Chat ID:** ${session.chatId}\n\n${session.personId ? `**Participant:** ${session.personId}` : ""}`
        : "Session record missing Chat ID",
    };

    // Create a details component showing the updated time.
    // Convert the UNIX timestamp (if available) into a human readable string.
    const sessionDetailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: session.updatedAt 
        ? `*Last updated: ${new Date(session.updatedAt).toLocaleString()}*`
        : "*No update information available*",
    };

    // If the session has an unread count > 0, create a badge component for visual emphasis.
    let unreadBadge: IAutoView.IAutoViewBadgeProps | undefined;
    if (session.unread && session.unread > 0) {
      // Notice: The childrenProps of Badge must be an Avatar or Icon, so we use the sessionIcon here.
      unreadBadge = {
        type: "Badge",
        childrenProps: sessionIcon,
        count: session.unread,
        maxCount: 99,
        color: "error",
      };
    }

    // Compose the label components array.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
    // If unreadBadge exists, use it as the first visual element; otherwise, include the sessionIcon directly.
    if (unreadBadge) {
      labelComponents.push(unreadBadge);
    } else {
      labelComponents.push(sessionIcon);
    }
    // Add the session info markdown to further describe the session.
    labelComponents.push(sessionInfoMarkdown);

    // Return a DataListItem component with the composed label and a details section.
    return {
      type: "DataListItem",
      label: labelComponents,
      value: sessionDetailsMarkdown,
    };
  });

  // Compose and return a DataList component which aggregates all the DataListItems.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  return dataList;
}
