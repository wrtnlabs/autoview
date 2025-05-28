import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ChatTagsView {
                    chatTags?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag[];
                    next?: string;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const chatTags = value.chatTags ?? [];

  // Map each color variant to Tailwind classes for tag pills
  const variantClasses: Record<string, string> = {
    red:    'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    olive:  'bg-green-100 text-green-800',
    green:  'bg-green-100 text-green-800',
    cobalt: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink:   'bg-pink-100 text-pink-800',
    navy:   'bg-blue-800 text-white',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Tags size={20} className="text-gray-700 mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-800">Chat Tags</h2>
      </div>

      {/* Empty state */}
      {chatTags.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" aria-hidden="true" />
          <span className="text-sm">No chat tags available</span>
        </div>
      ) : (
        /* Tag list */
        <ul className="space-y-4">
          {chatTags.map((tag) => {
            const colorKey = tag.colorVariant ?? 'cobalt';
            const pillClass = variantClasses[colorKey] || variantClasses['cobalt'];
            const followerCount = tag.followerIds?.length ?? 0;
            const formattedDate = tag.createdAt
              ? new Date(tag.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Unknown';

            return (
              <li key={tag.key} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  {/* Tag name and description */}
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${pillClass}`}
                    >
                      {tag.name}
                    </span>
                    {tag.description && (
                      <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                        {tag.description}
                      </p>
                    )}
                  </div>

                  {/* Followers and creation date */}
                  <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <div className="flex items-center text-gray-500 text-sm">
                      <LucideReact.Users size={16} className="mr-1" aria-hidden="true" />
                      <span>{followerCount}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Pagination indicator */}
      {chatTags.length > 0 && value.next && (
        <div className="mt-6 flex justify-center items-center text-blue-600 text-sm">
          <span>More tags available</span>
          <LucideReact.ChevronRight size={16} className="ml-1" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
