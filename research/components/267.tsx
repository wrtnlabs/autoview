import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Data transformation / derived constants
  const sessions = value.sessions ?? [];

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLastActivity = (
    session: AutoViewInputSubTypes.ChatSession,
  ): number =>
    Math.max(
      session.updatedAt ?? 0,
      session.postedAt ?? 0,
      session.receivedAt ?? 0,
      session.readAt ?? 0,
      session.createdAt ?? 0,
    );

  const getWatchIcon = (
    watch?: AutoViewInputSubTypes.ChatSession["watch"],
  ): JSX.Element => {
    switch (watch) {
      case "all":
        return <LucideReact.Bell className="text-green-500" size={14} />;
      case "info":
        return (
          <LucideReact.AlertTriangle className="text-amber-500" size={14} />
        );
      default:
        return <LucideReact.BellOff className="text-gray-400" size={14} />;
    }
  };

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Chat Sessions
      </h2>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-10">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No sessions available</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {sessions.map((session, idx) => {
            const name = session.chatId ?? session.id ?? "Unnamed Chat";
            const alertCount = session.alert ?? 0;
            const unreadCount = session.unread ?? 0;
            const lastTs = getLastActivity(session);
            const lastLabel = lastTs > 0 ? formatDate(lastTs) : "";

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {name}
                    </span>
                    {session.allMentionImportant && (
                      <LucideReact.Star
                        className="text-yellow-400"
                        size={16}
                        aria-label="Important Mentions"
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center text-xs text-gray-500 space-x-4 mt-1">
                    {lastLabel && (
                      <div className="flex items-center space-x-1">
                        <LucideReact.Calendar size={14} />
                        <span>{lastLabel}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      {getWatchIcon(session.watch)}
                      <span className="sr-only">Watch status</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-2 sm:mt-0 sm:ml-4">
                  {alertCount > 0 && (
                    <div className="flex items-center bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded">
                      <LucideReact.AlertTriangle className="mr-1" size={12} />
                      {alertCount}
                    </div>
                  )}
                  {unreadCount > 0 && (
                    <div className="flex items-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                      <LucideReact.Mail className="mr-1" size={12} />
                      {unreadCount}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
