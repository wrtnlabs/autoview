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
  const deliveredDate = new Date(value.delivered_at);
  const formattedDeliveredAt = deliveredDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const durationLabel = `${value.duration}ms`;
  const statusCode = value.status_code;
  const isSuccess = statusCode >= 200 && statusCode < 300;
  const StatusIcon =
    isSuccess
      ? LucideReact.CheckCircle
      : statusCode >= 400 && statusCode < 500
      ? LucideReact.AlertTriangle
      : LucideReact.XCircle;
  const statusColor = isSuccess
    ? "text-green-500"
    : statusCode >= 400 && statusCode < 500
    ? "text-amber-500"
    : "text-red-500";
  const guidShort =
    value.guid.length > 8 ? `${value.guid.slice(0, 8)}…` : value.guid;
  const urlDisplay = value.url
    ? value.url.length > 30
      ? `${value.url.slice(0, 30)}…`
      : value.url
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-semibold text-gray-800">
          Delivery #{value.id}
        </span>
        <div className="flex items-center gap-1">
          <StatusIcon size={16} className={statusColor} />
          <span className="text-sm font-medium capitalize text-gray-700">
            {value.status}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{formattedDeliveredAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Clock size={16} className="text-gray-400" strokeWidth={1.5} />
          <span>{durationLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span>
            {value.event}
            {value.action ? ` / ${value.action}` : ""}
          </span>
        </div>
        {value.url && (
          <div className="flex items-center gap-2">
            <LucideReact.Link size={16} className="text-gray-400" />
            <a
              href={value.url}
              className="truncate text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {urlDisplay}
            </a>
          </div>
        )}
        {value.redelivery && (
          <div className="flex items-center gap-2">
            <LucideReact.RefreshCcw size={16} className="text-indigo-500" />
            <span>Redelivery</span>
          </div>
        )}
        {value.throttled_at && (
          <div className="flex items-center gap-2">
            <LucideReact.AlertTriangle size={16} className="text-amber-500" />
            <span>
              Throttled at{" "}
              {new Date(value.throttled_at).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span className="font-mono">{guidShort}</span>
        </div>
      </div>
    </div>
  );
}
