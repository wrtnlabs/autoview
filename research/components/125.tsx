import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const typeLabels: Record<AutoViewInput["type"], string> = {
    preparing: "Preparing",
    manufacturing: "Manufacturing",
    shipping: "Shipping",
    delivering: "Delivering",
  };

  const typeIcons: Record<AutoViewInput["type"], JSX.Element> = {
    preparing: <LucideReact.Box color="#2563EB" size={24} />,
    manufacturing: <LucideReact.Package color="#9333EA" size={24} />,
    shipping: <LucideReact.Truck color="#F59E0B" size={24} />,
    delivering: <LucideReact.CheckCircle color="#10B981" size={24} />,
  };

  const isCompleted = Boolean(value.completed_at);
  const isStarted = Boolean(value.started_at);
  const statusLabel = isCompleted
    ? "Completed"
    : isStarted
      ? "In Progress"
      : "Upcoming";
  const statusIcon = isCompleted ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : isStarted ? (
    <LucideReact.Loader className="animate-spin text-amber-500" size={16} />
  ) : (
    <LucideReact.Clock className="text-gray-400" size={16} />
  );

  const formatDate = (d: string | null): string =>
    d
      ? new Date(d).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-start gap-4">
      <div className="flex-shrink-0">{typeIcons[value.type]}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            {typeLabels[value.type]}
          </span>
          <div className="flex items-center text-sm">
            {statusIcon}
            <span
              className={`ml-1 ${
                isCompleted
                  ? "text-green-600"
                  : isStarted
                    ? "text-amber-500"
                    : "text-gray-500"
              }`}
            >
              {statusLabel}
            </span>
          </div>
        </div>
        {value.title && (
          <h3 className="mt-1 text-lg font-medium text-gray-800 truncate">
            {value.title}
          </h3>
        )}
        {value.description && (
          <p className="mt-2 text-gray-600 text-sm line-clamp-2">
            {value.description}
          </p>
        )}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm">
          <div className="flex items-center">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">Start: {formatDate(value.started_at)}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">End: {formatDate(value.completed_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
