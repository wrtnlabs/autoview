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

  const processed = sessions
    .map((s) => {
      const last = Math.max(
        s.postedAt ?? 0,
        s.receivedAt ?? 0,
        s.updatedAt ?? 0,
        s.readAt ?? 0
      );
      return { ...s, lastActivity: last };
    })
    .sort((a, b) => b.lastActivity - a.lastActivity);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (processed.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={48} aria-label="No data" />
        <p className="mt-3 text-sm">No sessions available.</p>
      </div>
    );
  }

  return (
    <ul className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      {processed.map((session, idx) => {
        const title =
          session.chatId ||
          session.chatKey ||
          session.id ||
          session.key ||
          "Session";

        const hasDate = session.lastActivity > 0;
        const formattedDate = hasDate
          ? new Date(session.lastActivity).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "";

        let watchIcon = (
          <LucideReact.BellOff
            className="text-gray-400"
            size={16}
            aria-label="Not watching"
          />
        );
        if (session.watch === "all") {
          watchIcon = (
            <LucideReact.Bell
              className="text-blue-500"
              size={16}
              aria-label="Watching all"
            />
          );
        } else if (session.watch === "info") {
          watchIcon = (
            <LucideReact.Info
              className="text-blue-500"
              size={16}
              aria-label="Watching info"
            />
          );
        }

        return (
          <li
            key={idx}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 truncate">
              <span className="font-medium text-gray-900 truncate">
                {title}
              </span>
              {hasDate && (
                <span className="flex items-center text-sm text-gray-500 mt-1 sm:mt-0">
                  <LucideReact.Calendar
                    className="mr-1"
                    size={14}
                    aria-label="Date"
                  />
                  {formattedDate}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
              {session.alert != null && session.alert > 0 && (
                <div className="flex items-center text-red-500 text-sm">
                  <LucideReact.AlertTriangle
                    className="mr-1"
                    size={16}
                    aria-label="Alerts"
                  />
                  <span>{session.alert}</span>
                </div>
              )}
              {session.unread != null && session.unread > 0 && (
                <div className="flex items-center text-blue-500 text-sm">
                  <LucideReact.MessageSquare
                    className="mr-1"
                    size={16}
                    aria-label="Unread"
                  />
                  <span>{session.unread}</span>
                </div>
              )}
              <div>{watchIcon}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
