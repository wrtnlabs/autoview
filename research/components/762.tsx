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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.length;
  const redeliveryCount = value.filter((item) => item.redelivery).length;
  const avgDuration =
    total > 0 ? value.reduce((sum, item) => sum + item.duration, 0) / total : 0;
  const sortedDeliveries = [...value].sort(
    (a, b) =>
      new Date(b.delivered_at).getTime() - new Date(a.delivered_at).getTime(),
  );
  const latestDateFormatted =
    total > 0
      ? new Date(sortedDeliveries[0].delivered_at).toLocaleString()
      : "-";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="space-y-6">
      {/* Summary Panel */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Webhook Delivery Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <LucideReact.ListChecks size={20} className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Total Deliveries</div>
              <div className="font-medium text-gray-800">{total}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.RefreshCw size={20} className="text-amber-500" />
            <div>
              <div className="text-sm text-gray-500">Redeliveries</div>
              <div className="font-medium text-gray-800">{redeliveryCount}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.Clock size={20} className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Avg. Duration</div>
              <div className="font-medium text-gray-800">
                {Math.round(avgDuration)}ms
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar size={20} className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Last Delivery</div>
              <div className="font-medium text-gray-800">
                {latestDateFormatted}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed List */}
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No deliveries found.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDeliveries.map((item) => {
            const date = new Date(item.delivered_at).toLocaleString();
            const isSuccess = item.status_code >= 200 && item.status_code < 300;
            const StatusIcon = isSuccess
              ? LucideReact.CheckCircle
              : LucideReact.AlertTriangle;
            const statusColor = isSuccess ? "text-green-500" : "text-red-500";

            return (
              <div
                key={item.id}
                className="p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0"
              >
                <div className="flex items-center space-x-2">
                  <LucideReact.Calendar size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{date}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <LucideReact.Tag size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {item.event}
                    {item.action ? ` / ${item.action}` : ""}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <StatusIcon size={16} className={statusColor} />
                  <span className="text-sm text-gray-700">
                    {item.status_code} {item.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <LucideReact.Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {item.duration}ms
                  </span>
                </div>

                {item.redelivery && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.RefreshCw
                      size={16}
                      className="text-amber-500"
                    />
                    <span className="text-sm text-amber-500">Redelivered</span>
                  </div>
                )}

                {item.throttled_at && (
                  <div className="flex items-center space-x-2">
                    <LucideReact.Clock size={16} className="text-blue-500" />
                    <span className="text-sm text-blue-500">
                      {new Date(item.throttled_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
