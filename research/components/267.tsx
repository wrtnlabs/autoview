import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface ChatSessionsView {
        sessions?: AutoViewInputSubTypes.ChatSession[];
    }
    export interface ChatSession {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ChatSessionsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const sessions: AutoViewInputSubTypes.ChatSession[] = value.sessions ?? [];

  // Format a timestamp into a medium date + short time string.
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
      : '';

  // Map the notification "watch" setting to an icon.
  const getWatchIcon = (watch?: AutoViewInputSubTypes.ChatSession['watch']) => {
    switch (watch) {
      case 'all':
        return <LucideReact.Bell aria-label="All Notifications" className="text-gray-500" size={16} />;
      case 'info':
        return <LucideReact.Info aria-label="Important Only" className="text-amber-500" size={16} />;
      case 'none':
        return <LucideReact.BellOff aria-label="Notifications Off" className="text-gray-400" size={16} />;
      default:
        return null;
    }
  };

  // Empty state when there are no sessions.
  if (sessions.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle aria-label="No Data" size={48} />
        <p className="mt-2 text-sm">No chat sessions available</p>
      </div>
    );
  }

  // Render a card for each chat session.
  return (
    <div className="space-y-4">
      {sessions.map((session, idx) => {
        // Derive the most recent activity timestamp.
        const lastActivity = Math.max(
          session.updatedAt ?? 0,
          session.postedAt ?? 0,
          session.receivedAt ?? 0,
          session.createdAt ?? 0
        );
        // Choose a user-friendly title.
        const title =
          session.chatId ??
          session.channelId ??
          session.teamChatSectionId ??
          session.id ??
          `Session ${idx + 1}`;

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
              {lastActivity > 0 && (
                <div className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <LucideReact.Calendar aria-label="Last Activity" size={16} />
                  <span>{formatDate(lastActivity)}</span>
                </div>
              )}
            </div>

            <div className="mt-3 sm:mt-0 flex items-center gap-4">
              {session.unread && session.unread > 0 && (
                <div className="flex items-center gap-1">
                  <LucideReact.MessageSquare aria-label="Unread Messages" size={16} className="text-blue-500" />
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {session.unread}
                  </span>
                </div>
              )}
              {session.alert && session.alert > 0 && (
                <div className="flex items-center gap-1">
                  <LucideReact.AlertTriangle aria-label="Alerts" size={16} className="text-red-500" />
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                    {session.alert}
                  </span>
                </div>
              )}
              {getWatchIcon(session.watch)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
