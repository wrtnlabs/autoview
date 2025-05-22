import * as LucideReact from "lucide-react";
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
  // 1. Data aggregation and transformation
  const deliveries = value;
  const total = deliveries.length;
  const successCount = deliveries.filter((d) => d.status_code < 300).length;
  const warningCount = deliveries.filter(
    (d) => d.status_code >= 300 && d.status_code < 400,
  ).length;
  const errorCount = deliveries.filter((d) => d.status_code >= 400).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="space-y-6">
      {/* Summary Panel */}
      <div className="p-4 bg-gray-50 rounded-lg shadow flex flex-wrap items-center justify-around text-sm">
        <div className="flex items-center space-x-1 text-gray-700">
          <LucideReact.List size={16} />
          <span>Total: {total}</span>
        </div>
        <div className="flex items-center space-x-1 text-green-600">
          <LucideReact.CheckCircle size={16} />
          <span>{successCount} Success</span>
        </div>
        <div className="flex items-center space-x-1 text-amber-500">
          <LucideReact.AlertTriangle size={16} />
          <span>{warningCount} Warning</span>
        </div>
        <div className="flex items-center space-x-1 text-red-600">
          <LucideReact.XCircle size={16} />
          <span>{errorCount} Error</span>
        </div>
      </div>

      {/* Delivery List */}
      <ul className="space-y-4">
        {deliveries.map((item) => {
          const deliveredAt = new Date(item.delivered_at).toLocaleString();
          const throttledAt = item.throttled_at
            ? new Date(item.throttled_at).toLocaleString()
            : null;
          const statusIcon =
            item.status_code < 300 ? (
              <LucideReact.CheckCircle className="text-green-500" size={16} />
            ) : item.status_code < 400 ? (
              <LucideReact.AlertTriangle className="text-amber-500" size={16} />
            ) : (
              <LucideReact.XCircle className="text-red-500" size={16} />
            );

          return (
            <li key={item.id} className="p-4 bg-white rounded-lg shadow">
              {/* Header: Event / Action and GUID */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="flex items-center space-x-2 text-gray-800 font-medium text-base">
                  <LucideReact.Package size={20} className="text-gray-500" />
                  <span>
                    {item.event}
                    {item.action ? ` / ${item.action}` : ""}
                  </span>
                </h3>
                <span className="text-sm text-gray-500 max-w-xs truncate">
                  {item.guid}
                </span>
              </div>

              {/* Meta: Delivered at, Throttled at, Duration, Redelivery */}
              <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-2">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <LucideReact.Calendar size={16} />
                  <span>{deliveredAt}</span>
                </div>
                {throttledAt && (
                  <div className="flex items-center space-x-1 whitespace-nowrap">
                    <LucideReact.Clock size={16} />
                    <span>Throttled: {throttledAt}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <LucideReact.Clock size={16} />
                  <span>{item.duration} ms</span>
                </div>
                {item.redelivery && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full whitespace-nowrap">
                    Redelivery
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center text-sm font-medium text-gray-700 space-x-2">
                {statusIcon}
                <span>
                  {item.status} ({item.status_code})
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
