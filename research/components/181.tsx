import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4EventView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const event = value.event;
  if (!event) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-500 text-center">
        No event data available.
      </div>
    );
  }

  const {
    name,
    createdAt,
    expireAt,
    version,
    property,
  } = event;

  const createdDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  const expireDate = expireAt
    ? new Date(expireAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  const propertyKeys = property ? Object.keys(property) : [];
  const propCount = propertyKeys.length;
  const displayKeys =
    propCount > 0
      ? propertyKeys.slice(0, 3).join(", ") +
        (propCount > 3 ? `, +${propCount - 3} more` : "")
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-2 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>

      {createdDate && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Created:</span>{" "}
          <time dateTime={new Date(createdAt!).toISOString()}>
            {createdDate}
          </time>
        </div>
      )}

      {expireDate && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Expires:</span>{" "}
          <time dateTime={new Date(expireAt!).toISOString()}>
            {expireDate}
          </time>
        </div>
      )}

      {typeof version === "number" && (
        <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
          Version {version}
        </div>
      )}

      {displayKeys !== null && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Properties:</span>{" "}
          <span className="italic">{displayKeys || "None"}</span>
        </div>
      )}
    </div>
  );
}
