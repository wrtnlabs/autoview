import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (dt: string | null) =>
    dt
      ? new Date(dt).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '-';
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const orderCreated = formatDateTime(value.created_at);
  const orderPaid = formatDateTime(value.paid_at);
  const orderCancelled = formatDateTime(value.cancelled_at);
  const orderState = capitalize(value.state);

  const addr = value.address;
  const fullAddress = `${addr.possession}, ${addr.department}, ${addr.city}, ${addr.province}, ${addr.country}, ${addr.zip_code}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Order Summary</h2>
      <dl className="mb-4 space-y-1">
        <div className="flex justify-between">
          <dt className="font-medium text-gray-600">Order ID:</dt>
          <dd className="text-gray-800 truncate">{value.id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-600">Status:</dt>
          <dd className="text-gray-800">{orderState}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-600">Created:</dt>
          <dd className="text-gray-800">{orderCreated}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-600">Paid:</dt>
          <dd className="text-gray-800">{orderPaid}</dd>
        </div>
        {value.cancelled_at && (
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Cancelled:</dt>
            <dd className="text-gray-800">{orderCancelled}</dd>
          </div>
        )}
      </dl>

      <div className="mb-4">
        <h3 className="text-md font-medium mb-1 text-gray-800">Delivery Address</h3>
        <p className="text-gray-800">{addr.name}</p>
        <p className="text-gray-800">{fullAddress}</p>
        <p className="text-gray-600">{addr.mobile}</p>
        {addr.special_note && (
          <p className="text-gray-500 italic truncate">{addr.special_note}</p>
        )}
      </div>

      <div>
        <h3 className="text-md font-medium mb-2 text-gray-800">
          Deliveries ({value.deliveries.length})
        </h3>
        <ul className="space-y-3">
          {value.deliveries.map((delivery) => {
            const dState = capitalize(delivery.state);
            const dCreated = formatDateTime(delivery.created_at);
            return (
              <li key={delivery.id} className="p-3 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 truncate">
                    Delivery {delivery.id}
                  </span>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {dState}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>Pieces: {delivery.pieces.length}</p>
                  <p>Journeys: {delivery.journeys.length}</p>
                  <p>Shippers: {delivery.shippers.length}</p>
                  <p>Created: {dCreated}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
