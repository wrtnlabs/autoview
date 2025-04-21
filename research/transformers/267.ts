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
  const sessions = input.sessions ?? [];

  // If there are no chat sessions, render a friendly markdown message.
  if (sessions.length === 0) {
    return {
      type: "Markdown",
      content:
        "**No chat sessions available**\n\n" +
        "Start a new conversation to see it listed here.",
    };
  }

  // Transform each session into a ListItem.
  const items: IAutoView.IAutoViewListItemProps[] = sessions.map((session) => {
    // Pick an icon based on chatType.
    const chatTypeIconId = (() => {
      switch (session.chatType) {
        case "team":
          return "users";      // team chat → group icon
        case "channel":
          return "hashtag";    // channel → hashtag icon
        default:
          return "comment";    // direct message or unknown → comment icon
      }
    })();

    // Start element: visual icon for the chat.
    const startElement: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: chatTypeIconId,
      size: 24,
      // Highlight icon if there are unread messages.
      color: session.unread && session.unread > 0 ? "red" : "blue",
    };

    // Title: prefer chatId, fall back to other identifiers.
    const title =
      session.chatId ??
      session.channelId ??
      session.personId ??
      "Unknown Chat";

    // Description: human‐readable last‐updated timestamp.
    const description = session.updatedAt
      ? `Last updated: ${new Date(session.updatedAt).toLocaleString()}`
      : undefined;

    // End element: show a badge with the number of unread messages, if any.
    let endElement:
      | IAutoView.IAutoViewBadgeProps
      | IAutoView.IAutoViewTextProps
      | undefined;

    if (session.unread && session.unread > 0) {
      endElement = {
        type: "Badge",
        count: session.unread,
        maxCount: 99,
        showZero: false,
        color: "error",
        childrenProps: {
          type: "Icon",
          id: "bell",
          size: 16,
          color: "red",
        },
      };
    } else {
      // If zero unread, show a muted note instead of a zero badge.
      endElement = {
        type: "Text",
        content: "No unread",
        variant: "caption",
        color: "gray",
      };
    }

    // Assemble the list item.
    const listItem: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title,
      description,
      startElement,
      endElement,
    };

    return listItem;
  });

  // Wrap all list items in a responsive list.
  const listProps: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: items,
  };

  return listProps;
}
