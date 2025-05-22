import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugins = value.plugins ?? [];
  const pluginCount = plugins.length;
  const pageInfo = value.next != null ? `Page: ${value.next}` : null;

  // Format a Unix timestamp (ms) into a human-readable date
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleDateString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown";

  // Extract a welcome message from I18nText
  const getWelcomeMessage = (
    textI18n?: AutoViewInputSubTypes.I18nText,
  ): string =>
    textI18n?.en ?? textI18n?.text ?? textI18n?.ja ?? textI18n?.ko ?? "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (pluginCount === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <p>No plugins available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Plugins ({pluginCount})
        </h2>
        {pageInfo && <span className="text-sm text-gray-500">{pageInfo}</span>}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plugins.map((plugin, idx) => {
          const isActive = plugin.state === "active";
          const welcome = getWelcomeMessage(plugin.welcomeI18n);
          const imageUrl =
            plugin.deskImageUrl ??
            plugin.mobileImageUrl ??
            `https://placehold.co/300x200/f1f5f9/64748b?text=${encodeURIComponent(
              plugin.name,
            )}`;

          return (
            <li
              key={plugin.key ?? plugin.id ?? idx}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="aspect-video bg-gray-100">
                <img
                  src={imageUrl}
                  alt={plugin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/300x200/e2e8f0/1e293b?text=Image";
                  }}
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900 truncate">
                    {plugin.name}
                  </h3>
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {isActive ? "Active" : "Waiting"}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  {isActive ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                    />
                  ) : (
                    <LucideReact.Clock size={16} className="text-amber-500" />
                  )}
                  <span>
                    {isActive ? "Active since" : "Created"}{" "}
                    {formatDate(plugin.createdAt)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <LucideReact.User size={16} className="text-gray-400" />
                  <span>{plugin.botName}</span>
                </div>
                <div className="flex items-center text-sm space-x-2">
                  <span
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: plugin.color }}
                  />
                  <span className="text-gray-600">{plugin.color}</span>
                </div>
                {welcome && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {welcome}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
