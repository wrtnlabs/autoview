import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Delivery made by a webhook.
     *
     * @title Webhook delivery
    */
    export interface hook_delivery {
        /**
         * Unique identifier of the delivery.
        */
        id: number & tags.Type<"int32">;
        /**
         * Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).
        */
        guid: string;
        /**
         * Time when the delivery was delivered.
        */
        delivered_at: string;
        /**
         * Whether the delivery is a redelivery.
        */
        redelivery: boolean;
        /**
         * Time spent delivering.
        */
        duration: number;
        /**
         * Description of the status of the attempted delivery
        */
        status: string;
        /**
         * Status code received when delivery was made.
        */
        status_code: number & tags.Type<"int32">;
        /**
         * The event that triggered the delivery.
        */
        event: string;
        /**
         * The type of activity for the event that triggered the delivery.
        */
        action: string | null;
        /**
         * The id of the GitHub App installation associated with this event.
        */
        installation_id: (number & tags.Type<"int32">) | null;
        /**
         * The id of the repository associated with this event.
        */
        repository_id: (number & tags.Type<"int32">) | null;
        /**
         * Time when the webhook delivery was throttled.
        */
        throttled_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The URL target of the delivery.
        */
        url?: string;
        request: {
            /**
             * The request headers sent with the webhook delivery.
            */
            headers: {} | null;
            /**
             * The webhook payload.
            */
            payload: {} | null;
        };
        response: {
            /**
             * The response headers received when the delivery was made.
            */
            headers: {} | null;
            /**
             * The response payload received.
            */
            payload: string | null;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.hook_delivery;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and data transformations
  const displayTitle = value.action ? `${value.event} – ${value.action}` : value.event;
  const formattedDeliveredAt = new Date(value.delivered_at).toLocaleString();
  const formattedThrottledAt = value.throttled_at
    ? new Date(value.throttled_at).toLocaleString()
    : null;
  const statusCode = value.status_code;
  const statusIcon =
    statusCode < 300 ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : statusCode < 400 ? (
      <LucideReact.AlertTriangle className="text-amber-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );
  const requestPayloadCount =
    value.request.payload && typeof value.request.payload === "object"
      ? Object.keys(value.request.payload).length
      : 0;
  const responsePreview = value.response.payload
    ? value.response.payload.length > 100
      ? `${value.response.payload.slice(0, 100)}…`
      : value.response.payload
    : "No payload";

  // 2. JSX structure using Tailwind CSS for layout and styling
  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md text-gray-800">
      {/* Header: Event & Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold truncate">{displayTitle}</h2>
        <div className="flex items-center gap-1">
          {statusIcon}
          <span className="text-sm">{value.status}</span>
        </div>
      </div>

      {/* Core Delivery Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>Delivered: {formattedDeliveredAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Clock size={16} className="text-gray-500" />
          <span>Duration: {value.duration} ms</span>
        </div>
        {value.redelivery && (
          <div className="flex items-center gap-1 text-blue-600">
            <LucideReact.RefreshCcw size={16} />
            <span>Redelivery</span>
          </div>
        )}
        {formattedThrottledAt && (
          <div className="flex items-center gap-1 text-amber-600">
            <LucideReact.AlertTriangle size={16} />
            <span>Throttled: {formattedThrottledAt}</span>
          </div>
        )}
        {value.url && (
          <div className="flex items-center gap-1">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="truncate break-all">{value.url}</span>
          </div>
        )}
      </div>

      {/* Request & Response Summary */}
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <h3 className="font-medium mb-1">Request</h3>
          <p>Payload fields: {requestPayloadCount}</p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Response</h3>
          <p className="break-all whitespace-pre-wrap">{responsePreview}</p>
        </div>
      </div>
    </div>
  );
}
