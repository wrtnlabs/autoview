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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  // Mapping of colorVariant to Tailwind CSS badge classes
  const variantClasses: Record<NonNullable<AutoViewInputSubTypes.ChatTag['colorVariant']>, string> = {
    red:    'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    olive:  'bg-lime-100 text-lime-800',
    green:  'bg-green-100 text-green-800',
    cobalt: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink:   'bg-pink-100 text-pink-800',
    navy:   'bg-indigo-100 text-indigo-800',
  };

  if (!tag) {
    // 3. Return placeholder when no data is present
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No Tag Data Available</span>
      </div>
    );
  }

  // Derive badge styling
  const variant = tag.colorVariant ?? 'cobalt';
  const badgeClass = variantClasses[variant] || variantClasses.cobalt;

  // Format creation date
  const createdAtDate = tag.createdAt
    ? new Date(tag.createdAt)
    : null;
  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  // Compute follower count (deprecated field but may provide insight)
  const followerCount = tag.followerIds?.length ?? 0;
  const followerLabel = followerCount === 1 ? 'follower' : 'followers';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-4 mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {tag.name}
        </h2>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${badgeClass}`}
        >
          {tag.key}
        </span>
      </div>

      {tag.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {tag.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {formattedDate && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            <time dateTime={createdAtDate!.toISOString()}>
              {formattedDate}
            </time>
          </div>
        )}
        {followerCount > 0 && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="mr-1" />
            <span>
              {followerCount} {followerLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
