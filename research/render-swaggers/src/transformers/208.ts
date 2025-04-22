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
  // Extract sessions array safely
  const sessions = input.sessions ?? [];

  // If there are no sessions, show a friendly markdown message
  if (sessions.length === 0) {
    return {
      type: "Markdown",
      content: "**No chat sessions found**\n\nThere are currently no sessions to display."
    };
  }

  // Map each session to a ListItemProps
  const sessionItems: IAutoView.IAutoViewListItemProps[] = sessions.map((session) => {
    // Derive a display title: prefer chatId, then key, then a fallback label
    const title = session.chatId ?? session.key ?? "Unnamed Session";

    // Format the most recent timestamp for description
    const timestamp = session.updatedAt ?? session.createdAt ?? session.receivedAt;
    const description = timestamp
      ? `**Last updated:** ${new Date(timestamp).toLocaleString()}`
      : undefined;

    // Use an icon at the start to represent a chat thread
    const startElement: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "comments",    // FontAwesome "comments" icon
      color: "blue",
      size: 24
    };

    // If there are unread messages, show a badge with the count
    let endElement: IAutoView.IAutoViewBadgeProps | undefined;
    if (typeof session.unread === "number" && session.unread > 0) {
      endElement = {
        type: "Badge",
        count: session.unread,
        // Nest an envelope icon inside the badge
        childrenProps: {
          type: "Icon",
          id: "envelope",
          color: "red",
          size: 16
        }
      };
    }

    // Compose and return the list item
    const item: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title,
      description,
      startElement,
      // Only include the endElement if there's unread count
      ...(endElement ? { endElement } : {})
    };

    return item;
  });

  // Return a responsive List component containing all session items
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: sessionItems
  };

  return list;
}
