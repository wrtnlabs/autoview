import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type ChatSessionsView = {
        sessions?: AutoViewInputSubTypes.ChatSession[];
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
export type AutoViewInput = AutoViewInputSubTypes.ChatSessionsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sessions = value.sessions || [];

  // Helper: format a numeric timestamp to a readable string
  const formatDate = (ts?: number): string => {
    if (!ts) return "—";
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Map watch statuses to user-friendly labels
  const watchLabels: Record<"all" | "info" | "none", string> = {
    all: "Watching All",
    info: "Watching Mentions",
    none: "Not Watching",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No chat sessions available.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Chat Sessions
      </h2>
      <ul className="space-y-2">
        {sessions.map((session, idx) => {
          // Derive a display name for the chat
          const name =
            session.chatKey ||
            session.channelId ||
            session.chatId ||
            session.id ||
            "Unknown Chat";

          // Determine the most recent timestamp among available fields
          const lastTs = Math.max(
            session.updatedAt || 0,
            session.postedAt || 0,
            session.receivedAt || 0,
            session.readAt || 0,
            session.createdAt || 0
          );
          const formattedDate = formatDate(lastTs);

          const unread = session.unread || 0;
          const alertCount = session.alert || 0;
          const watchStatus = session.watch ?? "none";

          return (
            <li
              key={idx}
              className="flex justify-between items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium truncate">{name}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <span>{formattedDate}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    {watchLabels[watchStatus]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1 ml-4">
                {unread > 0 && (
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {unread} Unread
                  </span>
                )}
                {alertCount > 0 && (
                  <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    {alertCount} Alert
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
