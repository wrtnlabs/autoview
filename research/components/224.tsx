import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type BotView = {
        bot?: AutoViewInputSubTypes.bot.CustomBot;
    };
    export namespace bot {
        export type CustomBot = {
            id?: string;
            channelId?: string;
            name: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: AutoViewInputSubTypes.NameDesc;
            };
            createdAt?: number;
            avatar?: AutoViewInputSubTypes.TinyFile;
            color: string & tags.Default<"#123456">;
            avatarUrl?: string;
            ai?: boolean;
        };
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.BotView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bot = value.bot;
  if (!bot) return null;

  // Format created date
  const createdDate = bot.createdAt
    ? new Date(bot.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Count of available translations
  const translationsCount = bot.nameDescI18nMap
    ? Object.keys(bot.nameDescI18nMap).length
    : 0;

  // Truncate description for performance & layout
  const descriptionDisplay = bot.description
    ? bot.description.length > 200
      ? bot.description.slice(0, 200) + "…"
      : bot.description
    : null;

  // Derive initials for fallback avatar
  const initials = bot.name.charAt(0).toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-4 rounded-lg shadow-md">
      {/* Avatar */}
      {bot.avatarUrl ? (
        <img
          src={bot.avatarUrl}
          alt={`${bot.name} avatar`}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          style={{ backgroundColor: bot.color }}
        >
          {initials}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          {/* Bot Name */}
          <h2 className="text-lg font-semibold text-gray-900">{bot.name}</h2>
          {/* AI Badge */}
          {bot.ai && (
            <span className="mt-1 sm:mt-0 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
              AI Bot
            </span>
          )}
          {/* Translations Badge */}
          {translationsCount > 0 && (
            <span className="mt-1 sm:mt-0 inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
              {translationsCount} lang{translationsCount > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Created Date */}
        {createdDate && (
          <p className="text-gray-500 text-sm mt-1">{createdDate}</p>
        )}

        {/* Description */}
        {descriptionDisplay && (
          <p className="text-gray-700 text-sm mt-2 line-clamp-2">
            {descriptionDisplay}
          </p>
        )}
      </div>
    </div>
  );
}
