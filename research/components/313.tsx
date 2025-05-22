import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Delivery made by a webhook, without request and response information.
   *
   * @title Simple webhook delivery
   */
  export type hook_delivery_item = {
    /**
     * Unique identifier of the webhook delivery.
     */
    id: number & tags.Type<"int32">;
    /**
     * Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).
     */
    guid: string;
    /**
     * Time when the webhook delivery occurred.
     */
    delivered_at: string;
    /**
     * Whether the webhook delivery is a redelivery.
     */
    redelivery: boolean;
    /**
     * Time spent delivering.
     */
    duration: number;
    /**
     * Describes the response returned after attempting the delivery.
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.hook_delivery_item[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.length;
  const avgDuration =
    total > 0 ? value.reduce((sum, item) => sum + item.duration, 0) / total : 0;
  const redeliveryCount = value.filter((item) => item.redelivery).length;
  const failureCount = value.filter((item) => item.status_code >= 400).length;

  const formatDate = (iso: string) => new Date(iso).toLocaleString();
  const formatDuration = (ms: number) =>
    ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms}ms`;
  const shortGuid = (g: string) => `${g.slice(0, 8)}…${g.slice(-4)}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Summary Metrics */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center bg-gray-50 px-3 py-1 rounded">
          <LucideReact.ListChecks className="text-gray-500 mr-1" size={16} />
          <span className="text-gray-700 text-sm">Total: {total}</span>
        </div>
        <div className="flex items-center bg-gray-50 px-3 py-1 rounded">
          <LucideReact.Clock className="text-gray-500 mr-1" size={16} />
          <span className="text-gray-700 text-sm">
            Avg Duration: {formatDuration(avgDuration)}
          </span>
        </div>
        <div className="flex items-center bg-gray-50 px-3 py-1 rounded">
          <LucideReact.RefreshCw className="text-gray-500 mr-1" size={16} />
          <span className="text-gray-700 text-sm">
            Redeliveries: {redeliveryCount}
          </span>
        </div>
        <div className="flex items-center bg-gray-50 px-3 py-1 rounded">
          <LucideReact.AlertTriangle className="text-gray-500 mr-1" size={16} />
          <span className="text-gray-700 text-sm">
            Failures: {failureCount}
          </span>
        </div>
      </div>

      {/* Detailed List */}
      <ul className="space-y-4">
        {value.map((item) => (
          <li
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 truncate">
                GUID: {shortGuid(item.guid)}
              </span>
              {item.redelivery && (
                <div className="flex items-center text-xs text-amber-600">
                  <LucideReact.RefreshCw className="mr-1" size={12} />
                  <span>Redelivery</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center">
                <LucideReact.Calendar
                  className="mr-1 text-gray-400"
                  size={14}
                />
                <span>Delivered: {formatDate(item.delivered_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock className="mr-1 text-gray-400" size={14} />
                <span>Duration: {formatDuration(item.duration)}</span>
              </div>
              <div className="flex items-center">
                {item.status_code < 300 ? (
                  <LucideReact.CheckCircle
                    className="mr-1 text-green-500"
                    size={14}
                  />
                ) : item.status_code < 400 ? (
                  <LucideReact.AlertTriangle
                    className="mr-1 text-amber-500"
                    size={14}
                  />
                ) : (
                  <LucideReact.XCircle
                    className="mr-1 text-red-500"
                    size={14}
                  />
                )}
                <span>
                  Status: {item.status} ({item.status_code})
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Hash className="mr-1 text-gray-400" size={14} />
                <span>Event: {item.event}</span>
              </div>
              {item.action && (
                <div className="flex items-center">
                  <LucideReact.Activity
                    className="mr-1 text-gray-400"
                    size={14}
                  />
                  <span>Action: {item.action}</span>
                </div>
              )}
              {item.throttled_at && (
                <div className="flex items-center">
                  <LucideReact.PauseCircle
                    className="mr-1 text-amber-500"
                    size={14}
                  />
                  <span>Throttled: {formatDate(item.throttled_at)}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  // 3. Return the React element.
}
