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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived values
  const insecureSSL = value.insecure_ssl === "1" || value.insecure_ssl === 1;
  const contentType = value.content_type ?? "form";
  const hasSecret = Boolean(value.secret);
  let maskedSecret = "";
  if (hasSecret && value.secret) {
    const len = value.secret.length;
    maskedSecret =
      len > 6
        ? `${value.secret.slice(0, 3)}…${value.secret.slice(-3)}`
        : "••••••";
  }

  // Render structure
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800">
        Webhook Configuration
      </h3>
      <dl className="mt-4 space-y-4">
        {/* URL */}
        {value.url && (
          <div className="flex items-start">
            <LucideReact.Link className="text-gray-400 mt-1" size={16} />
            <div className="ml-3">
              <dt className="text-sm font-medium text-gray-700">URL</dt>
              <dd className="text-sm text-blue-600 break-all">{value.url}</dd>
            </div>
          </div>
        )}

        {/* Content Type */}
        <div className="flex items-center">
          <LucideReact.Code className="text-gray-400" size={16} />
          <div className="ml-3">
            <dt className="text-sm font-medium text-gray-700">Content Type</dt>
            <dd className="text-sm text-gray-900">{contentType}</dd>
          </div>
        </div>

        {/* Secret */}
        <div className="flex items-center">
          {hasSecret ? (
            <LucideReact.Lock className="text-gray-500" size={16} />
          ) : (
            <LucideReact.Unlock className="text-gray-400" size={16} />
          )}
          <div className="ml-3">
            <dt className="text-sm font-medium text-gray-700">Secret</dt>
            <dd className="text-sm text-gray-900">
              {hasSecret ? (
                maskedSecret
              ) : (
                <span className="text-gray-500">Not Configured</span>
              )}
            </dd>
          </div>
        </div>

        {/* SSL Verification */}
        {value.insecure_ssl != null && (
          <div className="flex items-center">
            {insecureSSL ? (
              <LucideReact.ShieldOff className="text-amber-500" size={16} />
            ) : (
              <LucideReact.ShieldCheck className="text-green-500" size={16} />
            )}
            <div className="ml-3">
              <dt className="text-sm font-medium text-gray-700">
                SSL Verification
              </dt>
              <dd className="text-sm text-gray-900">
                {insecureSSL ? "Disabled" : "Enabled"}
              </dd>
            </div>
          </div>
        )}
      </dl>
    </div>
  );
}
