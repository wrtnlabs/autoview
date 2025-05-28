import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface BotView {
        bot?: AutoViewInputSubTypes.bot.CustomBot;
    }
    export namespace bot {
        export interface CustomBot {
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
        }
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.BotView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bot = value.bot;
  // Fallback avatar URL based on bot name
  const defaultAvatar = bot
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=0D8ABC&color=fff`
    : "";
  const avatarSrc = bot?.avatarUrl ?? defaultAvatar;
  // Format creation date if available
  const formattedDate = bot?.createdAt
    ? new Date(bot.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : null;
  // Count of localized name entries
  const translationsCount = bot?.nameDescI18nMap
    ? Object.keys(bot.nameDescI18nMap).length
    : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!bot) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-100 text-gray-500 rounded-lg">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No Bot Data</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start gap-4 max-w-md mx-auto">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          alt={`${bot.name} avatar`}
          className="w-16 h-16 rounded-full object-cover bg-gray-200"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultAvatar;
          }}
        />
      </div>
      {/* Details */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{bot.name}</h2>
          {bot.ai && (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="AI Bot"
            />
          )}
        </div>
        {bot.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {bot.description}
          </p>
        )}
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mt-3">
          {formattedDate && (
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={14} aria-label="Creation Date" />
              <span>Joined {formattedDate}</span>
            </div>
          )}
          {translationsCount > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.Globe size={14} aria-label="Locales" />
              <span>
                {translationsCount} locale{translationsCount > 1 ? "s" : ""}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <LucideReact.Palette size={14} aria-label="Color" />
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: bot.color }}
              title={`Color: ${bot.color}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
