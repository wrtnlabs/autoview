import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * Supplementation of inventory quantity of stock.
 *
 * You know what? If a {@link IShoppingSaleUnitStock stock} has been sold over
 * its {@link IShoppingSaleUnitStock.ICreate.quantity initial inventory quantity},
 * the stock can't be sold anymore, because of out of stock. In that case, how the
 * {@link IShoppingSeller} should do?
 *
 * When the sotck is sold out, seller can supplement the inventory record by
 * registering this `IShoppingSaleUnitStockSupplement` record. Right, this
 * `IShoppingSaleUnitStockSupplement` is an entity that embodies the
 * supplementation of the inventory quantity of the belonged stock.
*/
type IShoppingSaleUnitStockSupplement = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Supplemented quantity.
     *
     * @title Supplemented quantity
    */
    value: number & tags.Type<"int32">;
    /**
     * Creation time of the record.
     *
     * Another words, the time when inventory of the stock being supplemented.
     *
     * @title Creation time of the record
    */
    created_at: string;
};
type IAutoViewTransformerInputType = IShoppingSaleUnitStockSupplement;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We transform the inventory supplementation record into a composed card which displays key details.
  // We use a vertical card that contains a header and a content body.
  // The header uses an icon to visually represent the supplementation event.
  // The content is rendered as markdown to allow basic formatting while avoiding raw text.
  
  // Card header component: provides a title, description and a starting icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Inventory Supplementation",
    description: "Supplementation record for stock inventory update.",
    // startElement accepts an icon component:
    startElement: {
      type: "Icon",
      // Using a common icon name in kebab-case. This could be "plus-circle" to denote addition.
      id: "plus-circle",
      // Provide a color that is intuitive (e.g., green for successful update)
      color: "green",
      // Setting an appropriate size for visibility on various devices.
      size: 24
    }
  };

  // Markdown component: shows details about the supplementation record.
  // Markdown allows us flexibility in formatting rather than plain text.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    // We use markdown formatting for readability.
    content: 
      `**Record ID:** ${input.id}\n\n` +
      `**Supplemented Quantity:** ${input.value}\n\n` +
      `**Created At:** ${input.created_at}`
  };

  // Card content component: holds the markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent
  };

  // Compose a vertical card grouping header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed visual component.
  return verticalCard;
}
