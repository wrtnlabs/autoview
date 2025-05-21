import { tags } from "typia";
import React from "react";
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
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            };
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  if (!tag) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
        No chat tag available.
      </div>
    );
  }

  // Derive follower count
  const followerCount = tag.followerIds?.length ?? 0;

  // Format creation date
  const createdDate = tag.createdAt
    ? new Date(tag.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  // Map colorVariant to Tailwind-safe color or fallback
  const colorMap: Record<string, string> = {
    red: 'red',
    orange: 'orange',
    yellow: 'yellow',
    olive: 'gray',   // olive not default: fallback to gray
    green: 'green',
    cobalt: 'blue',  // cobalt mapped to blue
    purple: 'purple',
    pink: 'pink',
    navy: 'blue',    // navy mapped to blue
  };
  const variant = tag.colorVariant ?? 'default';
  const tailwindColor = colorMap[variant] || 'gray';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {tag.name}
        </h2>
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-${tailwindColor}-100 text-${tailwindColor}-800`}
        >
          {variant}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3 truncate">Key: {tag.key}</p>
      <p className="text-gray-600 text-sm mb-4 overflow-hidden line-clamp-3">
        {tag.description ?? 'No description provided.'}
      </p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a6 6 0 00-6 6v3H3a1 1 0 000 2h14a1 1 0 000-2h-1V8a6 6 0 00-6-6zm-4 9V8a4 4 0 118 0v3H6zm4 5a2.5 2.5 0 01-2.45-2h4.9A2.5 2.5 0 0110 16z" />
          </svg>
          {followerCount} follower{followerCount === 1 ? '' : 's'}
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 2a1 1 0 00-1 1v2a1 1 0 102 0V4h6v1a1 1 0 102 0V3a1 1 0 00-1-1H6z" />
            <path
              fillRule="evenodd"
              d="M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm2 0v8h10V8H5z"
              clipRule="evenodd"
            />
          </svg>
          Created: {createdDate}
        </div>
      </div>
    </div>
  );
}
