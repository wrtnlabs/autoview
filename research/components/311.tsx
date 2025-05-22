import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Configuration object of the webhook
   *
   * @title Webhook Configuration
   */
  export type webhook_config = {
    url?: AutoViewInputSubTypes.webhook_config_url;
    content_type?: AutoViewInputSubTypes.webhook_config_content_type;
    secret?: AutoViewInputSubTypes.webhook_config_secret;
    insecure_ssl?: AutoViewInputSubTypes.webhook_config_insecure_ssl;
  };
  /**
   * The URL to which the payloads will be delivered.
   */
  export type webhook_config_url = string;
  /**
   * The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.
   */
  export type webhook_config_content_type = string;
  /**
   * If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers).
   */
  export type webhook_config_secret = string;
  export type webhook_config_insecure_ssl = string | number;
}
export type AutoViewInput = AutoViewInputSubTypes.webhook_config;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation / derived values
  const insecureSslEnabled =
    value.insecure_ssl !== undefined &&
    (value.insecure_ssl === "1" || value.insecure_ssl === 1);
  const isSecretConfigured = Boolean(
    value.secret && value.secret.trim().length > 0,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow sm:p-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
        <LucideReact.Settings size={20} className="mr-2 text-gray-500" />
        Webhook Configuration
      </h3>

      {/* Empty state */}
      {!value.url &&
        !value.content_type &&
        value.secret === undefined &&
        value.insecure_ssl === undefined && (
          <div className="flex flex-col items-center text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <span className="mt-2">No configuration available</span>
          </div>
        )}

      {/* Configuration details */}
      <dl className="space-y-3">
        {value.url && (
          <div className="flex items-start">
            <dt className="w-32 text-sm font-medium text-gray-500">URL</dt>
            <dd className="ml-2 flex-1 text-sm text-gray-700 truncate">
              <div className="flex items-center gap-1">
                <LucideReact.Link size={16} className="text-gray-500" />
                <span className="truncate">{value.url}</span>
              </div>
            </dd>
          </div>
        )}

        {value.content_type && (
          <div className="flex items-start">
            <dt className="w-32 text-sm font-medium text-gray-500">
              Content Type
            </dt>
            <dd className="ml-2 flex items-center gap-1 text-sm text-gray-700">
              <LucideReact.Tag size={16} className="text-gray-500" />
              <span>{value.content_type}</span>
            </dd>
          </div>
        )}

        <div className="flex items-start">
          <dt className="w-32 text-sm font-medium text-gray-500">
            Insecure SSL
          </dt>
          <dd className="ml-2 flex items-center gap-1 text-sm">
            {insecureSslEnabled ? (
              <>
                <LucideReact.CheckCircle size={16} className="text-green-500" />
                <span className="text-green-600">Enabled</span>
              </>
            ) : (
              <>
                <LucideReact.XCircle size={16} className="text-red-500" />
                <span className="text-red-600">Disabled</span>
              </>
            )}
          </dd>
        </div>

        <div className="flex items-start">
          <dt className="w-32 text-sm font-medium text-gray-500">Secret</dt>
          <dd className="ml-2 flex items-center gap-1 text-sm text-gray-700">
            <LucideReact.Shield size={16} className="text-gray-500" />
            <span>{isSecretConfigured ? "Configured" : "Not configured"}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
