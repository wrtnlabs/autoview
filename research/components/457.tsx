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
  const durationDisplay =
    value.duration >= 1000
      ? `${(value.duration / 1000).toFixed(2)}s`
      : `${value.duration}ms`;
  const deliveryType = value.redelivery ? "Redelivery" : "Initial Delivery";
  const statusText =
    value.status.charAt(0).toUpperCase() + value.status.slice(1);
  const isError = value.status_code >= 400 || /error|fail/i.test(value.status);
  const isPending = /pending|retry/i.test(value.status) && !isError;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full text-gray-800">
      {/* Header: ID, GUID and Status */}
      <div className="flex items-start justify-between mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <LucideReact.Hash size={20} className="text-gray-500" />
            <span className="font-medium">#{value.id}</span>
          </div>
          <p className="text-sm text-gray-500 truncate">{value.guid}</p>
        </div>
        <div className="flex items-center gap-1">
          {isError ? (
            <LucideReact.AlertTriangle size={20} className="text-red-500" />
          ) : isPending ? (
            <LucideReact.Clock size={20} className="text-amber-500" />
          ) : (
            <LucideReact.CheckCircle size={20} className="text-green-500" />
          )}
          <span className="font-medium">{statusText}</span>
        </div>
      </div>

      {/* Details grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <div className="flex items-center gap-2">
          <LucideReact.GitPullRequest size={16} className="text-gray-400" />
          <dt className="font-medium">Event</dt>
          <dd className="ml-auto">
            {value.event}
            {value.action ? ` / ${value.action}` : ""}
          </dd>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <dt className="font-medium">Delivered</dt>
          <dd className="ml-auto">{deliveredAt}</dd>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Clock size={16} className="text-gray-400" />
          <dt className="font-medium">Duration</dt>
          <dd className="ml-auto">{durationDisplay}</dd>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.RefreshCw size={16} className="text-gray-400" />
          <dt className="font-medium">Type</dt>
          <dd className="ml-auto">{deliveryType}</dd>
        </div>

        {throttledAt && (
          <div className="flex items-center gap-2">
            <LucideReact.ZapOff size={16} className="text-amber-500" />
            <dt className="font-medium">Throttled</dt>
            <dd className="ml-auto">{throttledAt}</dd>
          </div>
        )}

        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <dt className="font-medium">URL</dt>
          <dd className="ml-auto truncate block w-full text-right">
            {value.url ?? "—"}
          </dd>
        </div>

        {value.installation_id != null && (
          <div className="flex items-center gap-2">
            <LucideReact.User size={16} className="text-gray-400" />
            <dt className="font-medium">Installation ID</dt>
            <dd className="ml-auto">{value.installation_id}</dd>
          </div>
        )}

        {value.repository_id != null && (
          <div className="flex items-center gap-2">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <dt className="font-medium">Repository ID</dt>
            <dd className="ml-auto">{value.repository_id}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
