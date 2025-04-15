import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
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
type IShoppingDelivery = {
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
    seller: IShoppingSeller;
    /**
     * List of journeys of the delivery.
     *
     * @title List of journeys of the delivery
    */
    journeys: IShoppingDeliveryJourney[];
    /**
     * List of pieces of the delivery.
     *
     * @title List of pieces of the delivery
    */
    pieces: IShoppingDeliveryPiece[];
    /**
     * List of shippers of the delivery.
     *
     * @title List of shippers of the delivery
    */
    shippers: IShoppingDeliveryShipper[];
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
type IShoppingSeller = {
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
type IShoppingDeliveryJourney = {
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
type IShoppingDeliveryPiece = {
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
type IShoppingDeliveryShipper = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    company: null | string;
    name: string;
    mobile: string;
};
type IAutoViewTransformerInputType = IShoppingDelivery;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a markdown content string that summarizes the journeys and pieces of the delivery.
  // This markdown will be rendered with proper formatting in the UI.
  let markdownContent = "";

  // Process delivery journeys
  if (input.journeys && input.journeys.length > 0) {
    markdownContent += "## Journeys\n";
    input.journeys.forEach((journey) => {
      // Use journey title if available, otherwise fallback to type description.
      const titleText = journey.title ? `: ${journey.title}` : "";
      // Use default texts for dates if they are missing.
      const started = journey.started_at ? journey.started_at : "N/A";
      const completed = journey.completed_at ? journey.completed_at : "N/A";
      markdownContent += `- **${journey.type}**${titleText} (Started: ${started}, Completed: ${completed})\n`;
    });
  } else {
    markdownContent += "## Journeys\n- No journey data available.\n";
  }

  // Process delivery pieces
  if (input.pieces && input.pieces.length > 0) {
    markdownContent += "\n## Pieces\n";
    input.pieces.forEach((piece) => {
      markdownContent += `- Stock: **${piece.stock_id}**, Quantity: **${piece.quantity}**, Publish ID: **${piece.publish_id}**\n`;
    });
  } else {
    markdownContent += "\n## Pieces\n- No delivery pieces available.\n";
  }

  // Compose the header component.
  // We use an icon to represent the delivery visually (for example, a truck icon).
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Delivery ID: ${input.id}`,
    description: `State: ${input.state}`,
    // The startElement accepts specific types. Here we use an Icon.
    startElement: {
      type: "Icon",
      id: "truck", // Assumes that "truck" is a valid icon identifier.
      color: "blue",
      size: 24
    }
  };

  // Compose the content component.
  // We use a markdown component to display detailed delivery information.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can be a single component.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose the footer component.
  // This component summarizes seller and shipper information in a concise text format.
  const shipperNames = input.shippers && input.shippers.length > 0
    ? input.shippers.map((shipper) => shipper.name).join(", ")
    : "N/A";
  const footerText = `Seller ID: ${input.seller.id} • Created at: ${input.created_at} • Shippers: ${shipperNames}`;
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Text",
        // The Text component expects a string or array that can include icons too.
        content: footerText
      }
    ]
  };

  // Finally, compose the vertical card component that aggregates the header, content, and footer.
  // The VerticalCard ensures that the UI is responsive and grouped in a visually appealing card layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the aggregated component which conforms to IAutoView.IAutoViewComponentProps
  return verticalCard;
}
