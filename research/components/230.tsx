import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export type ChatTagView = {
            chatTag?: AutoViewInputSubTypes.ChatTag;
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
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  if (!tag) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No chat tag available.
      </div>
    );
  }

  const {
    name,
    key,
    description,
    colorVariant,
    createdAt,
  } = tag;

  // Map colorVariant to Tailwind color classes
  const variantMap: Record<string, { border: string; bg: string; text: string }> = {
    red:    { border: 'border-red-500', bg: 'bg-red-100',    text: 'text-red-800'    },
    orange: { border: 'border-orange-500', bg: 'bg-orange-100', text: 'text-orange-800' },
    yellow: { border: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700' },
    olive:  { border: 'border-green-700',  bg: 'bg-green-100',  text: 'text-green-700'  },
    green:  { border: 'border-green-500',  bg: 'bg-green-100',  text: 'text-green-800'  },
    cobalt: { border: 'border-blue-500',   bg: 'bg-blue-100',   text: 'text-blue-800'   },
    navy:   { border: 'border-blue-700',   bg: 'bg-blue-100',   text: 'text-blue-900'   },
    purple: { border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-800' },
    pink:   { border: 'border-pink-500',   bg: 'bg-pink-100',   text: 'text-pink-800'   },
  };

  const variant = colorVariant && variantMap[colorVariant]
    ? variantMap[colorVariant]
    : { border: 'border-gray-300', bg: 'bg-gray-100', text: 'text-gray-800' };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '—';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      className={`w-full max-w-sm bg-white rounded-lg shadow-md border-l-4 ${variant.border} overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </h3>
          {colorVariant && (
            <span
              className={`${variant.bg} ${variant.text} text-xs font-medium px-2 py-1 rounded-full ml-2`}
            >
              {colorVariant}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500 truncate">
          {key}
        </p>
        {description && (
          <p className="mt-3 text-sm text-gray-700 line-clamp-3">
            {description}
          </p>
        )}
        <div className="mt-4 border-t pt-3">
          <p className="text-xs text-gray-500">
            Created: {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}
