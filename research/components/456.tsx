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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value;
  const total = items.length;
  const redeliveryCount = items.filter((i) => i.redelivery).length;
  const avgDuration =
    total > 0
      ? Math.round(items.reduce((sum, i) => sum + i.duration, 0) / total)
      : 0;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusIcon = (code: number) => {
    if (code < 300)
      return <LucideReact.CheckCircle size={16} className="text-green-500" />;
    if (code < 400)
      return <LucideReact.Clock size={16} className="text-amber-500" />;
    return <LucideReact.AlertTriangle size={16} className="text-red-500" />;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      {/* Summary Card */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Delivery Summary
        </h2>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <LucideReact.List size={16} className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-bold text-gray-900">{total}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.RotateCw size={16} className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Redeliveries</div>
              <div className="text-lg font-bold text-gray-900">
                {redeliveryCount}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Clock size={16} className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Avg. Duration</div>
              <div className="text-lg font-bold text-gray-900">
                {avgDuration} ms
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Items List */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="text-md font-semibold text-gray-900 truncate">
                  {item.event}
                  {item.action ? `: ${item.action}` : ""}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {item.guid}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status_code)}
                <span className="text-sm font-medium text-gray-900">
                  {item.status_code} {item.status}
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>{formatDate(item.delivered_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Clock size={16} />
                <span>{item.duration} ms</span>
              </div>
              <div className="flex items-center gap-1">
                {item.redelivery ? (
                  <LucideReact.RotateCw
                    size={16}
                    className="text-blue-500"
                  />
                ) : (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                  />
                )}
                <span>
                  {item.redelivery ? "Redelivery" : "First Delivery"}
                </span>
              </div>
              {item.throttled_at && (
                <div className="flex items-center gap-1 text-amber-600">
                  <LucideReact.AlertTriangle size={16} />
                  <span>Throttled at {formatDate(item.throttled_at)}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
