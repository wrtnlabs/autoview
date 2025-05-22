import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  export type IShoppingOrderPublish = {
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
    state:
      | "none"
      | "underway"
      | "preparing"
      | "manufacturing"
      | "shipping"
      | "delivering"
      | "arrived";
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
  };
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
  /**
   * The address information.
   */
  export type IShoppingAddress = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingOrderPublish;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: Format ISO date-time to readable string
  const formatDateTime = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-";

  // Derived values
  const createdAt = formatDateTime(value.created_at);
  const paidAt = formatDateTime(value.paid_at);
  const cancelledAt = formatDateTime(value.cancelled_at);

  // Status color mapping
  const statusColorMap: Record<AutoViewInput["state"], string> = {
    none: "bg-gray-100 text-gray-800",
    underway: "bg-blue-100 text-blue-800",
    preparing: "bg-yellow-100 text-yellow-800",
    manufacturing: "bg-indigo-100 text-indigo-800",
    shipping: "bg-blue-100 text-blue-800",
    delivering: "bg-yellow-100 text-yellow-800",
    arrived: "bg-green-100 text-green-800",
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <span className="text-sm text-gray-500" title={value.id}>
          #{value.id.slice(0, 8)}
        </span>
      </div>

      {/* Core details */}
      <div className="space-y-3">
        <div className="flex items-center text-gray-700 text-sm">
          <LucideReact.Calendar size={16} className="mr-2" aria-hidden="true" />
          <span>Created:</span>
          <span className="ml-1 font-medium">{createdAt}</span>
        </div>
        {value.paid_at && (
          <div className="flex items-center text-gray-700 text-sm">
            <LucideReact.CreditCard
              size={16}
              className="mr-2 text-green-600"
              aria-hidden="true"
            />
            <span>Paid:</span>
            <span className="ml-1 font-medium">{paidAt}</span>
          </div>
        )}
        {value.cancelled_at && (
          <div className="flex items-center text-gray-700 text-sm">
            <LucideReact.XCircle
              size={16}
              className="mr-2 text-red-600"
              aria-hidden="true"
            />
            <span>Cancelled:</span>
            <span className="ml-1 font-medium">{cancelledAt}</span>
          </div>
        )}
        <div className="flex items-center text-sm">
          <LucideReact.Tag
            size={16}
            className="mr-2 text-gray-500"
            aria-hidden="true"
          />
          <span>Status:</span>
          <span
            className={`ml-2 px-2 py-0.5 rounded ${statusColorMap[value.state]} text-xs font-medium`}
          >
            {value.state}
          </span>
        </div>
        <div className="flex items-start text-gray-700 text-sm">
          <LucideReact.MapPin
            size={16}
            className="mr-2 mt-0.5 text-gray-500"
            aria-hidden="true"
          />
          <div className="flex-1 font-medium leading-snug line-clamp-3">
            {value.address.name}, {value.address.department},{" "}
            {value.address.city}, {value.address.province},{" "}
            {value.address.country}, {value.address.zip_code}
          </div>
        </div>
      </div>

      {/* Deliveries */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800">
          Deliveries ({value.deliveries.length})
        </h3>
        <ul className="mt-3 space-y-4">
          {value.deliveries.map((del) => (
            <li key={del.id} className="border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium text-gray-800"
                  title={del.id}
                >
                  Delivery #{del.id.slice(0, 8)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDateTime(del.created_at)}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center text-gray-600 text-xs space-x-4">
                <div className="flex items-center">
                  <LucideReact.Truck
                    size={14}
                    className="mr-1"
                    aria-hidden="true"
                  />
                  <span className="capitalize">{del.state}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.User
                    size={14}
                    className="mr-1"
                    aria-hidden="true"
                  />
                  <span>{del.seller.id.slice(0, 6)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Package
                    size={14}
                    className="mr-1"
                    aria-hidden="true"
                  />
                  <span>{del.pieces.length} pcs</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Users
                    size={14}
                    className="mr-1"
                    aria-hidden="true"
                  />
                  <span>{del.shippers.length} shippers</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
