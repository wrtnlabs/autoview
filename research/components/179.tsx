import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4ChatTagView = {
          chatTag?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4ChatTag = {
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
        followerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
        createdAt?: number;
      };
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values and helpers
  const tag = value.chatTag;
  const createdDate = tag?.createdAt
    ? new Date(tag.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const followerCount = tag?.followerIds?.length ?? 0;

  // Map the colorVariant to a Tailwind CSS background class
  const colorMap: Record<string, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-400",
    olive: "bg-lime-700",
    green: "bg-green-500",
    cobalt: "bg-blue-700",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    navy: "bg-blue-900",
  };
  const colorClass = tag?.colorVariant
    ? colorMap[tag.colorVariant] || "bg-gray-300"
    : "bg-gray-300";

  // 2. Compose the visual structure
  if (!tag) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No tag data available</span>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <span className={`h-3 w-3 rounded-full ${colorClass}`} />
        <h2 className="ml-2 text-lg font-semibold text-gray-900 truncate">
          {tag.name}
        </h2>
      </div>
      <p className="mt-1 text-xs text-gray-500 truncate">Key: {tag.key}</p>
      {tag.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {tag.description}
        </p>
      )}
      <div className="flex items-center mt-4 text-gray-500 text-sm">
        <div className="flex items-center">
          <LucideReact.Users size={16} />
          <span className="ml-1">
            {followerCount} follower{followerCount !== 1 ? "s" : ""}
          </span>
        </div>
        {createdDate && (
          <div className="flex items-center ml-4">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">{createdDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
