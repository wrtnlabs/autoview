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
  const url = value.url?.trim();
  const contentType = value.content_type || "form";
  const hasSecret = Boolean(value.secret);
  const maskedSecret = hasSecret ? "••••••••" : "Not set";
  const isInsecure =
    value.insecure_ssl != null &&
    (value.insecure_ssl === "1" ||
      value.insecure_ssl === 1 ||
      value.insecure_ssl === "true");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
        <LucideReact.Rss className="mr-2 text-gray-600" size={20} />
        Webhook Configuration
      </h2>
      <div className="space-y-3">
        {/* URL */}
        <div className="flex items-start gap-2">
          <LucideReact.Link className="mt-1 text-gray-500" size={18} />
          {url ? (
            <p className="text-gray-800 break-all">{url}</p>
          ) : (
            <p className="text-gray-400 italic">No URL provided</p>
          )}
        </div>
        {/* Content Type */}
        <div className="flex items-center gap-2">
          <LucideReact.Tag className="text-gray-500" size={18} />
          <span className="text-gray-800">{contentType}</span>
        </div>
        {/* Secret */}
        <div className="flex items-center gap-2">
          <LucideReact.Key className="text-gray-500" size={18} />
          <span className="text-gray-800">{maskedSecret}</span>
        </div>
        {/* Insecure SSL */}
        <div className="flex items-center gap-2">
          {isInsecure ? (
            <LucideReact.AlertTriangle className="text-red-500" size={18} />
          ) : (
            <LucideReact.CheckCircle className="text-green-500" size={18} />
          )}
          <span className="text-gray-800">
            Insecure SSL:&nbsp;
            <span className={isInsecure ? "text-red-500" : "text-green-500"}>
              {isInsecure ? "Yes" : "No"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
