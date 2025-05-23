import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4BotView {
                    bot?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Bot {
                id?: string;
                channelId?: string;
                name: string;
                createdAt?: number;
                avatar?: AutoViewInputSubTypes.legacy.v4.LegacyV4TinyFile;
                avatarUrl?: string;
                color: string & tags.Default<"#123456">;
            }
            export interface LegacyV4TinyFile {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4BotView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const bot = value.bot;

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  if (!bot) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <p>No bot data available.</p>
      </div>
    );
  }

  const name = bot.name;
  const placeholderBg = bot.color.replace('#', '') || '123456';
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=${placeholderBg}&color=fff`;
  const avatarSrc =
    bot.avatarUrl ??
    (bot.avatar
      ? `https://${bot.avatar.bucket}.s3.amazonaws.com/${bot.avatar.key}`
      : defaultAvatar);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = bot.createdAt
    ? new Date(bot.createdAt).toLocaleDateString(undefined, dateOptions)
    : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img
          src={avatarSrc}
          alt={`${name} avatar`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultAvatar;
          }}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: bot.color }}
            title={`Color ${bot.color}`}
          />
        </div>
        {formattedDate && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
