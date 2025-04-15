import type * as IAutoView from "@autoview/interface";
/**
 * Section information.
 *
 * `IShoppingSection` is a concept that refers to the spatial information of
 * the market.
 *
 * If we compare the section mentioned here to the offline market, it means a
 * spatially separated area within the store, such as the "fruit corner" or
 * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
 * not possible to classify multiple sections simultaneously, but only one section
 * can be classified.
 *
 * By the way, if your shopping mall system requires only one section, then just
 * use only one. This concept is designed to be expandable in the future.
*/
type IShoppingSection = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
    */
    code: string;
    /**
     * Representative name of the section.
     *
     * @title Representative name of the section
    */
    name: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
};
type IAutoViewTransformerInputType = IShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // In this transformation we create a vertical card that visually represents a Shopping Section.
  // The card contains:
  // 1. A CardHeader with an icon representing the section, the section's name as title, and its code as description.
  // 2. A CardContent that uses markdown to display the creation date, making it more visually engaging.
  
  // Step 1: Create an icon to be used in the header.
  const headerIcon: IAutoView.IAutoViewIconProps = {
    id: "store", // icon name in kebab-case (representing a store/market)
    color: "blue", // chosen color; this can be modified as needed
    size: 24, // size in one of the allowed sizes
    type: "Icon"
  };

  // Step 2: Compose the card header.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: input.name,              // display the section name as the title
    description: `Section Code: ${input.code}`, // display the code in the description
    startElement: headerIcon,       // attach the icon as the header's start element
    type: "CardHeader"
  };

  // Step 3: Compose the card content using a markdown component for better text styling.
  // We include the creation time information.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    // childrenProps accepts a markdown component to render the text with styling
    childrenProps: {
      content: `**Created at:** ${input.created_at}`,
      type: "Markdown"
    },
    type: "CardContent"
  };

  // Step 4: Assemble the vertical card comprising the header and content.
  // This vertical card is designed to be responsive and engaging.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [cardHeader, cardContent],
    type: "VerticalCard"
  };

  // Return the composed component which adheres to IAutoView.IAutoViewComponentProps type.
  return verticalCard;
}
