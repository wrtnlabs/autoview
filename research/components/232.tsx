import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type EventsView = {
        prev?: string;
        next?: string;
        events?: AutoViewInputSubTypes.Event[];
    };
    export type Event = {
        userId?: string;
        id?: string;
        channelId?: string;
        name: string;
        property?: {
            [key: string]: {};
        };
        createdAt?: number;
        expireAt?: number;
        managed?: boolean;
        version?: number & tags.Type<"int32">;
        nameI18nMap?: {
            [key: string]: string;
        };
    };
}
export type AutoViewInput = AutoViewInputSubTypes.EventsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const events = value.events ?? [];

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
  // 3. Return the React element.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Events{events.length > 0 ? ` (${events.length})` : ""}
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No events to display.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event, idx) => {
            const created = formatDate(event.createdAt);
            const expire = formatDate(event.expireAt);
            const managed = event.managed ?? false;
            const version = typeof event.version === "number" ? event.version : null;
            const translations = event.nameI18nMap
              ? Object.keys(event.nameI18nMap).length
              : 0;

            return (
              <li key={idx} className="p-4 bg-white rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {event.name}
                  </h3>
                  <div className="flex space-x-2">
                    {managed && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Managed
                      </span>
                    )}
                    {version != null && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        v{version}
                      </span>
                    )}
                    {translations > 0 && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        {translations} lang
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  {created && (
                    <p>
                      <span className="font-medium">Created:</span> {created}
                    </p>
                  )}
                  {expire && (
                    <p>
                      <span className="font-medium">Expires:</span> {expire}
                    </p>
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
