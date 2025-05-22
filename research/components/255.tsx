import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace open {
    export type PluginView = {
      plugin?: AutoViewInputSubTypes.Plugin;
    };
  }
  export type Plugin = {
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
    iconButton:
      | "channel"
      | "channel-filled"
      | "chat-bubble-alt"
      | "chat-bubble-alt-filled"
      | "chat-bubble-filled"
      | "chat-lightning-filled"
      | "chat-progress"
      | "chat-progress-filled"
      | "chat-question"
      | "chat-question-filled"
      | "comment"
      | "comment-filled"
      | "communication"
      | "headset"
      | "help-filled"
      | "send-forward"
      | "send-forward-filled"
      | "sms"
      | "sms-filled";
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
  };
  export type ImageFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32">;
    height?: number & tags.Type<"int32">;
    contentType?: string & tags.Pattern<"^image/.*">;
  };
  export type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32">;
    height?: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.open.PluginView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No plugin data available</span>
      </div>
    );
  }

  const createdAt = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString()
    : "N/A";
  const runRate =
    typeof plugin.runRate === "number"
      ? `${(plugin.runRate * 100).toFixed(0)}%`
      : "N/A";
  const whitelistCount = plugin.urlWhitelist?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{plugin.name}</h2>
        {plugin.key && (
          <div
            className="mt-1 text-sm text-gray-500 truncate"
            title={plugin.key}
          >
            {plugin.key}
          </div>
        )}
      </header>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
        <div>
          <dt className="font-medium">Status</dt>
          <dd className="flex items-center mt-1">
            {plugin.state === "active" ? (
              <LucideReact.CheckCircle className="text-green-500" size={16} />
            ) : (
              <LucideReact.Clock className="text-amber-500" size={16} />
            )}
            <span className="ml-2 capitalize">{plugin.state ?? "Unknown"}</span>
          </dd>
        </div>

        <div>
          <dt className="font-medium">Created</dt>
          <dd className="mt-1 flex items-center">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span className="ml-2">{createdAt}</span>
          </dd>
        </div>

        <div>
          <dt className="font-medium">Appearance</dt>
          <dd className="mt-1 capitalize">{plugin.appearance}</dd>
        </div>

        <div>
          <dt className="font-medium">Run Rate</dt>
          <dd className="mt-1">{runRate}</dd>
        </div>

        <div>
          <dt className="font-medium">Whitelisted URLs</dt>
          <dd className="mt-1">
            {whitelistCount} {whitelistCount === 1 ? "URL" : "URLs"}
          </dd>
        </div>

        <div>
          <dt className="font-medium">Button Type</dt>
          <dd className="mt-1 flex items-center space-x-2">
            {plugin.buttonType === "iconButton" && (
              <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">
                {plugin.iconButton}
              </span>
            )}
            {plugin.buttonType === "customImage" && plugin.customImageUrl && (
              <img
                src={plugin.customImageUrl}
                alt="Custom Button"
                className="w-6 h-6 object-cover rounded"
              />
            )}
            {plugin.buttonType === "legacy" && (
              <LucideReact.Circle className="text-gray-500" size={16} />
            )}
            <span className="capitalize">{plugin.buttonType}</span>
          </dd>
        </div>
      </dl>

      {(plugin.customImageUrl ||
        plugin.deskImageUrl ||
        plugin.mobileImageUrl) && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Images</h3>
          <div className="flex items-center gap-6">
            {(["custom", "desk", "mobile"] as const).map((type) => {
              const url =
                type === "custom"
                  ? plugin.customImageUrl
                  : type === "desk"
                    ? plugin.deskImageUrl
                    : plugin.mobileImageUrl;
              return (
                <div key={type} className="flex flex-col items-center">
                  {url ? (
                    <img
                      src={url}
                      alt={`${type} image`}
                      className="w-16 h-16 bg-gray-100 rounded object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://placehold.co/64x64/e2e8f0/1e293b?text=No+Img";
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                      No {type}
                    </div>
                  )}
                  <span className="mt-1 text-xs text-gray-600 capitalize">
                    {type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
