import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.PluginsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugins = value.plugins ?? [];
  const totalPlugins = plugins.length;
  const hasMore = typeof value.next === 'number';

  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—';

  const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

  const formatRate = (rate?: number): string =>
    typeof rate === 'number' ? `${(rate * 100).toFixed(0)}%` : '—';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Plugins ({totalPlugins})
        </h2>
        {hasMore && (
          <span className="text-sm text-blue-600">More available…</span>
        )}
      </div>

      {/* Plugin Cards */}
      <div className="space-y-4">
        {plugins.map((plugin, idx) => (
          <div
            key={plugin.id ?? plugin.key ?? idx}
            className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white rounded-lg shadow"
          >
            {/* Optional thumbnail */}
            {plugin.customImageUrl && (
              <img
                src={plugin.customImageUrl}
                alt={plugin.name}
                className="w-16 h-16 object-cover rounded mr-4 mb-2 sm:mb-0"
              />
            )}
            <div className="flex-1 min-w-0">
              {/* Name & State */}
              <div className="flex items-center mb-1">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {plugin.name}
                </h3>
                <span
                  className={`ml-3 text-xs font-semibold uppercase px-2 py-1 rounded-full ${
                    plugin.state === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {plugin.state === 'active' ? 'Active' : 'Waiting'}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Created:</span>{' '}
                  {formatDate(plugin.createdAt)}
                </div>
                <div>
                  <span className="font-semibold">Appearance:</span>{' '}
                  {capitalize(plugin.appearance)}
                </div>
                <div>
                  <span className="font-semibold">Button Type:</span>{' '}
                  {capitalize(plugin.buttonType)}
                </div>
                <div>
                  <span className="font-semibold">Label Btn:</span>{' '}
                  {plugin.labelButton
                    ? plugin.labelButtonText ?? 'Yes'
                    : 'No'}
                </div>
                <div>
                  <span className="font-semibold">Run Rate:</span>{' '}
                  {formatRate(plugin.runRate)}
                </div>
                <div>
                  <span className="font-semibold">URLs Allowed:</span>{' '}
                  {plugin.urlWhitelist?.length ?? 0}
                </div>
              </div>
            </div>
          </div>
        ))}
        {totalPlugins === 0 && (
          <p className="text-center text-gray-500">No plugins to display.</p>
        )}
      </div>
    </div>
  );
}
