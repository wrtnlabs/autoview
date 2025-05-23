import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface ChatTagView {
            chatTag?: AutoViewInputSubTypes.ChatTag;
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
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagView;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive the chat tag object
  const tag = value.chatTag;

  // Map colorVariant to Tailwind CSS classes
  const colorClasses: Record<string, string> = {
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    olive: 'bg-lime-100 text-lime-800',
    green: 'bg-green-100 text-green-800',
    cobalt: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    navy: 'bg-blue-800 text-white',
  };

  // Format creation date if available
  const formattedDate =
    tag?.createdAt != null
      ? new Date(tag.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : null;

  // Render placeholder when no tag data is provided
  if (!tag) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No tag data available</span>
      </div>
    );
  }

  // Determine badge styling based on variant
  const badgeClasses = tag.colorVariant
    ? colorClasses[tag.colorVariant] || 'bg-gray-100 text-gray-800'
    : 'bg-gray-100 text-gray-800';

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Header: Tag icon and name badge */}
      <div className="flex items-center">
        <LucideReact.Tag
          size={20}
          strokeWidth={1.5}
          className={tag.colorVariant ? badgeClasses.split(' ')[1] : 'text-gray-500'}
        />
        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${badgeClasses}`}>
          {tag.name}
        </span>
      </div>

      {/* Key (secondary info) */}
      <div className="mt-2 text-xs text-gray-500 truncate">
        Key: <code className="font-mono">{tag.key}</code>
      </div>

      {/* Description (truncated) */}
      {tag.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {tag.description}
        </p>
      )}

      {/* Creation date */}
      {formattedDate && (
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <LucideReact.Calendar size={14} className="mr-1" />
          <span>Created on {formattedDate}</span>
        </div>
      )}
    </div>
  );
}
