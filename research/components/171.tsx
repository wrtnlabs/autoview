import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4BotsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bots = value.bots ?? [];
  const hasBots = bots.length > 0;
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {hasBots ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bots.map((bot, idx) => {
            const avatarSrc =
              bot.avatarUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                bot.name,
              )}&background=random&color=fff`;
            return (
              <div
                key={idx}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <img
                    src={avatarSrc}
                    alt={`${bot.name} avatar`}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        bot.name,
                      )}&background=64748b&color=fff`;
                    }}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-medium text-gray-900 truncate">
                    {bot.name}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <LucideReact.Calendar
                      size={14}
                      className="text-gray-400 mr-1"
                    />
                    <span>
                      {bot.createdAt
                        ? formatDate(bot.createdAt)
                        : "Unknown date"}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: bot.color }}
                    title={`Color: ${bot.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 space-y-2 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <span>No bots available</span>
        </div>
      )}

      {hasBots && typeof value.next === "number" && (
        <div className="mt-4 flex items-center text-gray-600">
          <LucideReact.ChevronsRight size={16} />
          <span className="ml-1">Next: {value.next}</span>
        </div>
      )}
    </div>
  );
}
