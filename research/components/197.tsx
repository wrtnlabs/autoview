import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4PluginsView = {
                    plugins?: AutoViewInputSubTypes.legacy.v4.LegacyV4Plugin[];
                    next?: number;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Plugin = {
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
            };
            export type LegacyV4TinyFile = {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            };
        }
    }
    export type I18nText = {
        text?: string;
        en?: string;
        ja?: string;
        ko?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformation
  const plugins = value.plugins ?? [];
  const pluginCount = plugins.length;
  const hasNextPage = value.next != null;

  function formatDate(timestamp?: number): string {
    if (!timestamp) return "—";
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Plugins ({pluginCount})
        </h2>
        {hasNextPage && (
          <span className="text-sm text-blue-600">More pages available</span>
        )}
      </header>

      <div className="space-y-4">
        {pluginCount === 0 && (
          <div className="text-center text-gray-500 py-8">
            No plugins to display.
          </div>
        )}

        {plugins.map((plugin, index) => (
          <div
            key={plugin.id ?? index}
            className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {/* Thumbnail or placeholder */}
              {plugin.deskImageUrl || plugin.mobileImageUrl ? (
                <img
                  src={plugin.deskImageUrl ?? plugin.mobileImageUrl!}
                  alt={plugin.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">
                    {plugin.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="min-w-0">
                <div className="text-lg font-medium text-gray-900 truncate">
                  {plugin.name}
                </div>
                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
                  <span
                    className={`px-2 py-0.5 rounded-full text-white ${
                      plugin.state === "active"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {plugin.state === "active" ? "Active" : "Waiting"}
                  </span>
                  <span>Created: {formatDate(plugin.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-wrap items-center space-x-4 text-sm text-gray-700">
              {plugin.botName && <span>Bot: {plugin.botName}</span>}
              {plugin.runRate != null && (
                <span>
                  Run Rate: {(plugin.runRate * 100).toFixed(0)}%
                </span>
              )}
              {plugin.urlWhitelist && (
                <span>URLs: {plugin.urlWhitelist.length}</span>
              )}
              {plugin.profileBot && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  Profile Bot
                </span>
              )}
              {plugin.bright && (
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                  Bright
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
