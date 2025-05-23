import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ChatTagView {
                    chatTag?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4ChatTag {
                id?: string;
                channelId?: string;
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation
  const tag = value.chatTag;

  // Derived values
  const followerCount = tag?.followerIds?.length ?? 0;
  const formattedDate = tag?.createdAt
    ? new Date(tag.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const colorStyles = {
    red:    { bg: "bg-red-100",    text: "text-red-800" },
    orange: { bg: "bg-orange-100", text: "text-orange-800" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-800" },
    olive:  { bg: "bg-green-100",  text: "text-green-800" },
    green:  { bg: "bg-green-100",  text: "text-green-800" },
    cobalt: { bg: "bg-blue-100",   text: "text-blue-800" },
    purple: { bg: "bg-purple-100", text: "text-purple-800" },
    pink:   { bg: "bg-pink-100",   text: "text-pink-800" },
    navy:   { bg: "bg-blue-900",   text: "text-white" },
  } as const;

  const variantStyles = tag?.colorVariant
    ? colorStyles[tag.colorVariant]
    : { bg: "bg-gray-100", text: "text-gray-800" };

  // 2. Handle missing tag
  if (!tag) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No Chat Tag available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.Tag className="text-gray-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">{tag.name}</h2>
        </div>
        <span className="text-sm text-gray-500">{tag.key}</span>
      </div>

      {tag.colorVariant && (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${variantStyles.bg} ${variantStyles.text}`}
        >
          {tag.colorVariant.charAt(0).toUpperCase() + tag.colorVariant.slice(1)}
        </span>
      )}

      {tag.description && (
        <p className="text-sm text-gray-600 line-clamp-2">{tag.description}</p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} />
          <span>{followerCount}</span>
        </div>
        {formattedDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
