import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface ChatTagsView {
            next?: string;
            chatTags?: AutoViewInputSubTypes.ChatTag[];
        }
    }
    export interface ChatTag {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tags = value.chatTags ?? [];
  const totalTags = tags.length;
  const formattedTags = tags.map(tag => ({
    ...tag,
    formattedDate: tag.createdAt
      ? new Date(tag.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : undefined,
  }));

  // Map the schema's colorVariant to Tailwind CSS color utilities
  const variantClasses: Record<Exclude<AutoViewInputSubTypes.ChatTag["colorVariant"], undefined>, string> = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    olive: "bg-lime-100 text-lime-800",
    green: "bg-green-100 text-green-800",
    cobalt: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    navy: "bg-indigo-100 text-indigo-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <LucideReact.Tag size={20} className="text-gray-500" />
          <span>Chat Tags ({totalTags})</span>
        </h2>
        {value.next && (
          <div className="flex items-center text-sm text-blue-500">
            <span>More available</span>
            <LucideReact.ChevronRight size={16} className="ml-1" />
          </div>
        )}
      </div>

      {/* Empty state */}
      {totalTags === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No tags available</span>
        </div>
      ) : (
        /* Tag list */
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formattedTags.map(tag => (
            <li
              key={tag.key}
              className="p-3 border border-gray-200 rounded-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    "px-2 py-1 rounded-full text-xs font-medium " +
                    (tag.colorVariant
                      ? variantClasses[tag.colorVariant]
                      : "bg-gray-100 text-gray-800")
                  }
                >
                  {tag.name}
                </span>
                {tag.formattedDate && (
                  <time
                    dateTime={String(tag.createdAt)}
                    className="text-xs text-gray-400 flex items-center gap-1"
                  >
                    <LucideReact.Calendar size={14} />
                    <span>{tag.formattedDate}</span>
                  </time>
                )}
              </div>
              {tag.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {tag.description}
                </p>
              )}
              <div className="mt-2 text-xs text-gray-500 truncate">
                Key: {tag.key}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
