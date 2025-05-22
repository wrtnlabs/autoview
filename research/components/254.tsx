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
  // Helper: capitalize first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  // Convert hyphen/underscore delimited icon name to PascalCase component name
  const pascalCase = (s: string) =>
    s
      .split(/[-_]/)
      .map((w) => capitalize(w))
      .join("");
  // Format timestamp to human-readable date
  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "–";
  // Placeholder generator for images
  const placeholderUrl = (label: string) =>
    `https://placehold.co/100x100/e2e8f0/1e293b?text=${encodeURIComponent(label)}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <p className="mt-2 text-gray-500">No plugin data available</p>
      </div>
    );
  }

  // Prepare status icon
  const StatusIcon =
    plugin.state === "active" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.Clock className="text-amber-500" size={16} />
    );
  // Prepare dynamic iconButton component
  let IconButton: JSX.Element | null = null;
  if (plugin.iconButton) {
    const name = pascalCase(plugin.iconButton);
    const Component = (LucideReact as any)[name];
    if (Component)
      IconButton = <Component className="text-gray-500" size={16} />;
  }

  // Collect image URLs
  const images: { label: string; src?: string }[] = [
    { label: "Custom Image", src: plugin.customImageUrl },
    { label: "Desktop Image", src: plugin.deskImageUrl },
    { label: "Mobile Image", src: plugin.mobileImageUrl },
  ].filter((img) => img.src);

  return (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {plugin.name}
        </h2>
        <div className="flex items-center gap-1">
          {StatusIcon}
          <span className="text-sm text-gray-600">
            {capitalize(plugin.state || "waiting")}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-2 grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{formatDate(plugin.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span>{capitalize(plugin.appearance)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Box size={16} className="text-gray-400" />
          <span>{capitalize(plugin.buttonType)}</span>
        </div>
        {IconButton && (
          <div className="flex items-center gap-1">
            {IconButton}
            <span>{pascalCase(plugin.iconButton!)}</span>
          </div>
        )}
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {images.map(({ label, src }) => (
            <div
              key={label}
              className="aspect-square w-full overflow-hidden rounded bg-gray-100"
            >
              <img
                src={src}
                alt={label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    placeholderUrl(label);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
