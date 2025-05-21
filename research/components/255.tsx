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
    // 3. Return the React element for empty state.
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
        No plugin data available.
      </div>
    );
  }
  const {
    name,
    state,
    appearance,
    createdAt,
    buttonType,
    iconButton,
    labelButton,
    labelButtonText,
    runRate,
    urlWhitelist,
    customImageUrl,
    deskImageUrl,
    mobileImageUrl,
  } = plugin;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : 'N/A';
  const runRatePercent =
    typeof runRate === 'number' ? `${Math.round(runRate * 100)}%` : 'N/A';
  const whitelistCount = Array.isArray(urlWhitelist)
    ? urlWhitelist.length
    : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      <header>
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Created: {formattedDate}
        </p>
      </header>

      <section className="flex flex-wrap gap-2">
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${
            state === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {state ? state.charAt(0).toUpperCase() + state.slice(1) : 'Unknown'}
        </span>
        <span className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded">
          Appearance: {appearance.charAt(0).toUpperCase() + appearance.slice(1)}
        </span>
        <span className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded">
          Button: {buttonType}
        </span>
        <span className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded">
          Icon: {iconButton}
        </span>
        <span className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded">
          Run Rate: {runRatePercent}
        </span>
        <span className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded">
          Whitelist: {whitelistCount}
        </span>
      </section>

      {labelButton && labelButtonText && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700">
            Button Label
          </h3>
          <p className="mt-1 text-gray-800 truncate">
            {labelButtonText}
          </p>
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {customImageUrl && (
          <div>
            <h4 className="text-sm text-gray-600">Custom Image</h4>
            <img
              src={customImageUrl}
              alt="Custom"
              className="mt-1 w-full h-auto rounded border"
            />
          </div>
        )}
        {deskImageUrl && (
          <div>
            <h4 className="text-sm text-gray-600">Desktop Image</h4>
            <img
              src={deskImageUrl}
              alt="Desktop"
              className="mt-1 w-full h-auto rounded border"
            />
          </div>
        )}
        {mobileImageUrl && (
          <div>
            <h4 className="text-sm text-gray-600">Mobile Image</h4>
            <img
              src={mobileImageUrl}
              alt="Mobile"
              className="mt-1 w-full h-auto rounded border"
            />
          </div>
        )}
      </section>
    </article>
  );
}
