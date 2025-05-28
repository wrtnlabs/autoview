import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4SessionsView {
                    sessions?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession[];
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4ChatSession {
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
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4SessionsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sessions = value.sessions ?? [];

  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <LucideReact.AlertCircle size={48} className="animate-pulse" />
          <span className="mt-2 text-lg">No sessions available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session, idx) => {
            const sessionId = session.id ?? session.key ?? `#${idx + 1}`;
            return (
              <li
                key={sessionId}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-2 truncate">
                  <LucideReact.Hash size={16} className="text-gray-500" />
                  <span className="font-medium text-gray-800 truncate">
                    {sessionId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center space-x-4 mt-3 md:mt-0">
                  {typeof session.unread === "number" && session.unread > 0 && (
                    <div className="flex items-center text-gray-600">
                      <LucideReact.Mail size={16} className="mr-1" />
                      <span className="text-sm">{session.unread}</span>
                    </div>
                  )}
                  {typeof session.alert === "number" && session.alert > 0 && (
                    <div className="flex items-center text-yellow-600">
                      <LucideReact.AlertTriangle size={16} className="mr-1" />
                      <span className="text-sm">{session.alert}</span>
                    </div>
                  )}
                  {session.watch && (
                    <div className="flex items-center text-blue-500">
                      {session.watch === "all" && (
                        <LucideReact.Eye size={16} />
                      )}
                      {session.watch === "info" && (
                        <LucideReact.Info size={16} />
                      )}
                      {session.watch === "none" && (
                        <LucideReact.EyeOff size={16} />
                      )}
                    </div>
                  )}
                  {session.postedAt && (
                    <div className="flex items-center text-gray-500">
                      <LucideReact.Clock size={16} className="mr-1" />
                      <span className="text-sm">
                        {formatDate(session.postedAt)}
                      </span>
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
