import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4BotsView {
                    bots?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot[];
                    next?: number;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4BotsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const bots = value.bots ?? [];

  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {bots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <LucideReact.AlertCircle size={48} className="text-gray-400" />
          <p className="mt-4 text-lg">No bots available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bots.map((bot, idx) => {
            const avatarSrc =
              bot.avatarUrl ??
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                bot.name,
              )}&background=random`;

            return (
              <div
                key={bot.id ?? idx}
                className="flex items-start bg-gray-50 p-4 rounded-lg"
              >
                <img
                  src={avatarSrc}
                  alt={bot.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `https://placehold.co/64x64/f0f0f0/a0a0a0?text=${encodeURIComponent(
                      bot.name.charAt(0),
                    )}`;
                  }}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-gray-900 font-semibold text-md">
                    {bot.name}
                  </h3>
                  <div className="mt-1 flex items-center text-gray-500 text-sm">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span className="ml-1">{formatDate(bot.createdAt)}</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-600 text-sm mr-2">Color:</span>
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: bot.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
