import { tags } from "typia";
import React from "react";
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
      <div className="p-4 bg-gray-50 text-gray-500 text-center rounded">
        No plugin data available.
      </div>
    );
  }

  const stateLabel = plugin.state
    ? plugin.state.charAt(0).toUpperCase() + plugin.state.slice(1)
    : "Unknown";
  const stateClasses =
    plugin.state === "active"
      ? "text-green-800 bg-green-100"
      : plugin.state === "waiting"
      ? "text-yellow-800 bg-yellow-100"
      : "text-gray-800 bg-gray-100";

  const createdAt = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString()
    : "—";

  const appearanceLabel =
    plugin.appearance.charAt(0).toUpperCase() + plugin.appearance.slice(1);

  const buttonTypeLabel = (() => {
    switch (plugin.buttonType) {
      case "customImage":
        return "Custom Image";
      case "iconButton":
        return "Icon Button";
      case "legacy":
      default:
        return plugin.buttonType.charAt(0).toUpperCase() +
               plugin.buttonType.slice(1);
    }
  })();

  const runRatePercent =
    plugin.runRate != null ? `${Math.round(plugin.runRate * 100)}%` : "—";

  const urlWhitelist = plugin.urlWhitelist;
  const urlDisplay =
    urlWhitelist && urlWhitelist.length > 0
      ? urlWhitelist.length > 3
        ? `${urlWhitelist.slice(0, 3).join(", ")}… (+${urlWhitelist.length - 3} more)`
        : urlWhitelist.join(", ")
      : "—";

  const labelText =
    plugin.labelButton && plugin.labelButtonText
      ? plugin.labelButtonText
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {plugin.name}
        </h2>
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full ${stateClasses}`}
        >
          {stateLabel}
        </span>
      </div>

      <div className="text-sm text-gray-500 space-x-4">
        {plugin.channelId && <span>Channel: {plugin.channelId}</span>}
        <span>Created: {createdAt}</span>
      </div>

      {plugin.customImageUrl && (
        <div className="w-full h-32 overflow-hidden rounded-md">
          <img
            src={plugin.customImageUrl}
            alt={`${plugin.name} preview`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt className="font-medium text-gray-600">Appearance</dt>
          <dd className="text-gray-800">{appearanceLabel}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">Button Type</dt>
          <dd className="text-gray-800">{buttonTypeLabel}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">Icon</dt>
          <dd className="text-gray-800">{plugin.iconButton}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">Run Rate</dt>
          <dd className="text-gray-800">{runRatePercent}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium text-gray-600">URL Whitelist</dt>
          <dd className="text-gray-800 truncate">{urlDisplay}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">Label Button Text</dt>
          <dd className="text-gray-800">{labelText}</dd>
        </div>
      </dl>
    </div>
  );
}
