import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type EventView = {
        event?: AutoViewInputSubTypes.Event;
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
export type AutoViewInput = AutoViewInputSubTypes.EventView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const event = value.event;
  if (!event) {
    return (
      <div className="p-4 text-sm text-gray-500 italic">
        No event data available.
      </div>
    );
  }

  const {
    name,
    createdAt,
    expireAt,
    channelId,
    managed,
    version,
    nameI18nMap,
  } = event;

  const displayName = name || "Untitled Event";

  const createdAtStr = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  const expireAtStr = expireAt
    ? new Date(expireAt).toLocaleDateString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const isExpired = expireAt ? Date.now() > expireAt : false;
  const statusBadge = isExpired
    ? {
        text: "Expired",
        bg: "bg-red-100",
        color: "text-red-800",
      }
    : {
        text: "Active",
        bg: "bg-green-100",
        color: "text-green-800",
      };

  const managedStatus = managed ? "Managed" : "Unmanaged";
  const channel = channelId || "N/A";
  const translationsCount = nameI18nMap
    ? Object.keys(nameI18nMap).length
    : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md mx-auto">
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={displayName}
        >
          {displayName}
        </h2>
        <span
          className={`text-xs ${statusBadge.bg} ${statusBadge.color} px-2 py-1 rounded-full`}
        >
          {statusBadge.text}
        </span>
      </div>

      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span> {createdAtStr}
        </div>
        {expireAtStr && (
          <div>
            <span className="font-medium">Expires:</span> {expireAtStr}
          </div>
        )}
        <div>
          <span className="font-medium">Channel:</span> {channel}
        </div>
        <div>
          <span className="font-medium">Mode:</span> {managedStatus}
        </div>
        {translationsCount > 0 && (
          <div>
            <span className="font-medium">Translations:</span>{" "}
            {translationsCount}
          </div>
        )}
        {version !== undefined && (
          <div>
            <span className="font-medium">Version:</span> {version}
          </div>
        )}
      </div>
    </div>
  );
}
