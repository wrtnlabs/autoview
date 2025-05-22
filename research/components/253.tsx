import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type PluginsView = {
    next?: number;
    plugins?: AutoViewInputSubTypes.Plugin[];
  };
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
export type AutoViewInput = AutoViewInputSubTypes.PluginsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugins = value.plugins ?? [];
  const pluginCount = plugins.length;
  const hasMore = typeof value.next === "number";
  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Plugins ({pluginCount})
        </h2>
        {hasMore && (
          <span className="text-sm text-blue-600">More available</span>
        )}
      </div>

      {pluginCount === 0 ? (
        <div className="flex items-center justify-center py-6 text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No plugins to display</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {plugins.map((plugin, idx) => {
            const stateIcon =
              plugin.state === "active" ? (
                <LucideReact.CheckCircle size={16} className="text-green-500" />
              ) : (
                <LucideReact.Clock size={16} className="text-amber-500" />
              );

            const appearanceIcon =
              plugin.appearance === "light" ? (
                <LucideReact.Sun size={16} className="text-yellow-400" />
              ) : plugin.appearance === "dark" ? (
                <LucideReact.Moon size={16} className="text-gray-600" />
              ) : (
                <LucideReact.Monitor size={16} className="text-gray-500" />
              );

            const percentRunRate =
              typeof plugin.runRate === "number"
                ? `${Math.round(plugin.runRate * 100)}%`
                : null;

            return (
              <li
                key={plugin.id ?? plugin.key ?? idx}
                className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center space-x-3">
                  {plugin.customImageUrl ? (
                    <img
                      src={plugin.customImageUrl}
                      alt={`${plugin.name} image`}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://placehold.co/48x48/e2e8f0/1e293b?text=?";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <LucideReact.Box size={16} className="text-gray-400" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-md font-medium text-gray-800">
                        {plugin.name}
                      </h3>
                      <span className="flex items-center space-x-1">
                        {stateIcon}
                        <span className="text-sm text-gray-600 capitalize">
                          {plugin.state ?? "unknown"}
                        </span>
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
                      <LucideReact.Calendar size={14} />
                      <span>{formatDate(plugin.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 sm:flex sm:items-center sm:space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    {appearanceIcon}
                    <span className="capitalize">{plugin.appearance}</span>
                  </div>

                  {percentRunRate && (
                    <div className="w-24">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-blue-500"
                          style={{ width: percentRunRate }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {percentRunRate}
                      </span>
                    </div>
                  )}

                  {plugin.urlWhitelist && plugin.urlWhitelist.length > 0 && (
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <LucideReact.Link size={14} />
                      <span>{plugin.urlWhitelist.length} domains</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
