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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedSecret = value.secret
    ? `${value.secret.slice(0, 3)}...${value.secret.slice(-3)}`
    : "Not set";

  const insecureSslEnabled =
    value.insecure_ssl === "1" || value.insecure_ssl === 1;
  const insecureSslLabel = insecureSslEnabled
    ? "Enabled (allow insecure SSL)"
    : "Disabled";
  const insecureSslIcon = insecureSslEnabled ? (
    <LucideReact.ShieldOff
      size={16}
      className="text-red-500"
      aria-label="Insecure SSL enabled"
    />
  ) : (
    <LucideReact.ShieldCheck
      size={16}
      className="text-green-500"
      aria-label="Insecure SSL disabled"
    />
  );

  const contentType = value.content_type ?? "form";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
        <LucideReact.Settings size={20} className="mr-2 text-blue-500" />
        Webhook Configuration
      </h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {/* URL */}
        <div>
          <dt className="flex items-center text-xs font-medium text-gray-500">
            <LucideReact.Link size={16} className="mr-1 text-gray-400" />
            URL
          </dt>
          <dd className="mt-1 text-sm text-blue-600 truncate">
            {value.url ?? "Not configured"}
          </dd>
        </div>

        {/* Content Type */}
        <div>
          <dt className="flex items-center text-xs font-medium text-gray-500">
            <LucideReact.Tag size={16} className="mr-1 text-gray-400" />
            Content Type
          </dt>
          <dd className="mt-1">
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
              {contentType}
            </span>
          </dd>
        </div>

        {/* Secret */}
        <div>
          <dt className="flex items-center text-xs font-medium text-gray-500">
            <LucideReact.Key size={16} className="mr-1 text-gray-400" />
            Secret
          </dt>
          <dd className="mt-1 text-sm font-mono text-gray-900 truncate">
            {maskedSecret}
          </dd>
        </div>

        {/* Insecure SSL */}
        <div>
          <dt className="flex items-center text-xs font-medium text-gray-500">
            <LucideReact.ShieldOff size={16} className="mr-1 text-gray-400" />
            Insecure SSL
          </dt>
          <dd className="mt-1 flex items-center gap-1 text-sm text-gray-900">
            {insecureSslIcon}
            <span>{insecureSslLabel}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
