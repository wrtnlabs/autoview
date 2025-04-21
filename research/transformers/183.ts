import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4SessionsView = {
                    sessions?: Schema.legacy.v4.LegacyV4ChatSession[];
                };
            }
        }
        export namespace v4 {
            export type LegacyV4ChatSession = {
                key?: string;
                chatId?: string;
                chatKey?: string;
                updatedKey?: string;
                unreadKey?: string;
                channelId?: string;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                watch?: "all" | "info" | "none";
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
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4SessionsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no sessions, show a friendly message
  const sessions = input.sessions ?? [];
  if (sessions.length === 0) {
    return {
      type: "Markdown",
      content: "### No chat sessions found\n\nYou don’t have any active sessions at the moment."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Helper: pick icon name based on chat type
  const getChatIcon = (chatType?: string): string => {
    switch (chatType) {
      case "group":
        return "users";
      case "broadcast":
        return "bullhorn";
      default:
        return "user";
    }
  };

  // Helper: pick watch icon name based on watch preference
  const getWatchIcon = (watch?: "all" | "info" | "none"): string => {
    switch (watch) {
      case "all":
        return "eye";
      case "info":
        return "info-circle";
      case "none":
        return "eye-slash";
      default:
        return "eye-slash";
    }
  };

  // Build a DataList where each session is a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = sessions.map((session) => {
    // Choose the label for this session: prefer chatId, fallback to personId or key
    const sessionLabel = session.chatId || session.personId || session.key || "Unknown";

    // Compute last activity timestamp (prefer updatedAt, then receivedAt, then createdAt)
    const lastTs = session.updatedAt ?? session.receivedAt ?? session.createdAt ?? 0;
    // Format for display (local date/time)
    const dateStr = lastTs > 0
      ? new Date(lastTs).toLocaleString()
      : "—";

    // Unread count (default to zero)
    const unreadCount = session.unread ?? 0;

    // Compose the label side: icon + text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: getChatIcon(session.chatType),
        size: 20,
        color: "blue"
      } as IAutoView.IAutoViewIconProps,
      {
        type: "Text",
        content: sessionLabel,
        variant: "body1",
        color: "primary"
      } as IAutoView.IAutoViewTextProps
    ];

    // Compose the value side: unread chip, watch icon, last-updated timestamp
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Chip",
        label: unreadCount.toString(),
        size: "small",
        variant: "filled",
        color: unreadCount > 0 ? "error" : "gray"
      } as IAutoView.IAutoViewChipProps,
      {
        type: "Icon",
        id: getWatchIcon(session.watch),
        size: 16,
        color: "teal"
      } as IAutoView.IAutoViewIconProps,
      {
        type: "Text",
        content: dateStr,
        variant: "caption",
        color: "gray"
      } as IAutoView.IAutoViewTextProps
    ];

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Return the DataList component with all session items
  return {
    type: "DataList",
    childrenProps: items
  } as IAutoView.IAutoViewDataListProps;
}
