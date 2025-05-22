import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

  const reqHeadersCount = value.request.headers
    ? Object.keys(value.request.headers).length
    : 0;
  const reqPayload = value.request.payload;

  const respPayloadStr = value.response.payload || "";
  const respPayloadLength = respPayloadStr.length;

  const isSuccess = value.status_code >= 200 && value.status_code < 300;
  const isWarning = value.status_code >= 300 && value.status_code < 400;
  const isError = value.status_code >= 400;

  let StatusIcon = LucideReact.CheckCircle;
  let statusColor = "text-green-500";
  if (isWarning) {
    StatusIcon = LucideReact.Clock;
    statusColor = "text-amber-500";
  } else if (isError) {
    StatusIcon = LucideReact.AlertTriangle;
    statusColor = "text-red-500";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Status */}
      <div className="flex items-center mb-4">
        <StatusIcon className={`${statusColor}`} size={20} strokeWidth={1.5} />
        <span className="ml-2 text-lg font-semibold capitalize text-gray-800">
          {value.status}
        </span>
      </div>

      {/* Core Details */}
      <dl className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <dt className="font-medium">Event</dt>
          <dd>
            {value.event}
            {value.action ? ` / ${value.action}` : ""}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">GUID</dt>
          <dd className="flex items-center gap-1 truncate">
            <LucideReact.Hash size={16} className="text-gray-500" />
            <span className="truncate">{value.guid}</span>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Delivered At</dt>
          <dd className="text-gray-600">{deliveredAt}</dd>
        </div>
        {throttledAt && (
          <div className="flex justify-between">
            <dt className="font-medium">Throttled At</dt>
            <dd className="text-gray-600">{throttledAt}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="font-medium">Duration</dt>
          <dd className="text-gray-600">{value.duration} ms</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Redelivery</dt>
          <dd className="flex items-center gap-1">
            {value.redelivery ? (
              <LucideReact.RefreshCw className="text-blue-500" size={16} />
            ) : (
              <LucideReact.XCircle className="text-gray-400" size={16} />
            )}
            <span className="capitalize">
              {value.redelivery ? "Yes" : "No"}
            </span>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Status Code</dt>
          <dd className="text-gray-600">{value.status_code}</dd>
        </div>
        {value.url && (
          <div className="flex justify-between items-start">
            <dt className="font-medium">URL</dt>
            <dd className="flex items-center gap-1 w-2/3 truncate">
              <LucideReact.Link size={16} className="text-gray-500" />
              <span className="truncate break-all">{value.url}</span>
            </dd>
          </div>
        )}
      </dl>

      {/* Request Summary */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800 mb-1">Request</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Headers: {reqHeadersCount} key(s)</div>
          {reqPayload && typeof reqPayload === "object" ? (
            <pre className="bg-gray-100 p-2 rounded overflow-hidden line-clamp-3">
              {JSON.stringify(reqPayload, null, 2)}
            </pre>
          ) : (
            <div>Payload: {reqPayload === null ? "null" : "—"}</div>
          )}
        </div>
      </div>

      {/* Response Summary */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800 mb-1">Response</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Payload size: {respPayloadLength} char(s)</div>
          {respPayloadStr ? (
            <pre className="bg-gray-100 p-2 rounded overflow-hidden line-clamp-3">
              {respPayloadStr}
            </pre>
          ) : (
            <div>Payload: null</div>
          )}
        </div>
      </div>
    </div>
  );
}
