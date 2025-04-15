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
  // The goal of this function is to transform an IShoppingSection input into a visual representation
  // using AutoView components. We utilize a Vertical Card to group together a header and content section.
  // In the card header we display the section's name along with an icon, and in the card content we leverage
  // a markdown component to stylishly show additional details such as code, id, and creation time.

  // Compose the header component:
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name, // display the representative name
    description: "Section details", // generic description for context; can be refined further
    // Use an icon as a visual element. The allowed icon types for startElement include IAutoViewIconProps.
    startElement: {
      type: "Icon",
      id: "shop",  // the icon id is set to "shop" (kebab-case), representing the section
      color: "blue", // chosen color to highlight the icon; adjust based on design guidelines
      size: 24 // medium icon size for a balanced header presentation
    }
  };

  // Compose the content component using Markdown.
  // Markdown is preferred over plain text for better styling and readability.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The markdown component is used as a presentation component.
    // We include key section details in a structured markdown layout.
    childrenProps: {
      type: "Markdown",
      content: `
## Section Information

**Code:** ${input.code}  
**ID:** ${input.id}  
**Created At:** ${input.created_at}
      `.trim()
    }
  };

  // Combine the header and content components inside a Vertical Card.
  // Using a VerticalCard allows for a structured and visually engaging layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the final composed component props.
  return verticalCard;
}
