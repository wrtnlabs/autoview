import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type BotsView = {
        next?: number;
        bots?: AutoViewInputSubTypes.bot.CustomBot[];
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
export type AutoViewInput = AutoViewInputSubTypes.BotsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const bots = value.bots ?? [];
  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      : "";
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {bots.length === 0 ? (
        <p className="text-gray-500 text-center">No bots available.</p>
      ) : (
        <ul className="space-y-4">
          {bots.map((bot, idx) => (
            <li key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-gray-500 text-lg font-semibold">
                {bot.avatarUrl ? (
                  <img src={bot.avatarUrl} alt={bot.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(bot.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h3 className="text-gray-900 font-medium truncate">{bot.name}</h3>
                  {bot.ai && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      AI
                    </span>
                  )}
                </div>
                {bot.description && (
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">{bot.description}</p>
                )}
                <div className="flex items-center space-x-2 mt-1 text-gray-500 text-xs">
                  {bot.createdAt && <span>Created: {formatDate(bot.createdAt)}</span>}
                  <span className="inline-flex items-center">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: bot.color }}></span>
                    <span className="ml-1">Color</span>
                  </span>
                  {bot.nameDescI18nMap && Object.keys(bot.nameDescI18nMap).length > 0 && (
                    <span>{Object.keys(bot.nameDescI18nMap).length} locales</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Next page indicator */}
      {value.next !== undefined && (
        <p className="mt-4 text-gray-600 text-sm">Next Page: {value.next}</p>
      )}
    </div>
  );
}
