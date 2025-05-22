import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4ChatTagsView = {
          chatTags?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag[];
          next?: string;
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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const tags = value.chatTags ?? [];
  // Sort tags by follower count descending for prominence
  const sortedTags = [...tags].sort(
    (a, b) => (b.followerIds?.length ?? 0) - (a.followerIds?.length ?? 0),
  );

  // Map the schema's colorVariant to Tailwind CSS classes
  type Variant = NonNullable<
    AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag["colorVariant"]
  >;
  const variantStyles: Record<
    Variant,
    { bg: string; border: string; text: string }
  > = {
    red: { bg: "bg-red-100", border: "border-red-500", text: "text-red-800" },
    orange: {
      bg: "bg-orange-100",
      border: "border-orange-500",
      text: "text-orange-800",
    },
    yellow: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800",
    },
    olive: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
    },
    green: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
    },
    cobalt: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-800",
    },
    purple: {
      bg: "bg-purple-100",
      border: "border-purple-500",
      text: "text-purple-800",
    },
    pink: {
      bg: "bg-pink-100",
      border: "border-pink-500",
      text: "text-pink-800",
    },
    navy: {
      bg: "bg-slate-100",
      border: "border-slate-700",
      text: "text-slate-800",
    },
  };

  // Utility to format UNIX timestamps to "Mon DD, YYYY"
  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  // Handle empty state
  if (sortedTags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p>No chat tags available</p>
      </div>
    );
  }

  // Render tag cards in a responsive grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedTags.map((tag) => {
        const style = tag.colorVariant
          ? variantStyles[tag.colorVariant]
          : {
              bg: "bg-gray-100",
              border: "border-gray-200",
              text: "text-gray-800",
            };
        const followerCount = tag.followerIds?.length ?? 0;

        return (
          <div
            key={tag.key}
            className={`border-l-4 ${style.border} p-4 bg-white rounded-lg shadow`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LucideReact.Tag size={20} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tag.name}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${style.bg} ${style.text} break-words`}
                >
                  {tag.key}
                </span>
              </div>
              {tag.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {tag.description}
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <LucideReact.Users size={16} />
                <span>{followerCount}</span>
              </div>
              {tag.createdAt && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} />
                  <span>{formatDate(tag.createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
