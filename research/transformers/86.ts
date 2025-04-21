import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
        deliveries: Schema.IShoppingDelivery[];
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
        address: Schema.IShoppingAddress;
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
        seller: Schema.IShoppingSeller;
        /**
         * List of journeys of the delivery.
         *
         * @title List of journeys of the delivery
        */
        journeys: Schema.IShoppingDeliveryJourney[];
        /**
         * List of pieces of the delivery.
         *
         * @title List of pieces of the delivery
        */
        pieces: Schema.IShoppingDeliveryPiece[];
        /**
         * List of shippers of the delivery.
         *
         * @title List of shippers of the delivery
        */
        shippers: Schema.IShoppingDeliveryShipper[];
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
type IAutoViewTransformerInputType = Schema.IShoppingOrderPublish;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map delivery/order states to visual chip colors
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    none: "gray",
    preparing: "warning",
    manufacturing: "info",
    shipping: "primary",
    delivering: "secondary",
    arrived: "success",
  };

  // Prepare a chip summarizing the overall order state
  const orderStateChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.state,
    color: stateColorMap[input.state] ?? "gray",
    size: "medium",
    variant: "filled",
  };

  // Format the address as markdown for readability and responsive layout
  let addressLines = [
    `**Delivery Address**`,
    `${input.address.name} • ${input.address.mobile}`,
    `${input.address.country}, ${input.address.province}, ${input.address.city}, ${input.address.department}`,
    `${input.address.possession}`,
    `${input.address.zip_code}`,
  ];
  if (input.address.special_note) {
    addressLines.push(`\n> _${input.address.special_note}_`);
  }
  const addressMarkdown = addressLines.join("  \n");

  // Compute basic order metrics
  const deliveriesCount = input.deliveries.length.toString();
  const paidAtDisplay = input.paid_at ?? "-";
  const cancelledAtDisplay = input.cancelled_at ?? "-";

  // Generate chips for each individual delivery's state
  const deliveryStateChips: IAutoView.IAutoViewChipProps[] = input.deliveries.map((delivery) => ({
    type: "Chip",
    label: delivery.state,
    color: stateColorMap[delivery.state] ?? "gray",
    size: "small",
    variant: "outlined",
  }));

  // Build a data list of key order details
  const orderDetailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: [
          { type: "Text", content: "Total Deliveries", variant: "subtitle2" }
        ],
        value: [
          { type: "Text", content: deliveriesCount, variant: "subtitle2" }
        ],
      },
      {
        type: "DataListItem",
        label: [
          { type: "Text", content: "Delivery States", variant: "subtitle2" }
        ],
        // You can pass an array of Chips directly as the value
        value: deliveryStateChips,
      },
      {
        type: "DataListItem",
        label: [
          { type: "Text", content: "Paid At", variant: "subtitle2" }
        ],
        value: [
          { type: "Text", content: paidAtDisplay, variant: "body2" }
        ],
      },
      {
        type: "DataListItem",
        label: [
          { type: "Text", content: "Cancelled At", variant: "subtitle2" }
        ],
        value: [
          { type: "Text", content: cancelledAtDisplay, variant: "body2" }
        ],
      },
    ],
  };

  // Compose the card header with order ID, state chip, and creation timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Order #${input.id}`,
    description: `Status: ${input.state}`,
    startElement: orderStateChip,
    endElement: {
      type: "Text",
      content: `Created: ${input.created_at}`,
      variant: "caption",
    },
  };

  // Compose the card content with address and detailed list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      // Use markdown for a nicely formatted address block
      {
        type: "Markdown",
        content: addressMarkdown,
      },
      // Then show the data list of order metrics
      orderDetailsList,
    ],
  };

  // Return a vertical card assembling header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
