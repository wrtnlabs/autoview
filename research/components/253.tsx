import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface PluginsView {
        next?: number;
        plugins?: AutoViewInputSubTypes.Plugin[];
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
export type AutoViewInput = AutoViewInputSubTypes.PluginsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugins = value.plugins ?? [];
  const formattedNext = value.next !== undefined ? `Next Page: ${value.next}` : null;

  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '';

  const getStateIcon = (state?: AutoViewInputSubTypes.Plugin['state']): React.ReactNode => {
    if (state === 'active') {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    } else if (state === 'waiting') {
      return <LucideReact.Clock className="text-amber-500" size={16} />;
    }
    return null;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {formattedNext && <div className="mb-4 text-sm text-gray-500">{formattedNext}</div>}

      {plugins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-lg">No plugins available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {plugins.map((plugin, idx) => (
            <li
              key={plugin.id ?? plugin.key ?? idx}
              className="flex items-center p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div className="flex-shrink-0">
                <LucideReact.Box className="text-indigo-500" size={24} />
              </div>
              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold text-gray-900 truncate">
                    {plugin.name}
                  </h3>
                  {getStateIcon(plugin.state)}
                </div>
                <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 space-x-2">
                  {plugin.createdAt && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.Calendar size={14} />
                      <span>{formatDate(plugin.createdAt)}</span>
                    </div>
                  )}
                  {plugin.appearance && (
                    <span className="capitalize">{plugin.appearance}</span>
                  )}
                  {plugin.labelButton && plugin.labelButtonText && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                      {plugin.labelButtonText}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
