import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  const imagePlaceholder =
    "https://placehold.co/300x200/e2e8f0/1e293b?text=Image";

  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No plugin data available</span>
      </div>
    );
  }

  const dateCreated = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const state = plugin.state ?? "waiting";
  const isActive = state === "active";
  const StateIcon = isActive ? LucideReact.CheckCircle : LucideReact.Clock;
  const stateColorClass = isActive ? "text-green-500" : "text-amber-500";

  const runRateDisplay =
    typeof plugin.runRate === "number"
      ? `${Math.round(plugin.runRate * 100)}%`
      : "N/A";

  const whitelistCount = Array.isArray(plugin.urlWhitelist)
    ? plugin.urlWhitelist.length
    : 0;

  const deskSrc = plugin.deskImageUrl || imagePlaceholder;
  const mobileSrc = plugin.mobileImageUrl || imagePlaceholder;

  const welcomeText =
    plugin.welcomeI18n?.text ||
    plugin.welcomeI18n?.en ||
    "No welcome message set";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{plugin.name}</h2>
        <div
          className={`flex items-center text-sm font-medium ${stateColorClass}`}
        >
          <StateIcon size={16} className={`mr-1 ${stateColorClass}`} />
          <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
        </div>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.User size={16} className="mr-1" />
            <span>{plugin.botName}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span>Created: {dateCreated}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="mr-1">Color:</span>
            <span
              className="w-4 h-4 border rounded"
              style={{ backgroundColor: plugin.color }}
            />
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="mr-1">Run Rate:</span>
            <span>{runRateDisplay}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.Link size={16} className="mr-1" />
            <span>{whitelistCount} URLs</span>
          </div>
        </div>
        <div className="space-y-2 text-gray-700 text-sm">
          <div>
            <span className="font-medium">Welcome Message:</span>{" "}
            <span>{welcomeText}</span>
          </div>
          {plugin.profileBot && (
            <div className="flex items-center text-green-600 text-sm">
              <LucideReact.CheckCircle size={16} className="mr-1" />
              <span>Profile Bot Enabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={deskSrc}
          alt="Desktop Preview"
          className="w-full h-32 object-cover rounded"
          onError={(e) => {
            e.currentTarget.src = imagePlaceholder;
          }}
        />
        <img
          src={mobileSrc}
          alt="Mobile Preview"
          className="w-full h-32 object-cover rounded"
          onError={(e) => {
            e.currentTarget.src = imagePlaceholder;
          }}
        />
      </div>
    </div>
  );
}
