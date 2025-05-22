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
  const sessions = value.sessions ?? [];

  const formatDate = (ts?: number): string => {
    if (!ts) return "N/A";
    return new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-2 space-y-4">
      {sessions.length === 0 ? (
        <div className="text-center text-gray-500">No chat sessions available.</div>
      ) : (
        sessions.map((session, index) => {
          const unreadCount = session.unread ?? 0;
          const lastActivity =
            session.updatedAt ??
            session.postedAt ??
            session.receivedAt ??
            session.readAt ??
            session.createdAt;
          const title = session.channelId
            ? `Channel: ${session.channelId}`
            : session.chatType
            ? `${session.chatType.charAt(0).toUpperCase() + session.chatType.slice(1)} Chat`
            : "Chat Session";

          return (
            <div
              key={session.id ?? session.key ?? index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Last activity: {formatDate(lastActivity)}
                </p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-wrap gap-2">
                {unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {unreadCount} unread
                  </span>
                )}
                {session.watch && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    Watching: {session.watch}
                  </span>
                )}
                {session.allMentionImportant && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    @ Mentions Highlighted
                  </span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
