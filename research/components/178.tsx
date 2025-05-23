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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  if (!tag) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No tag data available</span>
      </div>
    );
  }

  const { name, key, description, colorVariant, followerIds, createdAt } = tag;
  const descText = description?.trim() ?? 'No description available';
  const followerCount = followerIds?.length ?? 0;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const variantStyles: Record<string, string> = {
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    olive: 'bg-green-100 text-green-800',
    green: 'bg-green-100 text-green-800',
    cobalt: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    navy: 'bg-blue-100 text-blue-900',
  };
  const variantClass = colorVariant ? variantStyles[colorVariant] : 'bg-gray-100 text-gray-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center text-lg font-semibold text-gray-900">
          <LucideReact.Tag className="mr-2 text-gray-500" size={20} />
          {name}
        </h2>
        <span className={`px-2 py-0.5 text-sm font-medium rounded ${variantClass}`}>
          {colorVariant ?? 'default'}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{descText}</p>
      <div className="mt-4 flex items-center text-gray-500 text-sm space-x-4">
        <div className="flex items-center">
          <LucideReact.Users size={16} className="mr-1" />
          <span>{followerCount}</span>
        </div>
        {formattedDate && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-400 truncate">Key: {key}</div>
    </div>
  );
}
