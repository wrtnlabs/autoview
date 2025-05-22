import LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sessions = value.sessions ?? [];
  const sessionCount = sessions.length;

  const formatDate = (timestamp?: number): string =>
    timestamp ? new Date(timestamp).toLocaleString() : "";

  const getWatchIcon = (
    watch?: AutoViewInputSubTypes.ChatSession["watch"],
  ): JSX.Element | null => {
    switch (watch) {
      case "all":
        return (
          <LucideReact.Eye
            size={16}
            className="text-green-500"
            aria-label="Watching all"
          />
        );
      case "info":
        return (
          <LucideReact.Bell
            size={16}
            className="text-blue-500"
            aria-label="Watching mentions"
          />
        );
      case "none":
        return (
          <LucideReact.EyeOff
            size={16}
            className="text-gray-400"
            aria-label="Not watching"
          />
        );
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Chat Sessions ({sessionCount})
        </h2>
      </div>

      {sessionCount === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No chat sessions available</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sessions.map((session, idx) => {
            const unreadCount = session.unread ?? 0;
            const alertCount = session.alert ?? 0;
            const isPersonal = Boolean(session.personId);
            return (
              <li
                key={session.key ?? idx}
                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center space-x-3 truncate">
                  {isPersonal ? (
                    <LucideReact.User
                      size={20}
                      className="text-gray-500 flex-shrink-0"
                      aria-label="Personal chat"
                    />
                  ) : (
                    <LucideReact.Users
                      size={20}
                      className="text-gray-500 flex-shrink-0"
                      aria-label="Group chat"
                    />
                  )}
                  <div className="min-w-0 truncate">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.chatId ?? "Unnamed Chat"}
                    </p>
                    {session.channelId && (
                      <p className="text-xs text-gray-500 truncate">
                        {session.channelId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-2 sm:mt-0 flex items-center flex-wrap gap-2">
                  {session.allMentionImportant && (
                    <LucideReact.Star
                      size={16}
                      className="text-yellow-400"
                      aria-label="All mentions important"
                    />
                  )}

                  {unreadCount > 0 && (
                    <div className="flex items-center text-xs text-white bg-blue-500 rounded-full px-2 py-0.5">
                      <LucideReact.MessageCircle
                        size={12}
                        className="mr-1"
                        aria-label="Unread messages"
                      />
                      <span>{unreadCount}</span>
                    </div>
                  )}

                  {alertCount > 0 && (
                    <div className="flex items-center text-xs text-white bg-red-500 rounded-full px-2 py-0.5">
                      <LucideReact.AlertCircle
                        size={12}
                        className="mr-1"
                        aria-label="Alerts"
                      />
                      <span>{alertCount}</span>
                    </div>
                  )}

                  {getWatchIcon(session.watch)}

                  {session.postedAt && (
                    <div className="flex items-center text-xs text-gray-400">
                      <LucideReact.Calendar
                        size={12}
                        className="mr-1"
                        aria-label="Last message"
                      />
                      <span>{formatDate(session.postedAt)}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
