import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No event data available</span>
      </div>
    );
  }

  const { name, createdAt, expireAt, managed, version, nameI18nMap } = event;
  const createdDate =
    typeof createdAt === "number" ? new Date(createdAt) : null;
  const expireDate = typeof expireAt === "number" ? new Date(expireAt) : null;
  const formattedCreated = createdDate ? createdDate.toLocaleString() : null;
  const formattedExpire = expireDate ? expireDate.toLocaleString() : null;
  const translationsCount = nameI18nMap ? Object.keys(nameI18nMap).length : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>

      {translationsCount > 0 && (
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <LucideReact.Globe size={16} aria-label="Translations" />
          <span>
            {translationsCount}{" "}
            {translationsCount === 1 ? "language" : "languages"}
          </span>
        </div>
      )}

      {formattedCreated && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LucideReact.Calendar size={16} aria-label="Created at" />
          <time dateTime={createdDate!.toISOString()}>{formattedCreated}</time>
        </div>
      )}

      {formattedExpire && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LucideReact.Clock size={16} aria-label="Expires at" />
          <time dateTime={expireDate!.toISOString()}>{formattedExpire}</time>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-700">Managed:</span>
        {managed ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={16}
            aria-label="Managed"
          />
        ) : (
          <LucideReact.XCircle
            className="text-red-500"
            size={16}
            aria-label="Not managed"
          />
        )}
      </div>

      {typeof version === "number" && (
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <LucideReact.Hash size={16} aria-label="Version" />
          <span>v{version}</span>
        </div>
      )}
    </div>
  );
}
