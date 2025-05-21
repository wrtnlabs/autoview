import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export type ChatTagView = {
            chatTag?: AutoViewInputSubTypes.ChatTag;
        };
    }
    export type ChatTag = {
        id?: string;
        channelId?: string;
        colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
        name: string;
        key: string;
        description?: string;
        /**
         * @deprecated
        */
        followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        createdAt?: number;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  if (!tag) {
    return (
      <div className="p-4 text-gray-500 italic text-sm">
        No tag data available
      </div>
    );
  }

  // Map the colorVariant to appropriate Tailwind CSS classes
  const colorMap: Record<NonNullable<AutoViewInputSubTypes.ChatTag["colorVariant"]>, string> = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    olive: "bg-green-100 text-green-800",
    green: "bg-green-100 text-green-800",
    cobalt: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    navy: "bg-blue-900 text-white",
  };
  const variantClass = tag.colorVariant
    ? colorMap[tag.colorVariant]
    : "bg-gray-100 text-gray-800";

  // Format creation date to a human-friendly string
  const formattedDate = tag.createdAt
    ? new Date(tag.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

  // Count followers if present
  const followersCount =
    Array.isArray(tag.followerIds) ? tag.followerIds.length : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 max-w-sm">
      <div className="flex items-center space-x-2 mb-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${variantClass}`}
        >
          {tag.name}
        </span>
        <span className="text-gray-500 text-sm font-mono truncate">
          {tag.key}
        </span>
      </div>
      {tag.description && (
        <p className="text-gray-700 text-sm line-clamp-2 mb-2">
          {tag.description}
        </p>
      )}
      <div className="flex flex-wrap text-gray-500 text-xs space-x-4">
        {formattedDate && <span>Created: {formattedDate}</span>}
        {followersCount !== undefined && (
          <span>Followers: {followersCount}</span>
        )}
      </div>
    </div>
  );
}
