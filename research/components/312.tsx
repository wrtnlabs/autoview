import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasData =
    !!value.url ||
    !!value.content_type ||
    !!value.secret ||
    value.insecure_ssl !== undefined;

  // Mask the secret for display
  const maskedSecret = value.secret
    ? value.secret.length > 8
      ? "••••••••" + value.secret.slice(-4)
      : "••••••••"
    : "";

  // Interpret insecure_ssl value (string "1"/"true" or number 1 equals disabled SSL verification)
  const insecureSslRaw = value.insecure_ssl;
  const insecureSslEnabled =
    insecureSslRaw === "1" || insecureSslRaw === 1 || insecureSslRaw === "true";
  const showSslStatus = insecureSslRaw !== undefined;
  const sslLabel = insecureSslEnabled
    ? "SSL verification disabled"
    : "SSL verification enabled";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No configuration available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-900">
        Webhook Configuration
      </h2>
      <div className="mt-3 space-y-3">
        {value.url && (
          <div className="flex items-center space-x-2">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700 truncate">{value.url}</span>
          </div>
        )}
        {value.content_type && (
          <div className="flex items-center space-x-2">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">{value.content_type}</span>
          </div>
        )}
        {value.secret && (
          <div className="flex items-center space-x-2">
            <LucideReact.Key size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">{maskedSecret}</span>
          </div>
        )}
        {showSslStatus && (
          <div className="flex items-center space-x-2">
            {insecureSslEnabled ? (
              <LucideReact.AlertTriangle size={16} className="text-amber-500" />
            ) : (
              <LucideReact.Lock size={16} className="text-green-500" />
            )}
            <span className="text-sm text-gray-700">{sslLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
