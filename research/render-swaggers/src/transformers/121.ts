import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
}
type IAutoViewTransformerInputType = Schema.IShoppingDelivery;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map delivery state to a Chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    none: "gray",
    preparing: "orange",
    manufacturing: "lime",
    shipping: "blue",
    delivering: "cyan",
    underway: "primary",
    arrived: "green",
  };

  // Map journey type to an icon name
  const journeyIconMap: Record<string, string> = {
    preparing: "gear",
    manufacturing: "industry",
    shipping: "truck",
    delivering: "shipping-fast",
  };

  // Format date-time strings for display
  const formatDateTime = (dt: string | null): string =>
    dt
      ? new Date(dt).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  // 1) CardHeader: Delivery identifier, creation, and state
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Delivery ${input.id}`,
    description: `Created at ${formatDateTime(input.created_at)}`,
    startElement: {
      type: "Icon",
      id: "truck",      // generic delivery icon
      color: "blue",
      size: 28,
    },
    endElement: {
      type: "Chip",
      label: input.state.charAt(0).toUpperCase() + input.state.slice(1),
      color: stateColorMap[input.state] || "gray",
      variant: "filled",
    },
  };

  // 2) Build journey list items
  const journeyItems: IAutoView.IAutoViewDataListItemProps[] =
    (input.journeys || []).map((j) => ({
      type: "DataListItem",
      label: [
        {
          type: "Icon",
          id: journeyIconMap[j.type] || "circle",
          color: "gray",
          size: 16,
        },
        {
          type: "Text",
          content: j.title || j.type,
          variant: "body2",
        },
      ],
      value: {
        type: "Text",
        content: `${formatDateTime(j.started_at)} → ${formatDateTime(
          j.completed_at,
        )}`,
        variant: "caption",
        color: "gray",
      },
    }));

  // 3) Build pieces list items
  const pieceItems: IAutoView.IAutoViewDataListItemProps[] =
    (input.pieces || []).map((p) => ({
      type: "DataListItem",
      label: {
        type: "Text",
        content: `Stock ID: ${p.stock_id}`,
        variant: "body2",
      },
      value: {
        type: "Text",
        content: `Qty: ${p.quantity}`,
        variant: "body2",
        color: "primary",
      },
    }));

  // 4) Build shippers as chips
  const shipperChips: IAutoView.IAutoViewChipProps[] =
    (input.shippers || []).map((s) => ({
      type: "Chip",
      label: s.name,
      color: "secondary",
      size: "small",
      startElement: {
        type: "Icon",
        id: "user",
        color: "gray",
        size: 16,
      },
    }));

  // 5) Compose CardContent with sections: Journeys, Pieces, Shippers
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Journeys section
  contentChildren.push({
    type: "Text",
    content: "Journeys",
    variant: "subtitle1",
  });
  if (journeyItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: journeyItems,
    });
  } else {
    contentChildren.push({
      type: "Text",
      content: "No journeys recorded.",
      variant: "body2",
      color: "gray",
    });
  }

  // Divider
  contentChildren.push({
    type: "Divider",
    orientation: "horizontal",
  });

  // Pieces section
  contentChildren.push({
    type: "Text",
    content: "Delivery Pieces",
    variant: "subtitle1",
  });
  if (pieceItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: pieceItems,
    });
  } else {
    contentChildren.push({
      type: "Text",
      content: "No pieces recorded.",
      variant: "body2",
      color: "gray",
    });
  }

  // Divider
  contentChildren.push({
    type: "Divider",
    orientation: "horizontal",
  });

  // Shippers section
  contentChildren.push({
    type: "Text",
    content: "Shippers",
    variant: "subtitle1",
  });
  if (shipperChips.length > 0) {
    contentChildren.push({
      type: "ChipGroup",
      childrenProps: shipperChips,
    });
  } else {
    contentChildren.push({
      type: "Text",
      content: "No shippers assigned.",
      variant: "body2",
      color: "gray",
    });
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // 6) Wrap into a vertical card for responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, cardContent],
  };

  return card;
}
