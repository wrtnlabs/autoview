import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4SessionsView = {
                    sessions?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession[];
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4SessionsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sessions = value.sessions ?? [];

  // Helper to format timestamps into a readable string
  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "—";
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  // Helper to derive badge label and classes for 'watch' status
  const getWatchBadge = (
    watch?: "all" | "info" | "none"
  ): { label: string; classes: string } => {
    switch (watch) {
      case "all":
        return { label: "Watching All", classes: "bg-green-100 text-green-800" };
      case "info":
        return { label: "Watching Info", classes: "bg-blue-100 text-blue-800" };
      default:
        return { label: "Not Watching", classes: "bg-gray-100 text-gray-800" };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No chat sessions available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sessions.map((session, idx) => {
        const title =
          session.chatId || session.id || session.chatKey || "Unnamed Session";
        const unread = session.unread ?? 0;
        const alerts = session.alert ?? 0;
        const { label: watchLabel, classes: watchClasses } = getWatchBadge(
          session.watch
        );
        const lastActivityTimestamp = Math.max(
          session.postedAt ?? 0,
          session.updatedAt ?? 0,
          session.receivedAt ?? 0,
          session.readAt ?? 0
        );
        const lastActivity = formatDate(lastActivityTimestamp);

        return (
          <div
            key={idx}
            className="flex justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex-1 overflow-hidden">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {unread > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                    Unread: {unread}
                  </span>
                )}
                {alerts > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    Alerts: {alerts}
                  </span>
                )}
                <span
                  className={`px-2 py-1 text-xs font-medium ${watchClasses} rounded`}
                >
                  {watchLabel}
                </span>
              </div>
            </div>
            <div className="ml-4 whitespace-nowrap text-sm text-gray-500">
              <div>Last Activity:</div>
              <div className="mt-1">{lastActivity}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
