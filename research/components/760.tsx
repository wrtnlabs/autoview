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
  const url = value.url ?? "";
  const contentType = value.content_type ?? "form";
  const secret = value.secret;
  const maskedSecret = secret
    ? secret.length > 4
      ? `••••${secret.slice(-4)}`
      : "••••"
    : "";
  const insecureRaw = value.insecure_ssl;
  const isInsecure =
    insecureRaw === "1" || insecureRaw === 1 || insecureRaw === "true";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Webhook Configuration
      </h2>
      <div className="space-y-4">
        {/* URL Field */}
        <div className="flex items-start">
          <LucideReact.Link
            className="mr-2 text-gray-500 flex-shrink-0"
            size={16}
          />
          <div>
            <div className="text-sm font-medium text-gray-700">URL</div>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {url}
              </a>
            ) : (
              <span className="text-sm text-gray-500">Not configured</span>
            )}
          </div>
        </div>

        {/* Content Type Field */}
        <div className="flex items-start">
          <LucideReact.Code
            className="mr-2 text-gray-500 flex-shrink-0"
            size={16}
          />
          <div>
            <div className="text-sm font-medium text-gray-700">
              Content Type
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {contentType}
            </div>
          </div>
        </div>

        {/* Secret Field */}
        <div className="flex items-start">
          <LucideReact.Key
            className="mr-2 text-gray-500 flex-shrink-0"
            size={16}
          />
          <div>
            <div className="text-sm font-medium text-gray-700">Secret</div>
            {secret ? (
              <div className="text-sm text-gray-600">{maskedSecret}</div>
            ) : (
              <span className="text-sm text-gray-500">Not configured</span>
            )}
          </div>
        </div>

        {/* SSL Verification Field */}
        <div className="flex items-start">
          {isInsecure ? (
            <LucideReact.ShieldOff
              className="mr-2 text-amber-500 flex-shrink-0"
              size={16}
            />
          ) : (
            <LucideReact.ShieldCheck
              className="mr-2 text-green-500 flex-shrink-0"
              size={16}
            />
          )}
          <div>
            <div className="text-sm font-medium text-gray-700">
              SSL Verification
            </div>
            <div className="text-sm text-gray-600">
              {isInsecure ? "Disabled" : "Enabled"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
