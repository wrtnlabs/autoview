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
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No deliveries found</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((item: AutoViewInputSubTypes.hook_delivery_item) => {
        const deliveredAt = formatDate(item.delivered_at);
        const throttledAt = item.throttled_at ? formatDate(item.throttled_at) : null;
        const durationMs = `${item.duration} ms`;
        const eventAction = item.action ? `${item.event} / ${item.action}` : item.event;

        // Determine status icon and color
        let statusIcon = <LucideReact.Clock size={16} className="text-amber-500" />;
        if (item.status_code >= 200 && item.status_code < 300) {
          statusIcon = <LucideReact.CheckCircle size={16} className="text-green-500" />;
        } else if (item.status_code >= 400) {
          statusIcon = <LucideReact.AlertTriangle size={16} className="text-red-500" />;
        }

        return (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <LucideReact.Calendar size={16} />
                <span>{deliveredAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.redelivery && (
                  <LucideReact.RefreshCcw
                    size={16}
                    className="text-yellow-500"
                    aria-label="Redelivery"
                  />
                )}
                {throttledAt && (
                  <LucideReact.PauseCircle
                    size={16}
                    className="text-red-500"
                    aria-label={`Throttled at ${throttledAt}`}
                  />
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <LucideReact.Activity size={16} className="text-gray-500" />
                <span className="truncate">{eventAction}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideReact.Timer size={16} className="text-gray-500" />
                <span>{durationMs}</span>
              </div>
              <div className="flex items-center space-x-2">
                {statusIcon}
                <span>
                  {item.status} ({item.status_code})
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
