import LucideReact from "lucide-react";
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
  const durationLabel = `${value.duration} ms`;
  const actionLabel = value.action ?? "–";
  const installId = value.installation_id;
  const repoId = value.repository_id;
  const isSuccess = value.status_code >= 200 && value.status_code < 300;
  const isWarning = value.status_code >= 300 && value.status_code < 400;
  const statusColor = isSuccess
    ? "text-green-600"
    : isWarning
      ? "text-amber-500"
      : "text-red-500";
  const StatusIcon = isSuccess
    ? LucideReact.CheckCircle
    : isWarning
      ? LucideReact.AlertTriangle
      : LucideReact.XCircle;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Delivery #{value.id}
        </h2>
        <div className={`flex items-center ${statusColor}`}>
          <StatusIcon size={20} strokeWidth={1.5} aria-label={value.status} />
          <span className="ml-1 text-sm font-medium">{value.status}</span>
        </div>
      </div>

      {/* Summary List */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-gray-500">GUID</dt>
          <dd className="mt-1 font-mono text-gray-700 truncate">
            {value.guid}
          </dd>
        </div>
        <div className="flex">
          <dt className="text-xs font-medium text-gray-500 mr-1 flex-shrink-0">
            Event
          </dt>
          <dd className="mt-1 text-gray-900">{value.event}</dd>
        </div>
        <div className="flex">
          <dt className="text-xs font-medium text-gray-500 mr-1 flex-shrink-0">
            Action
          </dt>
          <dd className="mt-1 text-gray-900">{actionLabel}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1 flex-shrink-0"
          />
          <dt className="sr-only">Delivered At</dt>
          <dd className="text-gray-900">{deliveredAt}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock
            size={16}
            className="text-gray-400 mr-1 flex-shrink-0"
          />
          <dt className="sr-only">Duration</dt>
          <dd className="text-gray-900">{durationLabel}</dd>
        </div>
        {value.redelivery && (
          <div className="flex items-center">
            <LucideReact.Repeat
              size={16}
              className="text-gray-400 mr-1 flex-shrink-0"
            />
            <dt className="sr-only">Redelivery</dt>
            <dd className="text-gray-900">Yes</dd>
          </div>
        )}
        {throttledAt && (
          <div className="flex items-center">
            <LucideReact.AlertTriangle
              size={16}
              className="text-amber-500 mr-1 flex-shrink-0"
            />
            <dt className="sr-only">Throttled At</dt>
            <dd className="text-gray-900">{throttledAt}</dd>
          </div>
        )}
        {value.url && (
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-gray-500">Target URL</dt>
            <dd className="mt-1 text-sm text-gray-700 break-all truncate">
              {value.url}
            </dd>
          </div>
        )}
        {installId != null && (
          <div>
            <dt className="text-xs font-medium text-gray-500">
              Installation ID
            </dt>
            <dd className="mt-1 text-gray-900">{installId}</dd>
          </div>
        )}
        {repoId != null && (
          <div>
            <dt className="text-xs font-medium text-gray-500">Repository ID</dt>
            <dd className="mt-1 text-gray-900">{repoId}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
