import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4EventView {
                    event?: AutoViewInputSubTypes.legacy.v4.LegacyV4Event;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Event {
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
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4EventView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const event = value.event;
  const formattedCreatedAt = event?.createdAt
    ? new Date(event.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : "Unknown";
  const formattedExpireAt = event?.expireAt
    ? new Date(event.expireAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : null;
  const propertyKeys = event?.property ? Object.keys(event.property) : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!event) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No event data available</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Event Title */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">{event.name}</h2>

      {/* Metadata */}
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        {formattedExpireAt && (
          <div className="flex items-center">
            <LucideReact.CalendarOff size={16} className="text-gray-400 mr-1" />
            <span>Expires: {formattedExpireAt}</span>
          </div>
        )}
        {event.version != null && (
          <div className="flex items-center">
            <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
            <span>Version: {event.version}</span>
          </div>
        )}
      </div>

      {/* Properties */}
      {propertyKeys.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Properties</h3>
          <div className="flex flex-wrap gap-2">
            {propertyKeys.map((key) => (
              <span
                key={key}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate"
                title={key}
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
