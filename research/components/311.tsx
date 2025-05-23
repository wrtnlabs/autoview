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
  // Derived values
  const contentType: string = value.content_type ?? 'form';
  // insecure_ssl: "1" or 1 → SSL verification disabled (insecure), anything else → enabled
  const sslVerificationEnabled: boolean = !(value.insecure_ssl === '1' || value.insecure_ssl === 1);

  // Render read-only visual representation of the webhook configuration
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <LucideReact.Link size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Webhook Configuration</h2>
      </div>
      <div className="space-y-3">
        {value.url && (
          <div className="flex items-center gap-2">
            <LucideReact.Link size={16} className="text-gray-500 shrink-0" />
            <span
              className="text-blue-600 truncate"
              title={value.url}
            >
              {value.url}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-gray-500 shrink-0" />
          <span className="text-gray-700 capitalize">{contentType}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Lock size={16} className="text-gray-500 shrink-0" />
          <span className="text-gray-700">
            {value.secret ? 'Secret Configured' : 'No Secret'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {sslVerificationEnabled ? (
            <LucideReact.CheckCircle size={16} className="text-green-500 shrink-0" />
          ) : (
            <LucideReact.AlertTriangle size={16} className="text-amber-500 shrink-0" />
          )}
          <span className="text-gray-700">
            {sslVerificationEnabled ? 'SSL Verification Enabled' : 'SSL Verification Disabled'}
          </span>
        </div>
      </div>
    </div>
  );
}
