import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Delivery made by a webhook.
     *
     * @title Webhook delivery
    */
    export type hook_delivery = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.hook_delivery;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const deliveredDate = new Date(value.delivered_at).toLocaleString();
  const throttledDate = value.throttled_at
    ? new Date(value.throttled_at).toLocaleString()
    : null;
  const durationMs = `${value.duration} ms`;
  const redelivery = value.redelivery ? "Yes" : "No";
  const installationId = value.installation_id ?? "—";
  const repositoryId = value.repository_id ?? "—";
  const requestHeadersCount = value.request.headers
    ? Object.keys(value.request.headers).length
    : 0;
  const responseHeadersCount = value.response.headers
    ? Object.keys(value.response.headers).length
    : 0;
  const reqPayloadRaw = value.request.payload
    ? JSON.stringify(value.request.payload, null, 2)
    : null;
  const resPayloadRaw = value.response.payload;
  const truncate = (text: string | null, length: number) => {
    if (!text) return "—";
    return text.length > length ? text.slice(0, length) + "…" : text;
  };
  const reqPreview = truncate(reqPayloadRaw, 200);
  const resPreview = truncate(resPayloadRaw, 200);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden divide-y divide-gray-200">
      {/* Header */}
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">
          Webhook Delivery #{value.id}
        </h2>
        <p className="text-sm text-gray-600">GUID: {value.guid}</p>
      </div>

      {/* Main Details */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Delivered At:</span>
          <span className="text-sm font-medium text-gray-800">
            {deliveredDate}
          </span>
        </div>
        {throttledDate && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Throttled At:</span>
            <span className="text-sm font-medium text-gray-800">
              {throttledDate}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className="text-sm font-medium text-gray-800">
            {value.status} ({value.status_code})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Duration:</span>
          <span className="text-sm font-medium text-gray-800">
            {durationMs}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Redelivery:</span>
          <span className="text-sm font-medium text-gray-800">
            {redelivery}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Event:</span>
          <span className="text-sm font-medium text-gray-800">
            {value.event}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Action:</span>
          <span className="text-sm font-medium text-gray-800">
            {value.action ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Installation ID:</span>
          <span className="text-sm font-medium text-gray-800">
            {installationId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Repository ID:</span>
          <span className="text-sm font-medium text-gray-800">
            {repositoryId}
          </span>
        </div>
        {value.url && (
          <div>
            <span className="text-sm text-gray-600 block">URL:</span>
            <p className="text-sm text-blue-600 truncate">{value.url}</p>
          </div>
        )}
      </div>

      {/* Request & Response Sections */}
      <div className="p-4 bg-gray-50 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Request</h3>
          <div className="mt-1 text-xs text-gray-600">
            Headers: {requestHeadersCount} | Payload:
          </div>
          <pre className="mt-1 bg-gray-100 p-2 rounded text-xs font-mono text-gray-800 max-h-24 overflow-auto">
            {reqPreview}
          </pre>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Response</h3>
          <div className="mt-1 text-xs text-gray-600">
            Headers: {responseHeadersCount} | Payload:
          </div>
          <pre className="mt-1 bg-gray-100 p-2 rounded text-xs font-mono text-gray-800 max-h-24 overflow-auto">
            {resPreview}
          </pre>
        </div>
      </div>
    </div>
  );
}
