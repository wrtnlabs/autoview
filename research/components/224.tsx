import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // Fallback placeholder based on bot name
  const placeholderSrc = bot
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=0D8ABC&color=fff`
    : "";
  const imageSrc = bot?.avatarUrl || placeholderSrc;
  // Format creation date
  const createdDate = bot?.createdAt
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(bot.createdAt))
    : null;
  // Check for translations
  const translations =
    bot?.nameDescI18nMap && Object.keys(bot.nameDescI18nMap).length > 0
      ? Object.entries(bot.nameDescI18nMap)
      : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!bot) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <span className="mt-2 text-gray-500">No bot data available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center space-y-4 max-w-xs mx-auto">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={`${bot.name} avatar`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholderSrc;
          }}
        />
      </div>

      {/* Bot Name with custom color */}
      <h2
        className="text-lg font-semibold truncate"
        style={{ color: bot.color }}
        title={bot.name}
      >
        {bot.name}
      </h2>

      {/* AI Indicator */}
      {bot.ai && (
        <div className="flex items-center space-x-1">
          <LucideReact.Cpu size={16} className="text-blue-500" />
          <span className="text-sm text-gray-500">AI Bot</span>
        </div>
      )}

      {/* Description */}
      {bot.description && (
        <p className="text-sm text-gray-600 line-clamp-3">{bot.description}</p>
      )}

      {/* Creation Date */}
      {createdDate && (
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500">Created: {createdDate}</span>
        </div>
      )}

      {/* Translations */}
      {translations.length > 0 && (
        <div className="w-full">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Translations
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {translations.map(([locale, nd]) => (
              <div
                key={locale}
                className="bg-gray-100 p-2 rounded text-xs flex flex-col"
              >
                <span className="font-semibold text-gray-700">{locale}</span>
                <span className="truncate">{nd.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
