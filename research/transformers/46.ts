import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
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
type IAutoViewTransformerInputType = IShoppingDeliveryJourney;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each journey type to a representative icon name.
  // The icon names are expected in kebab-case and are used with the IAutoViewIconProps.
  // These icons are chosen to visually represent the journey stage.
  const iconMapping: Record<typeof input.type, string> = {
    preparing: "hourglass-start",
    manufacturing: "industry",
    shipping: "truck",
    delivering: "box-open",
  };

  // Helper to safely format dates. If the date is null, return "N/A".
  const formatDate = (date: string | null): string => date ? new Date(date).toLocaleString() : "N/A";

  // Compose the card header.
  // If the title field is null, we fall back to a default title including the journey type.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title || `Journey: ${input.type.charAt(0).toUpperCase() + input.type.slice(1)}`,
    description: input.description || "No additional description provided.",
    // Use the icon corresponding to the journey type
    startElement: {
      type: "Icon",
      id: iconMapping[input.type],
      // Choosing a color that is visually engaging; can be adjusted as needed
      color: "blue",
      // Select an appropriate size for visibility on mobile devices
      size: 24,
    },
    // Optionally, you could add an endElement if needed to enhance the header
  };

  // Compose the markdown content.
  // We leverage markdown to provide a rich, formatted view of the journey details.
  const markdownContent = [
    "### Journey Details",
    "",
    `- **ID:** ${input.id}`,
    `- **Created At:** ${formatDate(input.created_at)}`,
    `- **Started At:** ${formatDate(input.started_at)}`,
    `- **Completed At:** ${formatDate(input.completed_at)}`,
    input.deleted_at ? `- **Deleted At:** ${formatDate(input.deleted_at)}` : "",
    "",
    "This overview helps you track the delivery journey's progress and history."
  ].join("\n");

  // Compose the card content using a markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The childrenProps field accepts a single component (or array) of presentation components.
    // Here we use the markdown component to render detailed information.
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Compose the final vertical card that aggregates header and content for a comprehensive view.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed visual component.
  return verticalCard;
}
