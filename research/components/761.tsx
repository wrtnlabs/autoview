import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Configuration object of the webhook
     *
     * @title Webhook Configuration
    */
    export interface webhook_config {
        url?: AutoViewInputSubTypes.webhook_config_url;
        content_type?: AutoViewInputSubTypes.webhook_config_content_type;
        secret?: AutoViewInputSubTypes.webhook_config_secret;
        insecure_ssl?: AutoViewInputSubTypes.webhook_config_insecure_ssl;
    }
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
  const maskedSecret = value.secret
    ? `••••${value.secret.slice(-4)}`
    : null;
  const insecureSSLEnabled =
    value.insecure_ssl !== undefined &&
    value.insecure_ssl !== "0" &&
    value.insecure_ssl !== 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full md:max-w-md">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <LucideReact.Link size={20} className="text-gray-700" />
        <span>Webhook Configuration</span>
      </h2>
      <div className="mt-4 space-y-3">
        {value.url && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="ml-2 text-blue-600 break-all">{value.url}</span>
          </div>
        )}
        {value.content_type && (
          <div className="flex items-center">
            <LucideReact.Code size={16} className="text-gray-500" />
            <span className="ml-2 capitalize text-gray-700">
              {value.content_type}
            </span>
          </div>
        )}
        {maskedSecret && (
          <div className="flex items-center">
            <LucideReact.Key size={16} className="text-gray-500" />
            <span className="ml-2 text-gray-700 font-mono">
              {maskedSecret}
            </span>
          </div>
        )}
        {value.insecure_ssl !== undefined && (
          <div className="flex items-center">
            {insecureSSLEnabled ? (
              <LucideReact.ShieldOff
                size={16}
                className="text-amber-500"
              />
            ) : (
              <LucideReact.ShieldCheck
                size={16}
                className="text-green-500"
              />
            )}
            <span
              className={`ml-2 ${
                insecureSSLEnabled
                  ? "text-amber-700"
                  : "text-green-700"
              }`}
            >
              {insecureSSLEnabled
                ? "Insecure SSL Enabled"
                : "Insecure SSL Disabled"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
