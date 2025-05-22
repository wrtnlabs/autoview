import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type ChatTagView = {
      chatTag?: AutoViewInputSubTypes.ChatTag;
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
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and transformation
  const tag = value.chatTag;
  // Mapping for colorVariant to hex values
  const colorMap: Record<string, string> = {
    red: "#EF4444",
    orange: "#F97316",
    yellow: "#EAB308",
    olive: "#9CA34A",
    green: "#22C55E",
    cobalt: "#2563EB",
    purple: "#8B5CF6",
    pink: "#EC4899",
    navy: "#1E3A8A",
  };
  // Format creation date if available
  const formattedDate =
    tag?.createdAt != null
      ? new Date(tag.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;
  // Determine dot color or fallback gray
  const dotColor =
    (tag?.colorVariant && colorMap[tag.colorVariant]) || "#D1D5DB";

  // 2. Compose the visual structure
  if (!tag) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle
          size={24}
          className="text-gray-400"
          aria-label="No data"
        />
        <span className="mt-2 text-sm">No tag data available</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Header: Color dot and Tag name */}
      <div className="flex items-center space-x-2">
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {tag.name}
        </h2>
      </div>

      {/* Key/identifier */}
      <div className="mt-1 text-sm text-gray-500 truncate">{tag.key}</div>

      {/* Description, truncated to two lines */}
      {tag.description && (
        <p className="mt-3 text-sm text-gray-700 line-clamp-2">
          {tag.description}
        </p>
      )}

      {/* Creation date with icon */}
      {formattedDate && (
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">{formattedDate}</span>
        </div>
      )}
    </div>
  );
}
