import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  if (!plugin) {
    return (
      <div className="p-4 text-gray-500 italic">
        No Plugin Data Available
      </div>
    );
  }

  const {
    name,
    state,
    createdAt,
    color,
    botName,
    welcomeI18n,
    deskImageUrl,
    mobileImageUrl,
    runRate,
  } = plugin;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  const statusDisplay =
    state === 'active' ? 'Active' :
    state === 'waiting' ? 'Waiting' :
    'Unknown';

  const statusColorClass =
    state === 'active'
      ? 'bg-green-100 text-green-800'
      : state === 'waiting'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-100 text-gray-800';

  const welcomeText =
    welcomeI18n?.text ||
    welcomeI18n?.en ||
    welcomeI18n?.ja ||
    welcomeI18n?.ko ||
    '';

  const runRateDisplay =
    runRate !== undefined ? `${(runRate * 100).toFixed(0)}%` : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      className="border-l-4 p-4 bg-white rounded-lg shadow-md"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {name}
        </h2>
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColorClass}`}
        >
          {statusDisplay}
        </span>
      </div>

      <div className="mt-1 text-sm text-gray-600">
        <span>Bot: {botName}</span>
        <span className="mx-2">|</span>
        <span>Created: {formattedDate}</span>
      </div>

      {(deskImageUrl || mobileImageUrl) && (
        <img
          src={deskImageUrl || mobileImageUrl}
          alt={name}
          className="w-full h-32 object-cover rounded mt-4"
        />
      )}

      {welcomeText && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-2">
          {welcomeText}
        </p>
      )}

      {runRateDisplay && (
        <div className="mt-3 text-sm text-gray-600">
          Run Rate:{' '}
          <span className="font-medium text-gray-800">
            {runRateDisplay}
          </span>
        </div>
      )}
    </div>
  );
}
