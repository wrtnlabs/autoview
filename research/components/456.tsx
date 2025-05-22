import { tags } from "typia";
import React from "react";
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
  const totalCount = value.length;
  const redeliveryCount = value.filter(item => item.redelivery).length;
  const throttledCount = value.filter(item => item.throttled_at != null).length;
  const avgDuration = totalCount > 0
    ? Math.round(value.reduce((sum, item) => sum + item.duration, 0) / totalCount)
    : 0;

  // Helper to format timestamps
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800">Webhook Deliveries</h2>
        <div className="mt-3 sm:mt-0 flex flex-wrap gap-4 text-sm text-gray-600">
          <div>Total: <span className="font-medium text-gray-800">{totalCount}</span></div>
          <div>Avg Duration: <span className="font-medium text-gray-800">{avgDuration} ms</span></div>
          <div>Redeliveries: <span className="font-medium text-gray-800">{redeliveryCount}</span></div>
          <div>Throttled: <span className="font-medium text-gray-800">{throttledCount}</span></div>
        </div>
      </div>

      {/* Delivery List */}
      <div className="space-y-4">
        {value.map(item => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-gray-800">Event:</span>
                <span className="text-gray-600 truncate">{item.event}</span>
                {item.action && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                    {item.action}
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Delivered: {formatDate(item.delivered_at)}
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-800">Duration:</span>
                <span className="ml-1">{item.duration} ms</span>
              </div>

              <div>
                <span className="font-medium text-gray-800">Status:</span>
                <span className="ml-1">{item.status_code} – {item.status}</span>
              </div>

              <div
                className={`px-2 py-0.5 rounded text-xs ${
                  item.redelivery
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {item.redelivery ? 'Redelivery' : 'First Delivery'}
              </div>

              {item.throttled_at && (
                <div className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                  Throttled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
