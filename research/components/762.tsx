import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Delivery made by a webhook, without request and response information.
     *
     * @title Simple webhook delivery
    */
    export interface hook_delivery_item {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.hook_delivery_item[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const total = value.length;
  const avgDuration =
    total > 0
      ? Math.round(value.reduce((sum, item) => sum + item.duration, 0) / total)
      : 0;
  const redeliveryCount = value.reduce(
    (sum, item) => sum + (item.redelivery ? 1 : 0),
    0,
  );

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString();

  const getStatusIcon = (code: number): JSX.Element => {
    if (code >= 200 && code < 300)
      return (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          aria-label="Success"
        />
      );
    if (code >= 300 && code < 400)
      return (
        <LucideReact.Info
          className="text-blue-500"
          size={16}
          aria-label="Redirect"
        />
      );
    if (code >= 400 && code < 500)
      return (
        <LucideReact.AlertTriangle
          className="text-amber-500"
          size={16}
          aria-label="Client Error"
        />
      );
    return (
      <LucideReact.XCircle
        className="text-red-500"
        size={16}
        aria-label="Server Error"
      />
    );
  };

  // 2. Handle empty state
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle
          className="text-gray-400"
          size={24}
          aria-label="No Data"
        />
        <span className="mt-2">No deliveries available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.List size={16} aria-label="Total Deliveries" />
          <span>{total} deliveries</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Clock size={16} aria-label="Average Duration" />
          <span>Avg duration: {avgDuration} ms</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.RotateCw size={16} aria-label="Redeliveries" />
          <span>Redeliveries: {redeliveryCount}</span>
        </div>
      </div>

      {/* Delivery items list */}
      <div className="space-y-2">
        {value.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-gray-50 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          >
            {/* Delivered at */}
            <div className="flex items-center gap-1 text-sm text-gray-700 truncate">
              <LucideReact.Calendar size={16} aria-label="Delivered At" />
              <span>{formatDate(item.delivered_at)}</span>
            </div>

            {/* Event / Action */}
            <div className="flex-1 px-2 text-sm text-gray-800 truncate">
              <span className="font-medium">{item.event}</span>
              {item.action && (
                <span className="text-gray-500"> / {item.action}</span>
              )}
            </div>

            {/* Status, redelivery, throttled, duration */}
            <div className="flex items-center gap-2 text-sm text-gray-700 flex-wrap">
              {getStatusIcon(item.status_code)}
              <span>{item.status_code}</span>
              <span className="text-gray-500 truncate">{item.status}</span>
              {item.redelivery && (
                <LucideReact.RotateCw
                  className="text-indigo-500"
                  size={16}
                  aria-label="Redelivery"
                />
              )}
              {item.throttled_at && (
                <LucideReact.AlertTriangle
                  className="text-red-500"
                  size={16}
                  aria-label="Throttled"
                />
              )}
              <span className="text-gray-500">{item.duration} ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
