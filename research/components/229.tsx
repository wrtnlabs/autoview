import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type ChatTagsView = {
      next?: string;
      chatTags?: AutoViewInputSubTypes.ChatTag[];
    };
  }
  export type ChatTag = {
    id?: string;
    channelId?: string;
    colorVariant?:
      | "red"
      | "orange"
      | "yellow"
      | "olive"
      | "green"
      | "cobalt"
      | "purple"
      | "pink"
      | "navy";
    name: string;
    key: string;
    description?: string;
    /**
     * @deprecated
     */
    followerIds?: string[] &
      tags.MinItems<1> &
      tags.MaxItems<2147483647> &
      tags.UniqueItems;
    createdAt?: number;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tags = value.chatTags ?? [];

  // Map colorVariant to Tailwind CSS classes
  const colorClasses: Record<string, string> = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    olive: "bg-lime-100 text-lime-800",
    green: "bg-green-100 text-green-800",
    cobalt: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    navy: "bg-sky-100 text-sky-800",
  };

  // Format timestamp to a human-readable date
  const formatDate = (ts: number): string =>
    new Date(ts).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg font-medium">No tags available</p>
        <p className="mt-1 text-sm">There are no chat tags to display.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {tags.map((tag) => (
        <div key={tag.key} className="space-y-2">
          <div className="flex items-center justify-between">
            {/* Tag badge */}
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                tag.colorVariant
                  ? colorClasses[tag.colorVariant]
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <LucideReact.Tag size={14} className="inline-block mr-1" />
              {tag.name}
            </span>
            {/* Created date */}
            {tag.createdAt !== undefined && (
              <div className="flex items-center text-gray-500 text-sm">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>{formatDate(tag.createdAt)}</span>
              </div>
            )}
          </div>
          {/* Description, truncated to two lines */}
          {tag.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {tag.description}
            </p>
          )}
        </div>
      ))}
      {/* Optional pagination indicator */}
      {value.next && (
        <div className="pt-2 text-center">
          <p className="text-xs text-gray-400">More tags available...</p>
        </div>
      )}
    </div>
  );
}
