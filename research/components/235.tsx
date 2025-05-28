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
  // 1. Data transformation: sort sessions by most recent activity timestamp
  const sessions = value.sessions ?? [];
  const sortedSessions = [...sessions].sort((a, b) => {
    const aTime = a.updatedAt ?? a.postedAt ?? a.receivedAt ?? 0;
    const bTime = b.updatedAt ?? b.postedAt ?? b.receivedAt ?? 0;
    return bTime - aTime;
  });

  // 2. Handle empty state
  if (sortedSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-lg">No chat sessions available</p>
      </div>
    );
  }

  // 3. Render list of chat sessions
  return (
    <div className="space-y-4">
      {sortedSessions.map((session, idx) => {
        // derive display name
        const name =
          session.chatId ??
          session.personId ??
          session.teamChatSectionId ??
          'Untitled Chat';
        // derive last activity time
        const timestamp =
          session.updatedAt ??
          session.postedAt ??
          session.receivedAt ??
          session.createdAt ??
          0;
        const formattedTime = new Date(timestamp).toLocaleString();
        const unreadCount = session.unread ?? 0;
        const alertCount = session.alert ?? 0;

        // choose watch icon
        let WatchIcon: JSX.Element | null = null;
        if (session.watch === 'all') {
          WatchIcon = <LucideReact.Eye size={16} className="text-blue-500" />;
        } else if (session.watch === 'info') {
          WatchIcon = <LucideReact.EyeOff size={16} className="text-yellow-500" />;
        }

        return (
          <div
            key={session.key ?? session.id ?? idx}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <LucideReact.MessageSquare size={24} className="text-gray-500" />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-gray-900 truncate">{name}</span>
                <span className="flex items-center space-x-1 text-sm text-gray-500 truncate">
                  <LucideReact.Calendar size={14} />
                  <span>{formattedTime}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {WatchIcon}
              {alertCount > 0 && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Bell size={16} className="text-red-500" />
                  <span className="text-sm font-semibold text-red-500">
                    {alertCount}
                  </span>
                </div>
              )}
              {unreadCount > 0 && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Mail size={16} className="text-blue-500" />
                  <span className="text-sm font-semibold text-blue-500">
                    {unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
