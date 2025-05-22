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
  if (!value || value.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No webhook deliveries available.
      </div>
    );
  }

  const totalDeliveries = value.length;
  const redeliveryCount = value.filter((item) => item.redelivery).length;
  const totalDuration = value.reduce((sum, item) => sum + item.duration, 0);
  const averageDuration = totalDuration / totalDeliveries;
  const successCount = value.filter((item) => item.status_code >= 200 && item.status_code < 300).length;
  const successRate = (successCount / totalDeliveries) * 100;

  // Sort by delivery time (newest first) and take the most recent 5 entries
  const recentDeliveries = [...value]
    .sort(
      (a, b) =>
        new Date(b.delivered_at).getTime() - new Date(a.delivered_at).getTime(),
    )
    .slice(0, 5);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Webhook Deliveries Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs text-gray-500">Total Deliveries</div>
          <div className="text-xl font-medium text-gray-900">
            {totalDeliveries}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs text-gray-500">Redeliveries</div>
          <div className="text-xl font-medium text-gray-900">
            {redeliveryCount}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs text-gray-500">Success Rate</div>
          <div className="text-xl font-medium text-gray-900">
            {successRate.toFixed(1)}%
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs text-gray-500">Avg. Duration</div>
          <div className="text-xl font-medium text-gray-900">
            {averageDuration.toFixed(0)} ms
          </div>
        </div>
      </div>

      <h3 className="mt-6 text-md font-semibold text-gray-800">
        Recent Deliveries
      </h3>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-gray-600">Time</th>
              <th className="px-2 py-1 text-left text-gray-600">Event</th>
              <th className="px-2 py-1 text-left text-gray-600">Status</th>
              <th className="px-2 py-1 text-left text-gray-600">Duration</th>
              <th className="px-2 py-1 text-left text-gray-600">Redelivery</th>
              <th className="px-2 py-1 text-left text-gray-600">Throttled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentDeliveries.map((item) => {
              const time = new Date(item.delivered_at).toLocaleString();
              const isSuccess = item.status_code >= 200 && item.status_code < 300;
              const statusBadge = isSuccess
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800';

              return (
                <tr key={item.id}>
                  <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                    {time}
                  </td>
                  <td className="px-2 py-2 text-gray-700 truncate">
                    {item.event}
                  </td>
                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${statusBadge}`}
                    >
                      {item.status_code}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                    {item.duration} ms
                  </td>
                  <td className="px-2 py-2">
                    {item.redelivery ? (
                      <span className="inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                    {item.throttled_at
                      ? new Date(item.throttled_at).toLocaleString()
                      : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
  // 3. Return the React element.
}
