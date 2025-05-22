import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Delivery information.
   *
   * When delivering {@link IShoppingOrderGood goods} to
   * {@link IShoppingCustomer customer}, {@link IShoppingSeller seller} can deliver
   * multiple {@link IShoppingSaleUnitStock stocks}, goods at once. Also, it is
   * possible to deliver a stock or good in multiple times due to physical restriction
   * like volume or weight problem.
   *
   * As you can see from above, the relationship between delivery with
   * {@link IShoppingOrder order} (or {@link IShoppingOrderGood good}) is not 1: 1 or
   * N: 1, but M: N. Entity `IShoppingDelivery` has been designed to represent such
   * relationship, by referencing target stocks or goods through subsidiary entity
   * {@link IShoppingDeliveryPiece}.
   *
   * Also, delivery does not end with only one step. It has multiple processes like
   * manufacturing, planning, shipping and delivering. Those steps are represented by
   * another subsidiary entity {@link IShoppingDeliveryJourney}.
   */
  export type IShoppingDelivery = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Seller who've delivered the goods.
     *
     * @title Seller who've delivered the goods
     */
    seller: AutoViewInputSubTypes.IShoppingSeller;
    /**
     * List of journeys of the delivery.
     *
     * @title List of journeys of the delivery
     */
    journeys: AutoViewInputSubTypes.IShoppingDeliveryJourney[];
    /**
     * List of pieces of the delivery.
     *
     * @title List of pieces of the delivery
     */
    pieces: AutoViewInputSubTypes.IShoppingDeliveryPiece[];
    /**
     * List of shippers of the delivery.
     *
     * @title List of shippers of the delivery
     */
    shippers: AutoViewInputSubTypes.IShoppingDeliveryShipper[];
    /**
     * State of the delivery.
     *
     * @title State of the delivery
     */
    state:
      | "none"
      | "underway"
      | "preparing"
      | "manufacturing"
      | "shipping"
      | "delivering"
      | "arrived";
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
  };
  /**
   * Seller information.
   *
   * `IShoppingSeller` is an entity that embodies a person who registers
   * {@link IShoppingSale sales} to operate selling activities, with
   * {@link IShoppingMember membership} joining.
   *
   * For reference, unlike {@link IShoppingCustomer customers} which can
   * participate even without membership joining, seller must join membership
   * to operate sales. Also, seller must do the
   * {@link IShoppingCitizen real-name and mobile authentication}, too.
   */
  export type IShoppingSeller = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Creation tmie of record.
     *
     * Another words, the time when the seller has signed up.
     *
     * @title Creation tmie of record
     */
    created_at: string;
  };
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
  /**
   * Which stocks are delivered.
   *
   * `IShoppingDeliveryPiece` is a subsidiary entity of {@link IShoppingDelivery},
   * describing how much quantity is delivered for each
   * {@link IShoppingSaleUnitStock stock} in {@link IShoppingOrder}.
   *
   * For reference, as an order can be delivered in multiple times due to volume
   * or weight problem, it is possible to have multiple `IShoppingDeliveryPiece`
   * records for a single stock.
   */
  export type IShoppingDeliveryPiece = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Target order's {@link IShoppingOrderPublish.id}.
     *
     * @title Target order's {@link IShoppingOrderPublish.id}
     */
    publish_id: string;
    /**
     * Target good's {@link IShoppingOrderGood.id}.
     *
     * @title Target good's {@link IShoppingOrderGood.id}
     */
    good_id: string;
    /**
     * Target stock's {@link IShoppingSaleUnitStock.id}.
     *
     * @title Target stock's {@link IShoppingSaleUnitStock.id}
     */
    stock_id: string;
    /**
     * Quantity of the stock.
     *
     * It can be precision value to express split shipping.
     *
     * @title Quantity of the stock
     */
    quantity: number;
  };
  export type IShoppingDeliveryShipper = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    company: null | string;
    name: string;
    mobile: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDelivery;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateMap: Record<
    AutoViewInput["state"],
    { label: string; icon: JSX.Element; colorClass: string }
  > = {
    none: {
      label: "None",
      icon: <LucideReact.MinusCircle />,
      colorClass: "text-gray-500",
    },
    preparing: {
      label: "Preparing",
      icon: <LucideReact.Clock />,
      colorClass: "text-amber-500",
    },
    manufacturing: {
      label: "Manufacturing",
      icon: <LucideReact.Settings />,
      colorClass: "text-blue-500",
    },
    shipping: {
      label: "Shipping",
      icon: <LucideReact.Truck />,
      colorClass: "text-blue-400",
    },
    delivering: {
      label: "Delivering",
      icon: <LucideReact.Truck />,
      colorClass: "text-yellow-500",
    },
    underway: {
      label: "Underway",
      icon: <LucideReact.Loader className="animate-spin" />,
      colorClass: "text-indigo-500",
    },
    arrived: {
      label: "Arrived",
      icon: <LucideReact.CheckCircle />,
      colorClass: "text-green-500",
    },
  };
  const currentState = stateMap[value.state];
  const formattedCreated = new Date(value.created_at).toLocaleString();
  const totalQuantity = value.pieces.reduce((sum, p) => sum + p.quantity, 0);
  const journeyCount = value.journeys.length;
  const shipperCount = value.shippers.length;
  const journeysSorted = [...value.journeys].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-2">
          {React.cloneElement(currentState.icon, {
            size: 20,
            className: currentState.colorClass,
          })}
          <span className="font-semibold">{currentState.label}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 sm:mt-0">
          <LucideReact.Calendar size={16} />
          <span>{formattedCreated}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <LucideReact.ListOrdered size={20} className="text-gray-500" />
          <span className="mt-1 text-sm font-medium">Journeys</span>
          <span className="text-lg font-bold">{journeyCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Box size={20} className="text-gray-500" />
          <span className="mt-1 text-sm font-medium">Total Qty</span>
          <span className="text-lg font-bold">{totalQuantity}</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Users size={20} className="text-gray-500" />
          <span className="mt-1 text-sm font-medium">Shippers</span>
          <span className="text-lg font-bold">{shipperCount}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {/* Journey Timeline */}
        {journeyCount > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Journey Timeline
            </h3>
            <ol className="border-l border-gray-200">
              {journeysSorted.map((j) => (
                <li key={j.id} className="pl-4 py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                    <span className="text-sm font-medium">
                      {j.title ??
                        j.type.charAt(0).toUpperCase() + j.type.slice(1)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-6">
                    {j.started_at
                      ? new Date(j.started_at).toLocaleString()
                      : new Date(j.created_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Shippers List */}
        {shipperCount > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Shippers</h3>
            <ul className="space-y-2">
              {value.shippers.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{s.name}</span>
                    {s.company && (
                      <span className="text-xs text-gray-500">{s.company}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <LucideReact.Phone size={14} />
                    <span className="truncate">{s.mobile}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
