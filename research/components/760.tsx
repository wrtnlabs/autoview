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
  const items: { label: string; icon: JSX.Element; content: string }[] = [];

  if (value.url) {
    items.push({
      label: "URL",
      icon: <LucideReact.Link size={16} className="text-gray-500" />,
      content: value.url,
    });
  }

  if (value.content_type) {
    items.push({
      label: "Content Type",
      icon: <LucideReact.Code size={16} className="text-gray-500" />,
      content: value.content_type.toUpperCase(),
    });
  }

  if (value.secret) {
    const raw = value.secret;
    const masked =
      raw.length > 8 ? `${raw.slice(0, 4)}…${raw.slice(-4)}` : "••••••••";
    items.push({
      label: "Secret",
      icon: <LucideReact.Key size={16} className="text-gray-500" />,
      content: masked,
    });
  }

  if (value.insecure_ssl !== undefined) {
    const insecure = value.insecure_ssl === "1" || value.insecure_ssl === 1;
    items.push({
      label: "SSL Verification",
      icon: insecure ? (
        <LucideReact.AlertTriangle size={16} className="text-red-500" />
      ) : (
        <LucideReact.CheckCircle size={16} className="text-green-500" />
      ),
      content: insecure ? "Disabled" : "Enabled",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No webhook configuration available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <LucideReact.Rss color="#4F46E5" size={20} />
        Webhook Configuration
      </h2>
      <dl className="divide-y divide-gray-100">
        {items.map(({ label, icon, content }) => (
          <div key={label} className="py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <dt className="text-sm font-medium text-gray-600">{label}</dt>
            </div>
            <dd className="text-sm text-gray-800 truncate">{content}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
