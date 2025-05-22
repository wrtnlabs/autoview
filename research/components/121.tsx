import { tags } from "typia";
import React from "react";
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
        state: "none" | "underway" | "preparing" | "manufacturing" | "shipping" | "delivering" | "arrived";
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
  const formatDateTime = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : 'N/A';

  const stateMapping: Record<AutoViewInput['state'], { label: string; badgeClass: string }> = {
    none: { label: 'None', badgeClass: 'bg-gray-100 text-gray-800' },
    underway: { label: 'Underway', badgeClass: 'bg-indigo-100 text-indigo-800' },
    preparing: { label: 'Preparing', badgeClass: 'bg-blue-100 text-blue-800' },
    manufacturing: { label: 'Manufacturing', badgeClass: 'bg-purple-100 text-purple-800' },
    shipping: { label: 'Shipping', badgeClass: 'bg-yellow-100 text-yellow-800' },
    delivering: { label: 'Delivering', badgeClass: 'bg-orange-100 text-orange-800' },
    arrived: { label: 'Arrived', badgeClass: 'bg-green-100 text-green-800' },
  };
  const { label: stateLabel, badgeClass } = stateMapping[value.state];

  const totalPieces = value.pieces.length;
  const totalQuantity = value.pieces.reduce((sum, p) => sum + p.quantity, 0);

  const sortedJourneys = [...value.journeys].sort((a, b) => {
    const aTime = a.started_at ?? a.created_at;
    const bTime = b.started_at ?? b.created_at;
    return new Date(aTime).getTime() - new Date(bTime).getTime();
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800">Delivery Overview</h2>
        <div className="mt-2 sm:mt-0 flex items-center space-x-3">
          <span className={`px-2 py-1 text-sm font-medium rounded-full ${badgeClass}`}>
            {stateLabel}
          </span>
          <time className="text-sm text-gray-500">{formatDateTime(value.created_at)}</time>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-xs text-gray-500 uppercase">Seller Since</h3>
          <p className="mt-1 text-sm text-gray-700">{formatDateTime(value.seller.created_at)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-xs text-gray-500 uppercase">Pieces</h3>
          <p className="mt-1 text-sm text-gray-700">{totalPieces}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-xs text-gray-500 uppercase">Total Quantity</h3>
          <p className="mt-1 text-sm text-gray-700">{totalQuantity}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-xs text-gray-500 uppercase">Shippers</h3>
          <p className="mt-1 text-sm text-gray-700">{value.shippers.length}</p>
        </div>
      </div>

      {/* Journey Timeline */}
      {sortedJourneys.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Journey</h3>
          <ul className="relative border-l border-gray-200">
            {sortedJourneys.map((j) => (
              <li key={j.id} className="mb-6 ml-4">
                <span className="absolute -left-1.5 top-1 w-3 h-3 bg-white border-2 border-gray-300 rounded-full" />
                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">
                      {j.type.charAt(0).toUpperCase() + j.type.slice(1)}
                    </span>
                    <time className="text-gray-500">{formatDateTime(j.started_at)}</time>
                  </div>
                  {j.title && <p className="text-gray-700 truncate">{j.title}</p>}
                  {j.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">{j.description}</p>
                  )}
                  {j.completed_at && (
                    <p className="text-green-600 text-xs">
                      Completed: {formatDateTime(j.completed_at)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shippers List */}
      {value.shippers.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Shippers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {value.shippers.map((s) => (
              <div key={s.id} className="p-4 bg-gray-50 rounded">
                <p className="text-sm font-semibold text-gray-800">
                  {s.company ? `${s.name} (${s.company})` : s.name}
                </p>
                <p className="mt-1 text-sm text-gray-600">{s.mobile}</p>
                <time className="mt-1 text-xs text-gray-500">{formatDateTime(s.created_at)}</time>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
