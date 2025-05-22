import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4BotView = {
          bot?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4Bot = {
        id?: string;
        channelId?: string;
        name: string;
        createdAt?: number;
        avatar?: AutoViewInputSubTypes.legacy.v4.LegacyV4TinyFile;
        avatarUrl?: string;
        color: string & tags.Default<"#123456">;
      };
      export type LegacyV4TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
      };
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4BotView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bot = value.bot;
  // Placeholder avatar generator based on bot name
  const placeholderAvatar = bot
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=0D8ABC&color=fff`
    : undefined;
  // Format creation date if available
  const createdDate = bot?.createdAt
    ? new Date(bot.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;
  // Decide avatar source: use explicit URL or fallback to generated placeholder
  const avatarSrc = bot?.avatarUrl ?? placeholderAvatar;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!bot) {
    // No bot data state
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No Bot Data</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xs mx-auto">
      <div className="flex items-center space-x-4">
        {/* Avatar with color indicator */}
        <div className="relative">
          <img
            src={avatarSrc}
            alt={`${bot.name} avatar`}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
            onError={(e) => {
              e.currentTarget.onerror = null;
              if (placeholderAvatar) e.currentTarget.src = placeholderAvatar;
            }}
          />
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: bot.color }}
            title={`Bot color: ${bot.color}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          {/* Bot name */}
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {bot.name}
          </h2>
          {/* Creation date */}
          {createdDate && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <LucideReact.Calendar className="mr-1" size={16} />
              <span>{createdDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
