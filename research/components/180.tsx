import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4EventsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const events = value.events ?? [];
  const totalEvents = events.length;
  // Sort newest first by creation timestamp
  const sortedEvents = [...events].sort(
    (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
  );
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Event History ({totalEvents})
      </h2>
      {totalEvents === 0 ? (
        <p className="text-gray-500 italic">No events available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sortedEvents.map((event, index) => (
            <li
              key={event.id ?? index}
              className="py-3 flex flex-col sm:flex-row sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium truncate">
                  {event.name}
                </p>
                <div className="mt-1 flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                  <span>Created: {formatDate(event.createdAt)}</span>
                  {event.expireAt != null && (
                    <span>Expires: {formatDate(event.expireAt)}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
