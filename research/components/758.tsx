import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Webhooks for repositories.
     *
     * @title Webhook
    */
    export interface hook {
        type: string;
        /**
         * Unique identifier of the webhook.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of a valid service, use 'web' for a webhook.
        */
        name: string;
        /**
         * Determines whether the hook is actually triggered on pushes.
        */
        active: boolean;
        /**
         * Determines what events the hook is triggered for. Default: ['push'].
        */
        events: string[];
        config: AutoViewInputSubTypes.webhook_config;
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        test_url: string & tags.Format<"uri">;
        ping_url: string & tags.Format<"uri">;
        deliveries_url?: string & tags.Format<"uri">;
        last_response: AutoViewInputSubTypes.hook_response;
    }
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
    /**
     * @title Hook Response
    */
    export interface hook_response {
        code: (number & tags.Type<"int32">) | null;
        status: string | null;
        message: string | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.hook;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const configUrl = value.config.url ?? "Not specified";
  const contentType = value.config.content_type ?? "form";
  const insecureSsl = value.config.insecure_ssl;
  const lastResponse = value.last_response;
  const responseCode = lastResponse.code !== null ? lastResponse.code : "—";
  const responseStatus = lastResponse.status ?? "Unknown";
  const responseMessage = lastResponse.message ?? "No message";
  const isSuccessful =
    typeof lastResponse.code === "number" &&
    lastResponse.code >= 200 &&
    lastResponse.code < 300;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name, Type & Active Status */}
      <div className="flex items-center justify-between">
        <div className="overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">{value.type}</p>
        </div>
        <div>
          {value.active ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={20}
              aria-label="Active"
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={20}
              aria-label="Inactive"
            />
          )}
        </div>
      </div>

      {/* Events */}
      {value.events.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.events.map((event, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
            >
              {event}
            </span>
          ))}
        </div>
      )}

      {/* Creation & Update Timestamps */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Created at"
          />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center mt-1 sm:mt-0">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Updated at"
          />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Configuration */}
      <div>
        <h3 className="text-base font-medium text-gray-700">Configuration</h3>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          <div className="flex items-center">
            <LucideReact.Link
              size={16}
              className="text-gray-500 mr-1"
              aria-label="Delivery URL"
            />
            <span className="break-all">{configUrl}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <LucideReact.FileText
                size={16}
                className="text-gray-500 mr-1"
                aria-label="Content Type"
              />
              <span>{contentType}</span>
            </div>
            <div className="flex items-center">
              {(insecureSsl === "1" || insecureSsl === 1) ? (
                <>
                  <LucideReact.ShieldOff
                    size={16}
                    className="text-red-500 mr-1"
                    aria-label="Insecure SSL Enabled"
                  />
                  <span>Insecure SSL</span>
                </>
              ) : (
                <>
                  <LucideReact.ShieldCheck
                    size={16}
                    className="text-green-500 mr-1"
                    aria-label="SSL Secure"
                  />
                  <span>SSL Secure</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div>
        <h3 className="text-base font-medium text-gray-700">Endpoints</h3>
        <dl className="mt-2 space-y-1 text-sm text-gray-700">
          <div className="flex items-center">
            <LucideReact.Link
              size={16}
              className="text-gray-500 mr-1"
              aria-label="API URL"
            />
            <span className="break-all">{value.url}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Link
              size={16}
              className="text-gray-500 mr-1"
              aria-label="Test URL"
            />
            <span className="break-all">{value.test_url}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Link
              size={16}
              className="text-gray-500 mr-1"
              aria-label="Ping URL"
            />
            <span className="break-all">{value.ping_url}</span>
          </div>
          {value.deliveries_url && (
            <div className="flex items-center">
              <LucideReact.Link
                size={16}
                className="text-gray-500 mr-1"
                aria-label="Deliveries URL"
              />
              <span className="break-all">{value.deliveries_url}</span>
            </div>
          )}
        </dl>
      </div>

      {/* Last Response */}
      <div>
        <h3 className="text-base font-medium text-gray-700">Last Response</h3>
        <div className="mt-1 flex items-start space-x-2">
          {isSuccessful ? (
            <LucideReact.CheckCircle
              className="text-green-500 mt-1"
              size={16}
              aria-label="Success"
            />
          ) : (
            <LucideReact.AlertTriangle
              className="text-red-500 mt-1"
              size={16}
              aria-label="Failure"
            />
          )}
          <div className="text-sm text-gray-700">
            <div>
              <span className="font-medium">Status:</span> {responseStatus}
            </div>
            <div>
              <span className="font-medium">Code:</span> {responseCode}
            </div>
            {responseMessage && (
              <p className="mt-1 text-gray-600 line-clamp-2">
                {responseMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
