import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4BotsView = {
                    bots?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot[];
                    next?: number;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4BotsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bots = value.bots ?? [];
  const totalBots = bots.length;
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? `${new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}, ${new Date(timestamp).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Bots Overview</h2>
        <span className="text-sm text-gray-500">
          {totalBots} {totalBots === 1 ? "bot" : "bots"}
        </span>
      </div>

      <ul className="space-y-4">
        {bots.map((bot, idx) => {
          const initials = bot.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <li
              key={bot.id ?? idx}
              className="flex items-center space-x-4"
            >
              {bot.avatarUrl ? (
                <img
                  src={bot.avatarUrl}
                  alt={`${bot.name} avatar`}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {bot.name}
                </p>
                {bot.channelId && (
                  <p className="text-xs text-gray-500 truncate">
                    Channel: {bot.channelId}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end space-y-1">
                {bot.createdAt != null && (
                  <p className="text-xs text-gray-500">
                    {formatDate(bot.createdAt)}
                  </p>
                )}
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: bot.color }}
                  title={bot.color}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {value.next != null && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Next offset: {value.next}
        </div>
      )}
    </div>
  );
}
