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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  // If no plugin data, show placeholder
  if (!plugin) {
    return (
      <div className="p-4 bg-white rounded-md shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No plugin data available</span>
      </div>
    );
  }

  const {
    name,
    state,
    appearance,
    buttonType,
    iconButton,
    labelButton,
    labelButtonText,
    urlWhitelist,
    runRate,
    createdAt,
    customImageUrl,
    deskImageUrl,
    mobileImageUrl,
  } = plugin;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;

  const runRatePercent =
    runRate !== undefined ? `${Math.round(runRate * 100)}%` : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <div className="flex items-center">
          {state === "active" ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={20}
              aria-label="Active"
            />
          ) : (
            <LucideReact.Clock
              className="text-amber-500"
              size={20}
              aria-label="Waiting"
            />
          )}
          <span className="ml-1 text-sm text-gray-600 capitalize">
            {state}
          </span>
        </div>
      </div>

      {/* Created Date */}
      {formattedDate && (
        <div className="mt-1 text-sm text-gray-500">{formattedDate}</div>
      )}

      {/* Key Properties */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium text-gray-600">Appearance:</span>{" "}
          <span className="capitalize">{appearance}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Button Type:</span>{" "}
          <span className="capitalize">{buttonType}</span>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-600">Icon Button:</span>{" "}
          <span className="ml-1">{iconButton}</span>
        </div>
        {typeof labelButton === "boolean" && (
          <div>
            <span className="font-medium text-gray-600">Label Button:</span>{" "}
            <span>{labelButton ? "Yes" : "No"}</span>
          </div>
        )}
        {labelButtonText && (
          <div className="col-span-2 truncate">
            <span className="font-medium text-gray-600">Label Text:</span>{" "}
            <span className="ml-1">{labelButtonText}</span>
          </div>
        )}
        {runRatePercent && (
          <div>
            <span className="font-medium text-gray-600">Run Rate:</span>{" "}
            <span>{runRatePercent}</span>
          </div>
        )}
        {urlWhitelist && urlWhitelist.length > 0 && (
          <div className="col-span-2">
            <span className="font-medium text-gray-600">URL Whitelist:</span>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-xs text-gray-700">
              {urlWhitelist.map((u) => (
                <li key={u} className="truncate">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Image Previews */}
      {(customImageUrl || deskImageUrl || mobileImageUrl) && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {customImageUrl && (
            <div>
              <div className="text-xs text-gray-600 mb-1">Custom</div>
              <img
                src={customImageUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/80x80?text=Image";
                }}
                alt="Custom"
                className="w-full h-20 object-cover rounded"
              />
            </div>
          )}
          {deskImageUrl && (
            <div>
              <div className="text-xs text-gray-600 mb-1">Desktop</div>
              <img
                src={deskImageUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/80x80?text=Image";
                }}
                alt="Desktop"
                className="w-full h-20 object-cover rounded"
              />
            </div>
          )}
          {mobileImageUrl && (
            <div>
              <div className="text-xs text-gray-600 mb-1">Mobile</div>
              <img
                src={mobileImageUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/80x80?text=Image";
                }}
                alt="Mobile"
                className="w-full h-20 object-cover rounded"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
