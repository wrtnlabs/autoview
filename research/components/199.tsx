import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4PluginView = {
                    plugin?: AutoViewInputSubTypes.legacy.v4.LegacyV4Plugin;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  if (!plugin) {
    return (
      <div className="p-4 bg-gray-50 text-gray-500 text-center rounded-lg">
        No plugin data available
      </div>
    );
  }

  const statusLabel =
    plugin.state === "active"
      ? "Active"
      : plugin.state === "waiting"
      ? "Waiting"
      : "Unknown";
  const statusClasses =
    plugin.state === "active"
      ? "bg-green-100 text-green-800"
      : plugin.state === "waiting"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";

  const createdDate = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  const runRateLabel =
    typeof plugin.runRate === "number"
      ? `${Math.round(plugin.runRate * 100)}%`
      : null;

  const imageUrl = plugin.deskImageUrl || plugin.mobileImageUrl || "";
  const description =
    plugin.textI18n?.en ||
    plugin.textI18n?.text ||
    plugin.welcomeI18n?.en ||
    plugin.welcomeI18n?.text ||
    "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      className={`max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md border`}
      style={plugin.borderColor ? { borderColor: plugin.borderColor } : undefined}
    >
      {imageUrl && (
        <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
          <img
            src={imageUrl}
            alt={plugin.name}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {plugin.name}
        </h2>
        <p className="text-sm text-gray-600 truncate">{plugin.botName}</p>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${statusClasses}`}
          >
            {statusLabel}
          </span>
          {plugin.bright && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
              Bright
            </span>
          )}
        </div>

        {(description.length > 0) && (
          <p className="mt-3 text-sm text-gray-700 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Created:</span> {createdDate}
          </div>
          {runRateLabel && (
            <div>
              <span className="font-medium">Run Rate:</span> {runRateLabel}
            </div>
          )}
          {plugin.urlWhitelist && plugin.urlWhitelist.length > 0 && (
            <div>
              <span className="font-medium">Whitelist:</span>{" "}
              {plugin.urlWhitelist.length} domains
            </div>
          )}
          {plugin.facebookPixelId && (
            <div>
              <span className="font-medium">Pixel ID:</span>{" "}
              {plugin.facebookPixelId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
