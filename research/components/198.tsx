import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4PluginView {
                    plugin?: AutoViewInputSubTypes.legacy.v4.LegacyV4Plugin;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Plugin {
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
            }
            export interface LegacyV4TinyFile {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            }
        }
    }
    export interface I18nText {
        text?: string;
        en?: string;
        ja?: string;
        ko?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4PluginView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const plugin = value.plugin;
  if (!plugin) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <p className="mt-2">No plugin data available</p>
      </div>
    );
  }

  const formattedDate = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString()
    : 'N/A';

  const welcomeText =
    plugin.welcomeI18n?.text ?? plugin.welcomeI18n?.en ?? '';

  const profileMessage =
    plugin.profileBotMessageI18n?.text ??
    plugin.profileBotMessageI18n?.en ??
    '';

  const runRatePercent =
    plugin.runRate != null ? Math.round(plugin.runRate * 100) : null;

  const urlCount = plugin.urlWhitelist?.length ?? 0;

  // Image error handlers
  const handleErrorDesk = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      'https://placehold.co/400x300/f1f5f9/64748b?text=Desktop+Image';
  };
  const handleErrorMobile = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      'https://placehold.co/200x300/f1f5f9/64748b?text=Mobile+Image';
  };

  // State icon
  const stateIcon =
    plugin.state === 'active' ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.Clock className="text-amber-500" size={16} />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {plugin.name}
        </h2>
        <div className="flex items-center gap-1">
          {stateIcon}
          <span className="text-sm text-gray-600 capitalize">
            {plugin.state ?? 'Unknown'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LucideReact.Calendar size={16} className="text-gray-500" />
            <span>Created: {formattedDate}</span>
          </div>

          {plugin.botName && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <LucideReact.User size={16} className="text-gray-500" />
              <span>{plugin.botName}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Color:</span>
            <span
              className="inline-block w-4 h-4 rounded border"
              style={{ backgroundColor: plugin.color }}
            />
            <span>{plugin.color}</span>
          </div>

          {runRatePercent != null && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <LucideReact.BarChart2 size={16} className="text-gray-500" />
              <span>Run Rate: {runRatePercent}%</span>
            </div>
          )}

          {urlCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <LucideReact.Link size={16} className="text-gray-500" />
              <span>Whitelist URLs: {urlCount}</span>
            </div>
          )}

          {welcomeText && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Welcome Message
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {welcomeText}
              </p>
            </div>
          )}

          {plugin.profileBot != null && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Profile Bot:</span>
              {plugin.profileBot ? (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                />
              ) : (
                <LucideReact.XCircle className="text-red-500" size={16} />
              )}
            </div>
          )}

          {profileMessage && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Profile Bot Message
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {profileMessage}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Images */}
        <div className="space-y-4">
          {plugin.deskImageUrl && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Desktop Image
              </h3>
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden rounded">
                <img
                  src={plugin.deskImageUrl}
                  alt="Desktop preview"
                  className="object-cover w-full h-full"
                  onError={handleErrorDesk}
                />
              </div>
            </div>
          )}

          {plugin.mobileImageUrl && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Mobile Image
              </h3>
              <div className="aspect-[2/3] w-full bg-gray-100 overflow-hidden rounded">
                <img
                  src={plugin.mobileImageUrl}
                  alt="Mobile preview"
                  className="object-cover w-full h-full"
                  onError={handleErrorMobile}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
