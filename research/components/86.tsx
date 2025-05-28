import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Order completion and payment information.
     *
     * `IShoppingOrderPublish` is an entity that embodies the series of processes
     * in which a {@link IShoppingCustomer customer} pays for his or her
     * {@link IShoppingOrder order}, thereby completing the order. And only after
     * the order is {@link paid_at completed}, can the {@link IShoppingSeller seller}
     * recognize that the customer has purchased his product.
     *
     * By the way, please note that just because the `IShoppingOrderPublish` record
     * exists, it does not mean that the payment has been completed. Of course, with
     * "credit cards" and "Google Pay", payment application and payment occur at the
     * same time. However, there are some cases where payment is made after the
     * payment application, such as "bank transfer" or "virtual account payment".
     * Therefore, to see the completion of payment, be sure to check the
     * {@link paid_at} property.
     *
     * In addition, even after payment has been made, there may be cases where it is
     * suddenly cancelled, so please be aware of this as well.
    */
    export interface IShoppingOrderPublish {
        /**
         * List of deliveries.
         *
         * An {@link IShoppingOrder order} can be delivered in multiple times.
         * Of course, the opposite case is also possible, that a
         * {@link IShoppingDelivery delivery} can be composed of multiple orders.
         *
         * @title List of deliveries
        */
        deliveries: AutoViewInputSubTypes.IShoppingDelivery[];
        /**
         * State of the order, about the deliveries.
         *
         * @title State of the order, about the deliveries
        */
        state: "none" | "underway" | "preparing" | "manufacturing" | "shipping" | "delivering" | "arrived";
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
         * Time when the order was paid.
         *
         * @title Time when the order was paid
        */
        paid_at: null | (string & tags.Format<"date-time">);
        /**
         * Time when the payment was cancelled.
         *
         * @title Time when the payment was cancelled
        */
        cancelled_at: null | (string & tags.Format<"date-time">);
        /**
         * Address where the {@link IShoppingOrderGood goods} to be delivered.
         *
         * @title Address where the {@link IShoppingOrderGood goods} to be delivered
        */
        address: AutoViewInputSubTypes.IShoppingAddress;
    }
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
    /**
     * The address information.
    */
    export interface IShoppingAddress {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
        /**
         * Mobile number to contact.
         *
         * @title Mobile number to contact
        */
        mobile: string;
        /**
         * Representative name of the address.
         *
         * Sometimes be receiver's name, and sometimes be place name.
         *
         * @title Representative name of the address
        */
        name: string;
        /**
         * Country name.
         *
         * @title Country name
        */
        country: string;
        /**
         * Province name.
         *
         * @title Province name
        */
        province: string;
        /**
         * City name.
         *
         * @title City name
        */
        city: string;
        /**
         * Department name.
         *
         * @title Department name
        */
        department: string;
        /**
         * Detailed address containing street name, building number, and room number.
         *
         * @title Detailed address containing street name, building number, and room number
        */
        possession: string;
        /**
         * Zip code, or postal code.
         *
         * @title Zip code, or postal code
        */
        zip_code: string;
        /**
         * Special description if required.
         *
         * @title Special description if required
        */
        special_note: null | string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingOrderPublish;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-";

  const totalDeliveries = value.deliveries.length;
  const totalItemsDelivered = value.deliveries.reduce(
    (sum, d) => sum + d.pieces.reduce((s, p) => s + p.quantity, 0),
    0
  );

  const statusMap: Record<
    AutoViewInput["state"],
    { label: string; icon: React.ReactNode }
  > = {
    none: {
      label: "Pending",
      icon: (
        <LucideReact.Clock
          className="text-gray-500"
          size={20}
          role="img"
          aria-label="Pending"
        />
      ),
    },
    preparing: {
      label: "Preparing",
      icon: (
        <LucideReact.Settings
          className="text-amber-500"
          size={20}
          role="img"
          aria-label="Preparing"
        />
      ),
    },
    manufacturing: {
      label: "Manufacturing",
      icon: (
        <LucideReact.Package
          className="text-purple-500"
          size={20}
          role="img"
          aria-label="Manufacturing"
        />
      ),
    },
    shipping: {
      label: "Shipping",
      icon: (
        <LucideReact.Truck
          className="text-blue-500"
          size={20}
          role="img"
          aria-label="Shipping"
        />
      ),
    },
    delivering: {
      label: "Delivering",
      icon: (
        <LucideReact.Truck
          className="text-teal-500"
          size={20}
          role="img"
          aria-label="Delivering"
        />
      ),
    },
    arrived: {
      label: "Delivered",
      icon: (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={20}
          role="img"
          aria-label="Delivered"
        />
      ),
    },
    underway: {
      label: "Underway",
      icon: (
        <LucideReact.ArrowUpRight
          className="text-blue-500"
          size={20}
          role="img"
          aria-label="Underway"
        />
      ),
    },
  };

  const status = statusMap[value.state];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: Order ID and Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          Order #{value.id}
        </h2>
        <div className="flex items-center mt-2 sm:mt-0">
          {status.icon}
          <span className="ml-2 text-sm font-medium text-gray-700">
            {status.label}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Dates & Stats */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <LucideReact.Calendar size={16} className="mr-2" />
            <span className="text-sm">
              Created: {formatDate(value.created_at)}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            {value.paid_at ? (
              <LucideReact.CheckCircle
                size={16}
                className="mr-2 text-green-500"
              />
            ) : (
              <LucideReact.Clock size={16} className="mr-2 text-amber-500" />
            )}
            <span className="text-sm">
              Paid: {value.paid_at ? formatDate(value.paid_at) : "Pending"}
            </span>
          </div>
          {value.cancelled_at && (
            <div className="flex items-center text-gray-600">
              <LucideReact.AlertCircle
                size={16}
                className="mr-2 text-red-500"
              />
              <span className="text-sm">
                Cancelled: {formatDate(value.cancelled_at)}
              </span>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <LucideReact.Package size={16} className="mr-2" />
            <span className="text-sm">{totalDeliveries} deliveries</span>
          </div>
          <div className="flex items-center text-gray-600">
            <LucideReact.ListOrdered size={16} className="mr-2" />
            <span className="text-sm">
              {totalItemsDelivered} items delivered
            </span>
          </div>
        </div>

        {/* Right: Shipping Address */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-800">
            Shipping Address
          </h3>
          <div className="flex items-center text-gray-600">
            <LucideReact.User size={16} className="mr-2" />
            <span className="text-sm">{value.address.name}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <LucideReact.Phone size={16} className="mr-2" />
            <span className="text-sm">{value.address.mobile}</span>
          </div>
          <div className="flex items-start text-gray-600">
            <LucideReact.MapPin size={16} className="mr-2 mt-1" />
            <span className="text-sm leading-tight">
              {value.address.possession}, {value.address.department},{" "}
              {value.address.city}, {value.address.province},{" "}
              {value.address.country}, {value.address.zip_code}
            </span>
          </div>
          {value.address.special_note && (
            <div className="flex items-start text-gray-600">
              <LucideReact.Edit3 size={16} className="mr-2 mt-1" />
              <span className="text-sm italic leading-tight">
                {value.address.special_note}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
