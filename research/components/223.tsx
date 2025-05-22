import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

  function formatDate(timestamp?: number) {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Generate a placeholder avatar URL when none is provided
  function getAvatarUrl(bot: AutoViewInputSubTypes.bot.CustomBot) {
    if (bot.avatarUrl) return bot.avatarUrl;
    // Fallback to initials-based avatar with bot.color as background
    const bg = encodeURIComponent(bot.color.replace("#", ""));
    const name = encodeURIComponent(bot.name);
    return `https://ui-avatars.com/api/?name=${name}&background=${bg}&color=fff`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (bots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No bots available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bots.map((bot, idx) => {
        const created = formatDate(bot.createdAt);
        return (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex items-center p-4">
              <div
                className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: `2px solid ${bot.color}` }}
              >
                <img
                  src={getAvatarUrl(bot)}
                  alt={`${bot.name} avatar`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/80x80/e2e8f0/1e293b?text=Bot";
                  }}
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {bot.name}
                </h3>
                {bot.ai && (
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <LucideReact.Cpu size={16} className="mr-1" />
                    <span>AI</span>
                  </div>
                )}
              </div>
            </div>
            {bot.description && (
              <p className="px-4 text-gray-600 text-sm line-clamp-2">
                {bot.description}
              </p>
            )}
            <div className="mt-auto px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              {created ? (
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>{created}</span>
                </div>
              ) : (
                <span>&nbsp;</span>
              )}
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: bot.color }}
                title={`Color: ${bot.color}`}
              />
            </div>
          </div>
        );
      })}
      {typeof value.next === "number" && (
        <div className="col-span-full text-center text-gray-500 mt-4">
          More bots available...
        </div>
      )}
    </div>
  );
}
