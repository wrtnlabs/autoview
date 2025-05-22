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
    : null;
  const durationMs = `${value.duration} ms`;

  const statusCode = value.status_code;
  const statusText = value.status;
  let statusColorClass = 'bg-gray-500 text-white';
  if (statusCode >= 200 && statusCode < 300) statusColorClass = 'bg-green-500 text-white';
  else if (statusCode >= 300 && statusCode < 400) statusColorClass = 'bg-blue-500 text-white';
  else if (statusCode >= 400 && statusCode < 500) statusColorClass = 'bg-yellow-500 text-white';
  else if (statusCode >= 500) statusColorClass = 'bg-red-500 text-white';

  const reqHeaderCount = value.request.headers
    ? Object.keys(value.request.headers).length
    : 0;
  const reqPayloadCount =
    value.request.payload && typeof value.request.payload === 'object'
      ? Object.keys(value.request.payload).length
      : 0;
  const resHeaderCount = value.response.headers
    ? Object.keys(value.response.headers).length
    : 0;
  const resPayloadLength = value.response.payload
    ? value.response.payload.length
    : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header: Event, Action, Badges, Timestamp */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="flex flex-wrap items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {value.event}
            {value.action ? ` / ${value.action}` : ''}
          </span>
          {value.redelivery && (
            <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
              Redelivery
            </span>
          )}
          {throttledAt && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
              Throttled
            </span>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
          {deliveredAt}
        </span>
      </div>

      {/* Core Details */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <dt className="font-medium">Status</dt>
          <dd>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${statusColorClass}`}
            >
              {statusText}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium">Status Code</dt>
          <dd>{statusCode}</dd>
        </div>
        <div>
          <dt className="font-medium">Duration</dt>
          <dd>{durationMs}</dd>
        </div>
        {value.installation_id != null && (
          <div>
            <dt className="font-medium">Installation ID</dt>
            <dd>{value.installation_id}</dd>
          </div>
        )}
        {value.repository_id != null && (
          <div>
            <dt className="font-medium">Repository ID</dt>
            <dd>{value.repository_id}</dd>
          </div>
        )}
        {value.url && (
          <div className="col-span-1 sm:col-span-2">
            <dt className="font-medium">Target URL</dt>
            <dd className="truncate">{value.url}</dd>
          </div>
        )}
      </dl>

      {/* Request & Response Summaries */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Request Summary
          </h3>
          <ul className="list-disc list-inside">
            <li>
              Headers: {reqHeaderCount}{' '}
              {reqHeaderCount === 1 ? 'entry' : 'entries'}
            </li>
            <li>Payload keys: {reqPayloadCount}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Response Summary
          </h3>
          <ul className="list-disc list-inside">
            <li>
              Headers: {resHeaderCount}{' '}
              {resHeaderCount === 1 ? 'entry' : 'entries'}
            </li>
            <li>
              Payload length: {resPayloadLength} character
              {resPayloadLength === 1 ? '' : 's'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
