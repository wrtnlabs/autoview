import LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  // Mapping variants to Tailwind color utilities
  const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
    red: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      dot: "bg-orange-500",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      dot: "bg-yellow-500",
    },
    olive: { bg: "bg-lime-100", text: "text-lime-800", dot: "bg-lime-500" },
    green: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    cobalt: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      dot: "bg-purple-500",
    },
    pink: { bg: "bg-pink-100", text: "text-pink-800", dot: "bg-pink-500" },
    navy: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      dot: "bg-indigo-500",
    },
  };

  if (!tag) {
    // 2. Compose the visual structure for empty state
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No tag data available</span>
      </div>
    );
  }

  const variant = tag.colorVariant ?? "cobalt";
  const colors = colorMap[variant] || colorMap.cobalt;
  const name = tag.name;
  const key = tag.key;
  const description = tag.description?.trim() || "";
  const truncatedDescription =
    description.length > 100
      ? description.slice(0, 100).trimEnd() + "…"
      : description;
  const followerCount = Array.isArray(tag.followerIds)
    ? tag.followerIds.length
    : 0;
  const formattedDate = tag.createdAt
    ? new Date(tag.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3 max-w-sm">
      <div className="flex items-center space-x-2">
        <span
          className={`inline-block w-3 h-3 rounded-full ${colors.dot}`}
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
      </div>
      <div className="text-sm text-gray-500">
        Key: <span className="font-medium text-gray-700">{key}</span>
      </div>
      {truncatedDescription && (
        <p className="text-sm text-gray-600 line-clamp-3">
          {truncatedDescription}
        </p>
      )}
      <div className="flex items-center space-x-4 pt-2 border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} className="text-gray-400" />
          <span>
            {followerCount} follower{followerCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
