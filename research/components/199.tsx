import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4PluginView {
                    plugin?: AutoViewInputSubTypes.legacy.v4.LegacyV4Plugin;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  // Fallback for missing plugin data
  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No plugin data available</span>
      </div>
    );
  }

  // Derived values
  const name = plugin.name;
  const state = plugin.state ?? "waiting";
  const isActive = state === "active";
  const stateIcon = isActive ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.Clock className="text-amber-500" size={16} />
  );
  const stateLabel = isActive ? "Active" : "Waiting";

  const createdAtLabel = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString()
    : "N/A";

  const botName = plugin.botName;
  const colorHex = plugin.color;
  const welcomeText =
    plugin.welcomeI18n.en ??
    plugin.welcomeI18n.text ??
    "No welcome message provided";

  const profileEnabled = Boolean(plugin.profileBot);
  const profileMessage =
    plugin.profileBotMessageI18n.en ??
    plugin.profileBotMessageI18n.text ??
    "No profile message";

  const runRate = plugin.runRate != null
    ? `${Math.round(plugin.runRate * 100)}%`
    : "—";

  const whitelist = plugin.urlWhitelist ?? [];

  const images = [
    { src: plugin.deskImageUrl, alt: "Desktop view" },
    { src: plugin.mobileImageUrl, alt: "Mobile view" },
  ].filter(img => typeof img.src === "string" && img.src.length > 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Details Section */}
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 truncate">{name}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            {stateIcon}
            <span>{stateLabel}</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Created: {createdAtLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.User size={16} className="text-gray-400" />
            <span>Bot: {botName}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Percent size={16} className="text-gray-400" />
            <span>Run Rate: {runRate}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Square size={16} className="text-gray-400" />
            <span>Color:</span>
            <span
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: colorHex }}
              title={colorHex}
            />
            <span className="text-xs text-gray-500">{colorHex}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <LucideReact.MessageCircle size={16} />
              <span>Welcome Message</span>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{welcomeText}</p>
          </div>
          {profileEnabled && (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <LucideReact.UserCheck size={16} />
                <span>Profile Bot Message</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {profileMessage}
              </p>
            </div>
          )}
        </div>

        {/* URL Whitelist */}
        {whitelist.length > 0 && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <LucideReact.Link size={16} />
              <span>URL Whitelist</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {whitelist.map((url, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs truncate"
                  title={url}
                >
                  {url}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Images Section */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-0 pb-[56.25%] relative bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={img.src!}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300/f1f5f9/64748b?text=Image";
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
