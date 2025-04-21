import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type ChatSessionsView = {
        sessions?: Schema.ChatSession[];
    };
    export type ChatSession = {
        key?: string;
        chatId?: string;
        teamChatSectionId?: string;
        chatKey?: string;
        updatedKey?: string;
        unreadKey?: string;
        channelId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        watch?: "all" | "info" | "none";
        allMentionImportant?: boolean;
        readAt?: number;
        receivedAt?: number;
        postedAt?: number;
        updatedAt?: number;
        createdAt?: number;
        version?: number & tags.Type<"int32">;
        id?: string;
        chatType?: string;
        personType?: string;
        personId?: string;
    };
}
type IAutoViewTransformerInputType = Schema.ChatSessionsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format optional timestamp into a human-readable string.
  const formatTimestamp = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "N/A";

  const sessions = input.sessions || [];

  // If there are no sessions, render a friendly markdown message.
  if (sessions.length === 0) {
    return {
      type: "Markdown",
      content: "**No chat sessions available.**"
    };
  }

  // Map each session into a ListItem component.
  const items: IAutoView.IAutoViewListItemProps[] = sessions.map(session => {
    const unreadCount = session.unread ?? 0;
    const watchStatus = session.watch || "none";

    // Icon color: highlight if there are unread messages.
    const iconColor = unreadCount > 0 ? "blue" : "gray";

    // Badge to indicate number of unread messages.
    const unreadBadge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: unreadCount,
      showZero: false,
      color: unreadCount > 0 ? "error" : "gray",
      maxCount: 99,
      childrenProps: {
        type: "Icon",
        id: "envelope",
        size: 20,
        color: unreadCount > 0 ? "red" : "gray"
      }
    };

    // Chip to indicate watch status of the session.
    const watchChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: watchStatus,
      variant: "outlined",
      size: "small",
      color:
        watchStatus === "all"
          ? "success"
          : watchStatus === "info"
          ? "info"
          : "gray"
    };

    return {
      type: "ListItem",
      // Use chatId or fallback if missing.
      title: session.chatId || "[Unknown Chat]",
      // Display last updated timestamp in description.
      description: `Last updated: ${formatTimestamp(session.updatedAt)}`,
      // Use a comment icon as the leading element.
      startElement: {
        type: "Icon",
        id: "comment",
        size: 24,
        color: iconColor
      },
      // Show both unread badge and watch status chip on the right.
      endElement: [unreadBadge, watchChip]
    };
  });

  // Compose the final List component with all chat sessions.
  const listProps: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: items
  };

  return listProps;
}
