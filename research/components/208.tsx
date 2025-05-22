import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4SessionsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sessions: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession[] =
    value.sessions ?? [];

  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const getWatchIcon = (status: string): JSX.Element => {
    switch (status) {
      case "all":
        return <LucideReact.Eye size={16} className="text-blue-500" />;
      case "info":
        return <LucideReact.Info size={16} className="text-amber-500" />;
      default:
        return <LucideReact.EyeOff size={16} className="text-gray-400" />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No chat sessions available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session, idx) => {
        const title =
          session.chatId ?? session.id ?? session.key ?? "Unknown Chat";
        const chatType = session.chatType ?? "Unknown";
        const personType = session.personType ?? "Unknown";
        const unreadCount = session.unread ?? 0;
        const alertCount = session.alert ?? 0;
        const watchStatus = session.watch ?? "none";
        const lastActivity = formatDate(session.postedAt);

        return (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-lg font-semibold text-gray-800 truncate">
                {title}
              </span>
              <div className="flex space-x-2 text-sm text-gray-500 mt-1">
                <span>{chatType}</span>
                <span>&bull;</span>
                <span>{personType}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 sm:mt-0 text-gray-600 text-sm items-center">
              <div className="flex items-center space-x-1">
                <LucideReact.MessageSquare
                  size={16}
                  className="text-gray-500"
                />
                <span>{unreadCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.AlertTriangle size={16} className="text-red-500" />
                <span>{alertCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                {getWatchIcon(watchStatus)}
                <span className="capitalize">{watchStatus}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-500" />
                <span>{lastActivity}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
