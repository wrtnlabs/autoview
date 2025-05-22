import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4EventView = {
          event?: AutoViewInputSubTypes.legacy.v4.LegacyV4Event;
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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4EventView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const event = value.event;
  const now = Date.now();

  // If no event data, show an empty state
  if (!event) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span>No event data available.</span>
      </div>
    );
  }

  // Format timestamps to locale strings
  const formattedCreated = event.createdAt
    ? new Date(event.createdAt).toLocaleString()
    : "—";
  const formattedExpire = event.expireAt
    ? new Date(event.expireAt).toLocaleString()
    : null;

  // Determine expiration status
  const isExpired = typeof event.expireAt === "number" && event.expireAt < now;

  // Extract custom property keys
  const propertyKeys = event.property ? Object.keys(event.property) : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white p-5 rounded-lg shadow-md">
      {/* Event Name */}
      <div className="flex items-center mb-4">
        <LucideReact.Calendar size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {event.name}
        </h2>
      </div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
        {/* Created At */}
        <div className="flex items-center text-gray-600">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
          <span>Created: {formattedCreated}</span>
        </div>

        {/* Expires At */}
        {formattedExpire && (
          <div
            className={`flex items-center ${
              isExpired ? "text-red-500" : "text-gray-600"
            }`}
          >
            {isExpired ? (
              <LucideReact.AlertTriangle
                size={16}
                className="mr-1"
                aria-label="Expired"
              />
            ) : (
              <LucideReact.Clock
                size={16}
                className="text-gray-400 mr-1"
                aria-label="Expires At"
              />
            )}
            <span>
              {isExpired ? "Expired:" : "Expires:"} {formattedExpire}
            </span>
          </div>
        )}

        {/* Version */}
        {typeof event.version === "number" && (
          <div className="flex items-center text-gray-600">
            <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
            <span>Version: {event.version}</span>
          </div>
        )}

        {/* Custom Properties */}
        {propertyKeys.length > 0 && (
          <div className="sm:col-span-2">
            <span className="block font-medium text-gray-800 mb-1">
              Properties:
            </span>
            <ul className="list-disc list-inside max-h-32 overflow-y-auto text-gray-600">
              {propertyKeys.map((key) => (
                <li key={key} className="truncate">
                  {key}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
