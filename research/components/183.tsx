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
  // 1. Data aggregation and transformation
  const sessions = value.sessions ?? [];
  const totalUnread = sessions.reduce((sum, s) => sum + (s.unread ?? 0), 0);
  const totalAlerts = sessions.reduce((sum, s) => sum + (s.alert ?? 0), 0);

  const formatDate = (ms?: number) => {
    if (typeof ms !== 'number') return '—';
    const d = new Date(ms);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLastActivity = (s: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession) => {
    const times = [
      s.updatedAt,
      s.receivedAt,
      s.postedAt,
      s.readAt,
      s.createdAt
    ].filter((t): t is number => typeof t === 'number');
    return times.length ? Math.max(...times) : undefined;
  };

  const mapWatchLabel = (w?: 'all' | 'info' | 'none') => {
    switch (w) {
      case 'all':
        return 'All';
      case 'info':
        return 'Info';
      default:
        return 'None';
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Chat Sessions ({sessions.length})
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Total Unread: {totalUnread}
        {totalAlerts > 0 && (
          <span className="ml-4">Alerts: {totalAlerts}</span>
        )}
      </p>

      {sessions.length === 0 ? (
        <p className="text-sm text-gray-500">No sessions available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sessions.map((s, idx) => {
            const lastActivity = getLastActivity(s);
            const watchLabel = mapWatchLabel(s.watch);
            const title =
              s.chatId ?? s.channelId ?? s.id ?? 'Unknown Session';

            return (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between py-3"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900 truncate">
                    {title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {s.chatType ?? s.personType ?? ''}
                  </div>
                </div>
                <div className="flex flex-wrap items-center mt-2 sm:mt-0 space-x-2">
                  {s.unread ? (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {s.unread} Unread
                    </span>
                  ) : null}
                  {s.alert ? (
                    <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                      {s.alert} Alerts
                    </span>
                  ) : null}
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                    {watchLabel}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(lastActivity)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
