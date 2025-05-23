import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Delivery made by a webhook.
     *
     * @title Webhook delivery
    */
    export interface hook_delivery {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.hook_delivery;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const deliveredAt = new Date(value.delivered_at).toLocaleString();
  const throttledAt = value.throttled_at ? new Date(value.throttled_at).toLocaleString() : null;

  const statusCode = value.status_code;
  let StatusIcon = LucideReact.Clock;
  let statusColor = 'text-amber-500';
  if (statusCode >= 200 && statusCode < 300) {
    StatusIcon = LucideReact.CheckCircle;
    statusColor = 'text-green-500';
  } else if (statusCode >= 400) {
    StatusIcon = LucideReact.AlertTriangle;
    statusColor = 'text-red-500';
  }

  const eventAction = value.action ? `${value.event}/${value.action}` : value.event;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Webhook Delivery</h2>
        {value.redelivery && (
          <LucideReact.RefreshCcw
            className="text-yellow-500"
            size={20}
            aria-label="Redelivery"
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Hash className="text-gray-400 mr-1" size={16} />
          <span>#{value.id}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Code className="text-gray-400 mr-1" size={16} />
          <span className="break-all">{value.guid}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
          <span>{deliveredAt}</span>
        </div>
        {throttledAt && (
          <div className="flex items-center">
            <LucideReact.Clock className="text-amber-500 mr-1" size={16} />
            <span>Throttled: {throttledAt}</span>
          </div>
        )}
        <div className="flex items-center col-span-1 sm:col-span-2">
          <StatusIcon className={`${statusColor} mr-1`} size={16} />
          <span className="capitalize">
            {value.status} ({statusCode})
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Flag className="text-gray-400 mr-1" size={16} />
          <span>{eventAction}</span>
        </div>
        {value.installation_id != null && (
          <div className="flex items-center">
            <LucideReact.Package className="text-gray-400 mr-1" size={16} />
            <span>App ID: {value.installation_id}</span>
          </div>
        )}
        {value.repository_id != null && (
          <div className="flex items-center">
            <LucideReact.GitBranch className="text-gray-400 mr-1" size={16} />
            <span>Repo ID: {value.repository_id}</span>
          </div>
        )}
        {value.url && (
          <div className="flex items-center col-span-1 sm:col-span-2 break-all">
            <LucideReact.Link className="text-gray-400 mr-1" size={16} />
            <span>{value.url}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Clock className="text-gray-400 mr-1" size={16} />
          <span>Duration: {value.duration} ms</span>
        </div>
      </div>
    </div>
  );
}
