import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tagsList = value.chatTags ?? [];
  const formatDate = (timestamp?: number) =>
    timestamp
      ? new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // Map colorVariant to Tailwind classes for badge styling
  const colorMap: Record<string, string> = {
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

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat Tags</h2>
      {tagsList.length === 0 ? (
        <p className="text-gray-500">No chat tags available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tagsList.map((tag) => {
            const badgeClasses = colorMap[tag.colorVariant || ""] || "bg-gray-100 text-gray-800";
            return (
              <li key={tag.key} className="flex items-start py-3">
                <span
                  className={`flex-shrink-0 mt-1 inline-block px-2 py-1 text-xs font-medium rounded ${badgeClasses}`}
                >
                  {tag.name}
                </span>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{tag.key}</p>
                    {tag.createdAt && (
                      <p className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {formatDate(tag.createdAt)}
                      </p>
                    )}
                  </div>
                  {tag.description && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {tag.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {value.next && (
        <p className="mt-4 text-center text-sm italic text-gray-400">
          More tags available...
        </p>
      )}
    </section>
  );
}
