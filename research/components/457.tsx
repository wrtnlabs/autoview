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
  const deliveredAt = new Date(value.delivered_at).toLocaleString();
  const throttledAt = value.throttled_at
    ? new Date(value.throttled_at).toLocaleString()
    : 'N/A';
  const redelivery = value.redelivery ? 'Yes' : 'No';
  const durationMs = `${value.duration} ms`;
  const action = value.action ?? 'N/A';
  const installationId = value.installation_id ?? 'N/A';
  const repositoryId = value.repository_id ?? 'N/A';
  const urlDisplay = value.url
    ? value.url.length > 40
      ? `${value.url.slice(0, 40)}…`
      : value.url
    : 'N/A';
  const hasRequestHeaders = value.request.headers !== null;
  const hasRequestPayload = value.request.payload !== null;
  const responsePayloadLength =
    typeof value.response.payload === 'string'
      ? `${value.response.payload.length} chars`
      : 'None';
  const hasResponseHeaders = value.response.headers !== null;
  const statusColor =
    value.status_code >= 200 && value.status_code < 300
      ? 'bg-green-100 text-green-800'
      : value.status_code < 400
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.event}
        </h2>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${statusColor}`}
        >
          {value.status}
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-2">
        <dt className="font-medium text-gray-700">Delivery ID</dt>
        <dd className="text-gray-900">{value.id}</dd>

        <dt className="font-medium text-gray-700">GUID</dt>
        <dd className="text-gray-900 truncate">{value.guid}</dd>

        <dt className="font-medium text-gray-700">Delivered At</dt>
        <dd className="text-gray-900">{deliveredAt}</dd>

        <dt className="font-medium text-gray-700">Duration</dt>
        <dd className="text-gray-900">{durationMs}</dd>

        <dt className="font-medium text-gray-700">Status Code</dt>
        <dd className="text-gray-900">{value.status_code}</dd>

        <dt className="font-medium text-gray-700">Redelivery?</dt>
        <dd className="text-gray-900">{redelivery}</dd>

        <dt className="font-medium text-gray-700">Action</dt>
        <dd className="text-gray-900">{action}</dd>

        <dt className="font-medium text-gray-700">Installation ID</dt>
        <dd className="text-gray-900">{installationId}</dd>

        <dt className="font-medium text-gray-700">Repository ID</dt>
        <dd className="text-gray-900">{repositoryId}</dd>

        <dt className="font-medium text-gray-700">Throttled At</dt>
        <dd className="text-gray-900">{throttledAt}</dd>

        <dt className="col-span-2 font-medium text-gray-700">Webhook URL</dt>
        <dd className="col-span-2 text-gray-900 truncate">{urlDisplay}</dd>

        <dt className="font-medium text-gray-700">Req. Headers</dt>
        <dd className="text-gray-900">
          {hasRequestHeaders ? 'Present' : 'None'}
        </dd>

        <dt className="font-medium text-gray-700">Req. Payload</dt>
        <dd className="text-gray-900">
          {hasRequestPayload ? 'Present' : 'None'}
        </dd>

        <dt className="font-medium text-gray-700">Resp. Headers</dt>
        <dd className="text-gray-900">
          {hasResponseHeaders ? 'Present' : 'None'}
        </dd>

        <dt className="font-medium text-gray-700">Resp. Payload</dt>
        <dd className="text-gray-900">{responsePayloadLength}</dd>
      </dl>
    </div>
  );
}
