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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation
  const totalCount: number = value.length;
  const redeliveredCount: number = value.filter((item) => item.redelivery).length;
  const throttledCount: number = value.filter((item) => item.throttled_at != null).length;
  const avgDuration: number =
    totalCount > 0
      ? Math.round(
          value.reduce((sum, item) => sum + item.duration, 0) / totalCount
        )
      : 0;

  // 2. Helper for formatting dates
  const formatDateTime = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // 3. Compose and return the visual structure
  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-sm text-gray-500">Total Deliveries</div>
          <div className="mt-1 text-2xl font-semibold text-gray-800">
            {totalCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-sm text-gray-500">Redelivered</div>
          <div className="mt-1 text-2xl font-semibold text-gray-800">
            {redeliveredCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-sm text-gray-500">Throttled</div>
          <div className="mt-1 text-2xl font-semibold text-gray-800">
            {throttledCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-sm text-gray-500">Avg Duration</div>
          <div className="mt-1 text-2xl font-semibold text-gray-800">
            {avgDuration} ms
          </div>
        </div>
      </div>

      {/* List of Deliveries */}
      <div className="space-y-4">
        {value.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md md:flex md:items-center md:justify-between"
          >
            <div className="flex-1 space-y-1">
              <div className="text-sm text-gray-500">
                {formatDateTime(item.delivered_at)}
              </div>
              <div className="text-lg font-medium text-gray-900 truncate">
                {item.event}
                {item.action ? `: ${item.action}` : ""}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center space-x-3 md:mt-0">
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">
                  {item.status_code}
                </span>{" "}
                {item.status}
              </div>
              <div className="text-sm text-gray-500">{item.duration} ms</div>
              {item.redelivery && (
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                  Redelivery
                </span>
              )}
              {item.throttled_at && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                  Throttled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
