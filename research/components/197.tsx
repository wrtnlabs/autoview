import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4PluginsView {
                    plugins?: AutoViewInputSubTypes.legacy.v4.LegacyV4Plugin[];
                    next?: number;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Plugin {
                id?: string;
                key?: string & tags.Format<"uuid">;
                channelId?: string;
                state?: "waiting" | "active";
                name: string;
                createdAt?: number;
                color: string & tags.Default<"#123456">;
                botName: string;
                textI18n?: AutoViewInputSubTypes.I18nText;
                labelButton?: boolean;
                deskImage?: AutoViewInputSubTypes.legacy.v4.LegacyV4TinyFile;
                deskMarginX?: number & tags.Type<"int32">;
                deskMarginY?: number & tags.Type<"int32">;
                deskPosition?: "left" | "right";
                mobileImage?: AutoViewInputSubTypes.legacy.v4.LegacyV4TinyFile;
                mobileMarginX?: number & tags.Type<"int32">;
                mobileMarginY?: number & tags.Type<"int32">;
                mobilePosition?: "left" | "right";
                mobileHideButton?: boolean;
                mobileBubblePosition?: "top" | "bottom";
                accessSecret?: string;
                welcomeI18n: AutoViewInputSubTypes.I18nText;
                profileBot?: boolean;
                profileBotMessageI18n: AutoViewInputSubTypes.I18nText;
                profileBotSchemaIds?: string[];
                urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
                runRate?: number & tags.Minimum<0> & tags.Maximum<1>;
                facebookPixelId?: string;
                bright?: boolean;
                borderColor?: string;
                gradientColor?: string;
                textColor?: string;
                deskImageUrl?: string;
                mobileImageUrl?: string;
                /**
                 * @deprecated
                */
                showPoweredBy?: boolean;
            }
            export interface LegacyV4TinyFile {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            }
        }
    }
    export interface I18nText {
        text?: string;
        en?: string;
        ja?: string;
        ko?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugins = value.plugins ?? [];
  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {plugins.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-4 text-lg">No plugins available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plugins.map((plugin) => {
            const description =
              plugin.welcomeI18n?.text ??
              plugin.welcomeI18n?.en ??
              plugin.welcomeI18n?.ja ??
              plugin.welcomeI18n?.ko ??
              "";
            const profileMessage =
              plugin.profileBotMessageI18n?.text ??
              plugin.profileBotMessageI18n?.en ??
              plugin.profileBotMessageI18n?.ja ??
              plugin.profileBotMessageI18n?.ko ??
              "";
            const key = plugin.key ?? plugin.id ?? plugin.name;

            return (
              <div
                key={key}
                className="p-4 bg-white rounded-lg shadow transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LucideReact.Puzzle size={20} color={plugin.color} />
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {plugin.name}
                    </h3>
                  </div>
                  {plugin.state === "active" ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                    />
                  ) : plugin.state === "waiting" ? (
                    <LucideReact.Clock
                      size={16}
                      className="text-amber-500"
                    />
                  ) : null}
                </div>

                {description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {description}
                  </p>
                )}
                {plugin.profileBot && profileMessage && (
                  <p className="mt-1 text-xs italic text-gray-500 line-clamp-1">
                    {profileMessage}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 gap-2">
                  {plugin.createdAt && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar size={14} />
                      <span>{formatDate(plugin.createdAt)}</span>
                    </div>
                  )}
                  {plugin.runRate !== undefined && (
                    <div className="flex items-center gap-1">
                      <LucideReact.BarChart2 size={14} />
                      <span>{Math.round(plugin.runRate * 100)}%</span>
                    </div>
                  )}
                  {plugin.urlWhitelist && plugin.urlWhitelist.length > 0 && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Link size={14} />
                      <span>{plugin.urlWhitelist.length} URLs</span>
                    </div>
                  )}
                  {plugin.profileBot && (
                    <div className="flex items-center gap-1">
                      <LucideReact.User size={14} />
                      <span>Profile Bot</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {value.next !== undefined && (
        <div className="text-sm text-gray-500">
          Next page index: {value.next}
        </div>
      )}
    </div>
  );
}
