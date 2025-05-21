import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Journey of delivery.
     *
     * `IShoppingDeliveryJourney` is a subsidiary entity of {@link IShoppingDelivery},
     * describing each journey of the delivery. For reference, the word journey
     * means each step of the delivery process, such as preparing, shipping, and
     * delivering {@link IShoppingOrderGood goods} to the
     * {@link IShoppingCustomer customer}.
    */
    export type IShoppingDeliveryJourney = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of the record.
         *
         * @title Creation time of the record
        */
        created_at: string;
        /**
         * Deletion time of the record.
         *
         * @title Deletion time of the record
        */
        deleted_at: null | (string & tags.Format<"date-time">);
        /**
         * Type of journey.
         *
         * - preparing
         * - manufacturing
         * - shipping
         * - delivering
         *
         * @title Type of journey
        */
        type: "preparing" | "manufacturing" | "shipping" | "delivering";
        /**
         * Title of journey.
         *
         * @title Title of journey
        */
        title: null | string;
        /**
         * Description of journey.
         *
         * @title Description of journey
        */
        description: null | string;
        /**
         * Start time of the journey.
         *
         * @title Start time of the journey
        */
        started_at: null | (string & tags.Format<"date-time">);
        /**
         * Completion time of the journey.
         *
         * @title Completion time of the journey
        */
        completed_at: null | (string & tags.Format<"date-time">);
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeliveryJourney;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const typeMap: Record<AutoViewInput["type"], { label: string; color: string }> = {
    preparing:       { label: "Preparing",    color: "bg-gray-200 text-gray-800" },
    manufacturing:   { label: "Manufacturing", color: "bg-blue-200 text-blue-800" },
    shipping:        { label: "Shipping",      color: "bg-yellow-200 text-yellow-800" },
    delivering:      { label: "Delivering",    color: "bg-green-200 text-green-800" },
  };
  const { label: typeLabel, color: typeColor } =
    typeMap[value.type] || { label: value.type, color: "bg-gray-200 text-gray-800" };
  const title = value.title ?? typeLabel;
  const description = value.description ?? "No description available";

  const formatDate = (dateStr: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : null;

  const startedAt   = formatDate(value.started_at);
  const completedAt = formatDate(value.completed_at);

  let duration: string | null = null;
  if (value.started_at && value.completed_at) {
    const diffMs = new Date(value.completed_at).getTime() - new Date(value.started_at).getTime();
    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  let status = "Pending";
  if (value.completed_at) status = "Completed";
  else if (value.started_at) status = "In Progress";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColor}`}
        >
          {typeLabel}
        </span>
        <span className="text-xs text-gray-500">{status}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>

      {description && (
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
      )}

      <div className="text-sm text-gray-600 space-y-1">
        {startedAt && (
          <div>
            Start: <time dateTime={value.started_at!}>{startedAt}</time>
          </div>
        )}
        {completedAt && (
          <div>
            End: <time dateTime={value.completed_at!}>{completedAt}</time>
          </div>
        )}
        {duration && (
          <div>
            Duration: <span>{duration}</span>
          </div>
        )}
        <div>
          Logged:{" "}
          <time dateTime={value.created_at}>
            {new Date(value.created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
