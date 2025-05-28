import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export interface PluginView {
            plugin?: AutoViewInputSubTypes.Plugin;
        }
    }
    export interface Plugin {
        id?: string;
        key?: string & tags.Format<"uuid">;
        channelId?: string;
        state?: "waiting" | "active";
        name: string;
        createdAt?: number;
        appearance: "light" | "dark" | "system";
        labelButton?: boolean;
        labelButtonText?: string;
        labelButtonTextI18nMap?: {
            [key: string]: string;
        };
        buttonType: "legacy" | "customImage" | "iconButton";
        iconButton: "channel" | "channel-filled" | "chat-bubble-alt" | "chat-bubble-alt-filled" | "chat-bubble-filled" | "chat-lightning-filled" | "chat-progress" | "chat-progress-filled" | "chat-question" | "chat-question-filled" | "comment" | "comment-filled" | "communication" | "headset" | "help-filled" | "send-forward" | "send-forward-filled" | "sms" | "sms-filled";
        customImage?: AutoViewInputSubTypes.ImageFile;
        deskImage?: AutoViewInputSubTypes.TinyFile;
        deskMarginX?: number & tags.Type<"int32">;
        deskMarginY?: number & tags.Type<"int32">;
        deskHideButton?: boolean;
        deskPosition?: "left" | "right";
        mobileImage?: AutoViewInputSubTypes.TinyFile;
        mobileMarginX?: number & tags.Type<"int32">;
        mobileMarginY?: number & tags.Type<"int32">;
        mobilePosition?: "left" | "right";
        mobileHideButton?: boolean;
        mobileBubblePosition?: "top" | "bottom";
        urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
        runRate?: number & tags.Minimum<0> & tags.Maximum<1>;
        facebookPixelId?: string;
        customImageUrl?: string;
        deskImageUrl?: string;
        mobileImageUrl?: string;
        validLabelButtonText?: boolean;
        validLabelButtonTextI18nMap?: boolean;
    }
    export interface ImageFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
        contentType?: string & tags.Pattern<"^image/.*">;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.open.PluginView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const plugin = value.plugin;
  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No plugin data available</span>
      </div>
    );
  }

  // Helper to transform kebab-case to PascalCase for icon lookup
  function toPascalCase(str: string): string {
    return str
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // State display
  const stateLabel =
    plugin.state === "active"
      ? "Active"
      : plugin.state === "waiting"
      ? "Waiting"
      : "Unknown";
  const StateIcon =
    plugin.state === "active"
      ? LucideReact.CheckCircle
      : plugin.state === "waiting"
      ? LucideReact.Clock
      : LucideReact.AlertCircle;
  const stateColor =
    plugin.state === "active"
      ? "text-green-500"
      : plugin.state === "waiting"
      ? "text-amber-500"
      : "text-gray-400";

  // Created date formatting
  const createdDate = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString()
    : "—";

  // Run rate as percentage
  const runRatePercent =
    plugin.runRate != null
      ? `${Math.round(plugin.runRate * 100)}%`
      : "—";

  // URL whitelist items
  const whitelistItems = plugin.urlWhitelist ?? [];

  // Image source resolver
  const resolveImage = (
    file?: AutoViewInputSubTypes.ImageFile | AutoViewInputSubTypes.TinyFile,
    url?: string
  ): string | null => {
    if (url) return url;
    if (file) {
      const bucket = (file as any).bucket;
      const key = (file as any).key;
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    }
    return null;
  };

  const customImgSrc = resolveImage(
    plugin.customImage,
    plugin.customImageUrl
  );
  const deskImgSrc = resolveImage(
    plugin.deskImage,
    plugin.deskImageUrl
  );
  const mobileImgSrc = resolveImage(
    plugin.mobileImage,
    plugin.mobileImageUrl
  );

  // Appearance mapping
  const appearanceLabels = {
    light: "Light",
    dark: "Dark",
    system: "System",
  } as const;
  const appearanceLabel = appearanceLabels[plugin.appearance];
  const AppearanceIcon =
    plugin.appearance === "light"
      ? LucideReact.Sun
      : plugin.appearance === "dark"
      ? LucideReact.Moon
      : LucideReact.Monitor;

  // Button type mapping
  const buttonTypeLabels = {
    legacy: "Legacy",
    customImage: "Custom Image",
    iconButton: "Icon Button",
  } as const;
  const buttonTypeLabel = buttonTypeLabels[plugin.buttonType];

  // Label button text
  const labelText = plugin.labelButton
    ? plugin.labelButtonText || "Label"
    : null;

  // Dynamic icon button component (typed as any to accept Lucide props)
  const iconKey = toPascalCase(plugin.iconButton) as keyof typeof LucideReact;
  const IconButtonComponent = LucideReact[
    iconKey
  ] as React.ComponentType<any> | undefined;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {plugin.name}
        </h2>
        <div className={`flex items-center ${stateColor}`}>
          <StateIcon size={16} className="mr-1" />
          <span className="text-sm">{stateLabel}</span>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center truncate">
          <LucideReact.Calendar size={16} className="mr-1 text-gray-400" />
          <span>Created:</span>
          <span className="ml-1">{createdDate}</span>
        </div>
        <div className="flex items-center truncate">
          <AppearanceIcon size={16} className="mr-1 text-gray-400" />
          <span>Appearance:</span>
          <span className="ml-1">{appearanceLabel}</span>
        </div>
        <div className="flex items-center truncate">
          <LucideReact.Layers size={16} className="mr-1 text-gray-400" />
          <span>Button Type:</span>
          <span className="ml-1">{buttonTypeLabel}</span>
        </div>
        {labelText && (
          <div className="flex items-center truncate">
            <LucideReact.Tag size={16} className="mr-1 text-gray-400" />
            <span>Label:</span>
            <span className="ml-1">{labelText}</span>
          </div>
        )}
        <div className="flex items-center truncate">
          <LucideReact.BarChart2 size={16} className="mr-1 text-gray-400" />
          <span>Run Rate:</span>
          <span className="ml-1">{runRatePercent}</span>
        </div>
      </div>

      {/* URL Whitelist */}
      {whitelistItems.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.Link size={16} className="mr-1 text-gray-400" />
            <span>Allowed URLs:</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
            {whitelistItems.map((url, idx) => (
              <li key={idx} className="truncate">
                {url}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Image Previews */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Custom Image", src: customImgSrc },
          { label: "Desktop Image", src: deskImgSrc },
          { label: "Mobile Image", src: mobileImgSrc },
        ]
          .filter((item) => item.src)
          .map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">
                {item.label}
              </span>
              <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                <img
                  src={item.src!}
                  alt={item.label}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://placehold.co/150x150/e2e8f0/1e293b?text=Image")
                  }
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Icon Button Preview */}
      <div className="flex items-center text-sm text-gray-600">
        <span>Icon Button:</span>
        {IconButtonComponent ? (
          <IconButtonComponent size={16} className="ml-1 text-gray-500" />
        ) : (
          <span className="ml-1 text-gray-400">N/A</span>
        )}
      </div>
    </div>
  );
}
