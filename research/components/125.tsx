import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingDeliveryJourney {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeliveryJourney;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const isDeleted = value.deleted_at !== null;
  const isCompleted = !isDeleted && value.completed_at !== null;
  const isInProgress = !isDeleted && value.started_at !== null && !isCompleted;
  const statusLabel = isDeleted
    ? "Deleted"
    : isCompleted
    ? "Completed"
    : isInProgress
    ? "In Progress"
    : "Pending";

  let statusIcon: JSX.Element;
  if (isDeleted) {
    statusIcon = (
      <LucideReact.XCircle className="text-red-500 ml-2" size={16} />
    );
  } else if (isCompleted) {
    statusIcon = (
      <LucideReact.CheckCircle className="text-green-500 ml-2" size={16} />
    );
  } else if (isInProgress) {
    statusIcon = (
      <LucideReact.Clock className="text-amber-500 ml-2" size={16} />
    );
  } else {
    statusIcon = (
      <LucideReact.Info className="text-gray-400 ml-2" size={16} />
    );
  }

  const stepIcon: JSX.Element = (() => {
    switch (value.type) {
      case "preparing":
        return <LucideReact.Package className="text-blue-500 mr-2" size={20} />;
      case "manufacturing":
        return <LucideReact.Settings className="text-indigo-500 mr-2" size={20} />;
      case "shipping":
        return <LucideReact.Truck className="text-emerald-500 mr-2" size={20} />;
      case "delivering":
        return <LucideReact.Home className="text-purple-500 mr-2" size={20} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400 mr-2" size={20} />;
    }
  })();

  const title =
    value.title && value.title.trim().length > 0
      ? value.title
      : value.type.charAt(0).toUpperCase() + value.type.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {stepIcon}
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h3>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>{statusLabel}</span>
          {statusIcon}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Timeline */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>
            {value.started_at
              ? formatDateTime(value.started_at)
              : "Not started"}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.CheckCircle size={16} className="mr-1" />
          <span>
            {value.completed_at
              ? formatDateTime(value.completed_at)
              : "Not completed"}
          </span>
        </div>
      </div>

      {/* Deleted Info */}
      {isDeleted && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <LucideReact.XCircle size={16} className="mr-1" />
          <span>Deleted on {formatDateTime(value.deleted_at)}</span>
        </div>
      )}
    </div>
  );
}
