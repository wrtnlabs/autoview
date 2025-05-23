import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingDelivery {
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
    }
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
    export interface IShoppingSeller {
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
    }
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
    export interface IShoppingDeliveryPiece {
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
    }
    export interface IShoppingDeliveryShipper {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        company: null | string;
        name: string;
        mobile: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDelivery;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateMap: Record<AutoViewInput['state'], { label: string; className: string }> = {
    none:         { label: 'None',           className: 'text-gray-800 bg-gray-100' },
    preparing:    { label: 'Preparing',      className: 'text-blue-800 bg-blue-100' },
    manufacturing:{ label: 'Manufacturing',  className: 'text-indigo-800 bg-indigo-100' },
    shipping:     { label: 'Shipping',       className: 'text-amber-800 bg-amber-100' },
    delivering:   { label: 'Delivering',     className: 'text-teal-800 bg-teal-100' },
    underway:     { label: 'Underway',       className: 'text-purple-800 bg-purple-100' },
    arrived:      { label: 'Arrived',        className: 'text-green-800 bg-green-100' },
  };
  const stateInfo = stateMap[value.state];
  const formatDateTime = (d: string) =>
    new Date(d).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  const formattedCreatedAt  = formatDateTime(value.created_at);
  const formattedSellerSince = new Date(value.seller.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const totalPieces   = value.pieces.length;
  const totalQuantity = value.pieces.reduce((sum, p) => sum + p.quantity, 0);
  const sortedJourneys = [...value.journeys].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const journeyTypeMap: Record<string, { icon: any; colorClass: string }> = {
    preparing:     { icon: LucideReact.Clock,        colorClass: 'text-blue-500' },
    manufacturing: { icon: LucideReact.Settings,     colorClass: 'text-indigo-500' },
    shipping:      { icon: LucideReact.Truck,        colorClass: 'text-amber-500' },
    delivering:    { icon: LucideReact.Package,      colorClass: 'text-teal-500' },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: State and Created At */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium uppercase px-2 py-1 rounded ${stateInfo.className}`}>
          {stateInfo.label}
        </span>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedCreatedAt}</span>
        </div>
      </div>

      {/* Seller Info */}
      <div className="border-t pt-4">
        <div className="text-sm font-medium text-gray-500">Seller since</div>
        <div className="mt-1 text-sm text-gray-700">{formattedSellerSince}</div>
      </div>

      {/* Shippers */}
      {value.shippers.length > 0 && (
        <div className="border-t pt-4">
          <div className="text-sm font-medium text-gray-500 mb-2">Shippers</div>
          <div className="space-y-2">
            {value.shippers.map((shipper) => (
              <div
                key={shipper.id}
                className="p-2 border rounded flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <LucideReact.User size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-700">{shipper.name}</span>
                  {shipper.company && (
                    <span className="text-sm text-gray-500">({shipper.company})</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <LucideReact.Phone size={16} className="mr-1" />
                  <span>{shipper.mobile}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pieces Summary */}
      <div className="border-t pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.ListOrdered size={16} className="mr-1" />
          <span>Total Pieces:</span>
          <span className="ml-1 font-medium text-gray-700">{totalPieces}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <LucideReact.Box size={16} className="mr-1" />
          <span>Total Quantity:</span>
          <span className="ml-1 font-medium text-gray-700">{totalQuantity}</span>
        </div>
      </div>

      {/* Journeys */}
      {sortedJourneys.length > 0 && (
        <div className="border-t pt-4">
          <div className="text-sm font-medium text-gray-500 mb-2">Delivery Journey</div>
          <ul className="space-y-3">
            {sortedJourneys.map((journey) => {
              const mapping = journeyTypeMap[journey.type] || {
                icon: LucideReact.Clock,
                colorClass: 'text-gray-500',
              };
              const Icon = mapping.icon;
              return (
                <li key={journey.id} className="flex items-start">
                  <Icon
                    size={20}
                    className={`${mapping.colorClass} flex-shrink-0 mt-0.5`}
                    aria-label={journey.type}
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700">
                      {journey.title ??
                        journey.type.charAt(0).toUpperCase() + journey.type.slice(1)}
                    </div>
                    {journey.description && (
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {journey.description}
                      </div>
                    )}
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                      {journey.started_at && (
                        <span className="flex items-center">
                          <LucideReact.Play size={12} className="mr-1" />
                          {formatDateTime(journey.started_at)}
                        </span>
                      )}
                      {journey.completed_at && (
                        <span className="flex items-center">
                          <LucideReact.CheckCircle
                            size={12}
                            className="mr-1 text-green-500"
                          />
                          {formatDateTime(journey.completed_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
