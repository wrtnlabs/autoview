import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tags = value.chatTags ?? [];
  const variantStyles: Record<string, string> = {
    red:    'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    olive:  'bg-green-100 text-green-800',
    green:  'bg-green-100 text-green-800',
    cobalt: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink:   'bg-pink-100 text-pink-800',
    navy:   'bg-blue-200 text-blue-900',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat Tags</h2>
      {tags.length === 0 ? (
        <p className="text-gray-500">No tags available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map((tag) => {
            const followers = tag.followerIds?.length ?? 0;
            const formattedDate = tag.createdAt
              ? new Date(tag.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : null;
            const style = variantStyles[tag.colorVariant ?? ''] ?? 'bg-gray-100 text-gray-800';

            return (
              <div
                key={tag.key}
                className="p-4 border border-gray-200 rounded-lg flex flex-col h-full"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`${style} px-2 py-1 text-sm font-semibold rounded-full`}
                  >
                    {tag.name}
                  </span>
                  <code className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                    {tag.key}
                  </code>
                </div>
                {tag.description && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{tag.description}</p>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500">
                  {followers > 0 ? (
                    <span>{followers} follower{followers !== 1 ? 's' : ''}</span>
                  ) : (
                    <span>No followers</span>
                  )}
                  {formattedDate && <span>Created {formattedDate}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
