import * as LucideReact from "lucide-react";
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
  const sessions = value.sessions ?? [];
  const sessionCount = sessions.length;

  // Helper to format timestamps
  const formatTimestamp = (ts?: number): string => {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Chat Sessions ({sessionCount})
        </h2>
      </div>

      {/* Body */}
      {sessionCount > 0 ? (
        <ul className="space-y-2">
          {sessions.map((session, idx) => {
            const name =
              session.chatId ?? session.id ?? session.key ?? "Unknown Session";
            const updated = formatTimestamp(
              session.updatedAt ?? session.createdAt,
            );
            const unreadCount = session.unread ?? 0;
            const alertCount = session.alert ?? 0;
            const watchMode = session.watch ?? "none";

            return (
              <li
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                {/* Session Info */}
                <div className="flex items-center space-x-3">
                  <LucideReact.MessageSquare
                    className="text-gray-500"
                    size={20}
                  />
                  <div className="flex flex-col">
                    <span
                      className="font-medium text-gray-800 truncate w-48"
                      title={name}
                    >
                      {name}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <LucideReact.Calendar size={14} />
                      <span>{updated}</span>
                    </div>
                  </div>
                </div>

                {/* Session Stats */}
                <div className="flex items-center space-x-4">
                  {unreadCount > 0 && (
                    <div className="flex items-center text-red-500 text-sm">
                      <LucideReact.Mail size={16} />
                      <span className="ml-1">{unreadCount}</span>
                    </div>
                  )}
                  {alertCount > 0 && (
                    <div className="flex items-center text-yellow-500 text-sm">
                      <LucideReact.AlertTriangle size={16} />
                      <span className="ml-1">{alertCount}</span>
                    </div>
                  )}
                  <div className="text-gray-500" title={`Watch: ${watchMode}`}>
                    {watchMode === "all" && <LucideReact.Eye size={16} />}
                    {watchMode === "info" && <LucideReact.Info size={16} />}
                    {watchMode === "none" && <LucideReact.EyeOff size={16} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={36} />
          <span className="mt-2">No sessions available</span>
        </div>
      )}
    </div>
  );
}
