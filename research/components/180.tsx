import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4EventsView = {
          events?: AutoViewInputSubTypes.legacy.v4.LegacyV4Event[];
          prev?: string;
          next?: string;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4Event = {
        userId?: string;
        id?: string;
        channelId?: string;
        name: string;
        property?: {
          [key: string]: {};
        };
        createdAt?: number;
        expireAt?: number;
        version?: number & tags.Type<"int32">;
      };
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4EventsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const events = value.events ?? [];
  const eventCount = events.length;

  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <LucideReact.List size={20} className="mr-2 text-gray-600" />
          Events ({eventCount})
        </h2>
      </div>

      {eventCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-sm">No events available</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((event, idx) => (
            <li
              key={event.id ?? idx}
              className="flex flex-col md:flex-row md:justify-between py-3"
            >
              <div className="flex-1">
                <span className="block text-gray-800 font-medium truncate">
                  {event.name}
                </span>
              </div>
              <div className="mt-2 md:mt-0 flex flex-wrap items-center space-x-4 text-gray-500 text-sm">
                {typeof event.createdAt === "number" && (
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>{formatDate(event.createdAt)}</span>
                  </div>
                )}
                {typeof event.expireAt === "number" && (
                  <div className="flex items-center">
                    <LucideReact.Clock size={16} className="mr-1" />
                    <span>Expires {formatDate(event.expireAt)}</span>
                  </div>
                )}
                {typeof event.version === "number" && (
                  <div className="flex items-center">
                    <LucideReact.Hash size={16} className="mr-1" />
                    <span>v{event.version}</span>
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
