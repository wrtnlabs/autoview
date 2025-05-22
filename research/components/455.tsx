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
  const contentType = value.content_type ?? "form";
  const insecureSslEnabled =
    value.insecure_ssl === "1" || value.insecure_ssl === 1;
  const secretProvided = Boolean(value.secret);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Webhook Configuration
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {value.url && (
          <div className="flex items-center overflow-hidden">
            <LucideReact.Link
              size={16}
              className="text-gray-500 flex-shrink-0"
            />
            <span className="ml-2 text-gray-800 truncate">{value.url}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Code size={16} className="text-gray-500" />
          <span className="ml-2 text-gray-800 capitalize">{contentType}</span>
        </div>
        <div className="flex items-center">
          {secretProvided ? (
            <>
              <LucideReact.Key size={16} className="text-green-500" />
              <span className="ml-2 text-green-600">Signing enabled</span>
            </>
          ) : (
            <>
              <LucideReact.AlertTriangle size={16} className="text-amber-500" />
              <span className="ml-2 text-amber-600">Signing disabled</span>
            </>
          )}
        </div>
        <div className="flex items-center">
          {insecureSslEnabled ? (
            <>
              <LucideReact.AlertTriangle size={16} className="text-red-500" />
              <span className="ml-2 text-red-600">
                SSL verification disabled
              </span>
            </>
          ) : (
            <>
              <LucideReact.CheckCircle size={16} className="text-green-500" />
              <span className="ml-2 text-green-600">
                SSL verification enabled
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
