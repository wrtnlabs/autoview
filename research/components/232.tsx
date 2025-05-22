import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Events</h2>
      {events.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-sm">No events available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li
              key={event.id ?? index}
              className="p-4 border border-gray-200 rounded-lg hover:shadow transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-md font-medium text-gray-800 truncate">
                  {event.name}
                </span>
                {event.managed != null &&
                  (event.managed ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                      aria-label="Managed"
                    />
                  ) : (
                    <LucideReact.XCircle
                      className="text-red-500"
                      size={16}
                      aria-label="Unmanaged"
                    />
                  ))}
              </div>
              <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <LucideReact.Calendar
                    className="text-gray-400 mr-1"
                    size={16}
                  />
                  <span>Created: {formatDate(event.createdAt)}</span>
                </div>
                {event.expireAt != null && (
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      className="text-gray-400 mr-1"
                      size={16}
                    />
                    <span>Expires: {formatDate(event.expireAt)}</span>
                  </div>
                )}
                {event.version != null && (
                  <div className="flex items-center">
                    <LucideReact.Hash
                      className="text-gray-400 mr-1"
                      size={16}
                    />
                    <span>v{event.version}</span>
                  </div>
                )}
                {event.nameI18nMap &&
                  Object.keys(event.nameI18nMap).length > 0 && (
                    <div className="flex items-center">
                      <LucideReact.Globe
                        className="text-gray-400 mr-1"
                        size={16}
                      />
                      <span>
                        {Object.keys(event.nameI18nMap).length} locales
                      </span>
                    </div>
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
