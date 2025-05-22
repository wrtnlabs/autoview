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
  const plugin: AutoViewInputSubTypes.legacy.v4.LegacyV4Plugin | undefined =
    value.plugin;

  // Fallback UI when there's no plugin data
  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No plugin data available</span>
      </div>
    );
  }

  // Format creation date
  const createdDate = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown";

  // Determine status icon and color
  let statusIcon: JSX.Element;
  switch (plugin.state) {
    case "active":
      statusIcon = (
        <LucideReact.CheckCircle className="text-green-500" size={16} />
      );
      break;
    default:
      statusIcon = <LucideReact.Clock className="text-amber-500" size={16} />;
      break;
  }
  const statusText = plugin.state ?? "waiting";

  // Prepare welcome message (I18nText)
  const welcomeText =
    plugin.welcomeI18n?.text ??
    plugin.welcomeI18n?.en ??
    plugin.welcomeI18n?.ja ??
    plugin.welcomeI18n?.ko ??
    "—";

  // Image URL with placeholder fallback
  const placeholderImage = `https://placehold.co/400x300/f1f5f9/64748b?text=${encodeURIComponent(
    plugin.name || "Plugin",
  )}`;
  const initialImage = plugin.deskImageUrl || placeholderImage;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-5 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="md:flex">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={initialImage}
              alt={`${plugin.name} image`}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          {/* Title & Color */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 truncate">
              {plugin.name}
            </h2>
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full border"
                style={{ backgroundColor: plugin.color }}
              />
            </div>
          </div>

          {/* Welcome Message */}
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {welcomeText}
          </p>

          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600 gap-4">
            <div className="flex items-center">
              {statusIcon}
              <span className="ml-1 capitalize">{statusText}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.Calendar className="text-gray-400" size={16} />
              <span className="ml-1">{createdDate}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.User className="text-gray-400" size={16} />
              <span className="ml-1 truncate">{plugin.botName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
