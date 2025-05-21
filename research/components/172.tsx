import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4BotView;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const bot = value.bot;
  if (!bot) {
    return (
      <div className="p-4 text-sm text-gray-500">
        No bot data available.
      </div>
    );
  }

  // Derived/Formatted values
  const createdDate = bot.createdAt
    ? new Date(bot.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';
  const avatarUrl = bot.avatarUrl;
  const colorDotStyle = { backgroundColor: bot.color };

  // Visual structure
  return (
    <div className="flex flex-col sm:flex-row items-center p-4 bg-white rounded-lg shadow-md">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${bot.name} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
          <span className="text-lg font-semibold">
            {bot.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="mt-3 sm:mt-0 sm:ml-4 flex-1 min-w-0">
        <h2 className="text-lg font-medium text-gray-900 truncate">
          {bot.name}
        </h2>
        <p className="text-sm text-gray-500">
          Created: {createdDate}
        </p>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-4">
        <span
          className="inline-block w-4 h-4 rounded-full"
          style={colorDotStyle}
          title={`Color: ${bot.color}`}
        />
      </div>
    </div>
  );
}
